let nickname, log = "";
const wait = require('./lib/wait');

function clearAndWrite(what){
	console.clear();
	console.log(what);
}

async function start() {
	let reading;
	process.stdout.write('Enter a name: ');
	reading = !0;
	process.stdin.on('data', chunk => {
		if(reading) {
			reading = !1
			nickname = chunk.toString().replace(/[\r\n]/g, "");
			clearAndWrite((log += `[LOCAL] Username set to: ${nickname}\r\n`));
		}
	});
	while(!nickname) await wait(500);

	const client = require('net').createConnection(23, '127.0.0.1', function () {
		client.on('data', chunk => {
			let data = chunk.toString();
			let [nickname, message] = data.split("|");

			clearAndWrite((log += `[${nickname}]: ${message}`));
		});
	});

	process.stdin.on('data', chunk => {
		client.write(`${nickname}|${chunk.toString()}`);
	});
}

start();
