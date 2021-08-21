const net = require("net");

const port = 8083;

const client = net.createConnection({
  port: port,
  host: 'localhost'
});
client.setEncoding('utf8');

client.on("connect", () => {
  console.log("Client connected to the server!");
});

client.on("data", (message) => {
  console.log(`The server responded: ${message}`);
});

process.stdin.on("data", (path) => {
  client.write(path);
});

