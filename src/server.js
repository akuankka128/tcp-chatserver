let nop = ( ) => {};
let connections = [];

const out = process.stdout;
const colors = require('colors/safe');
const server = require('net').createServer(async function(conn) {
	conn.on('end', nop);
	conn.on('error', nop);

	connections.push(conn);

	conn.write(`${colors.red("root")}|[Server]|Welcome, client.\r\n`);
	conn.on('data', chunk => {
		let things = chunk.toString().split("|");
		let username = things[0].toLowerCase();
		let message = `${colors.yellow("User")}|${username}|${things.slice(1).join("|")}`;

		if(username === "server" || username === "local") {
			conn.write(`${colors.red("root")}|[Server]|Illegal username.\r\n`);
			return conn.end();
		}

		if(!username || !message) {
			conn.write(`${colors.red("root")}|[Server]|Illegal formatting. (username|message)\r\n`);
			return conn.end();
		}

		connections.forEach(conn => conn.write(message));
	});
});

server.on('error', err => {
	console.log('FUCK\r\n' + err);
});

server.listen(23);
console.log("Up 'n running.");
