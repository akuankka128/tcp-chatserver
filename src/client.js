let nickname, log = "";
const wait = require('./lib/wait');
const colors = require('colors/safe');
const commands = require('./lib/commands');

commands.addCommand("clear", function() {
	clearAndWrite(log = "");
});

function clearAndWrite(what){
	console.clear();
	console.log(what);
}

async function start() {
	let reading = !0;
	process.stdout.write('Enter a name: ');
	process.stdin.on('data', chunk => {
		if(reading) {
			reading = !1;
			nickname = chunk.toString().replace(/[\r\n]/g, "");
			clearAndWrite(log += `[${colors.magenta("LOCAL")}] Username set to: ${nickname}\r\n`);
		}
	});

	while(!nickname) await wait(500);

	const client = require('net').createConnection(23, '127.0.0.1', function () {
		client.on('data', chunk => {
			let data = chunk.toString();
			let [prefix, nickname, ...message] = data.split("|");
			clearAndWrite((log += `${prefix ? "["+prefix+"]" : ""} ${nickname}: ${message.join("|")}`));
		});
	});

	process.stdin.on('data', chunk => {
		let data = chunk.toString();
		if(data.startsWith("/")) {
			let arguments = data.replace(/[\r\n]/g, "").split(" "),
				command   = arguments[0].slice(1);

			clearAndWrite(log += `>/${command} ${arguments.slice(1)}`);

			if(!commands.runCommand(command, ...arguments)) {
				clearAndWrite(log += `[${colors.magenta("LOCAL")}] Command not found or execution faced errors.\r\n`);
			} else clearAndWrite(log += `[${colors.magenta("LOCAL")}] Command successfully executed.\r\n`);
			return;
		}
		client.write(`${nickname}|${data}`);
	});
}

/* tslint:disable */ // what the fuck
start(); /* tslint:disable:no-floating-promises */ // help
