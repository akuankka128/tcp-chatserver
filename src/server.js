let nop = ( ) => {};
let connections = [];

const out = process.stdout;
const server = require('net').createServer(async function(conn) {
	conn.on('end', nop);
	conn.on('error', nop);

	connections.push(conn);

	conn.write('Server|Welcome, client.\r\n');
	conn.on('data', chunk => {
		let things = chunk.toString().split("|");
		let username = things[0].toLowerCase();
		let message = `${username}|${things.slice(1).join("|")}`;

		if(username === "server" || username === "local") {
			conn.write('Server|Illegal username.\r\n');
			return conn.end();
		}

		if(!username || !message) {
			conn.write("Server|Illegal formatting. (username|message)");
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
