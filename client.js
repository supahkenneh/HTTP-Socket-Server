const net = require('net');

const PORT = 8080;

//create connection to server
const client = net.createConnection(PORT, () => {
  client.setEncoding('utf8');
  console.log('connection to server successful');
});

//send 'requests' to server
client.on('data', (request) => {
  console.log(request.toString().trim());
})
process.stdin.pipe(client);

//close connection
client.on('end', () => {
  console.log('terminating connection');
});
