const net = require('net');

const PORT = 8080;

let wantedFile;

//create connection to server
const client = net.createConnection(PORT, 'localhost', () => {
  client.setEncoding('utf8');
  console.log(`Request made to ${PORT}`);

  //grabs request from node command line
  process.argv.forEach((value, index) => {
    console.log(`${index}: ${value}`);
    wantedFile = process.argv[2];

    //writes to server
    client.write(wantedFile);
  })
});

//send 'requests' to server
client.on('data', (request) => {
  console.log(request.toString().trim());
})
process.stdin.pipe(client);

//close connection
client.on('end', () => {
  process.exit(0);
  console.log('terminating connection');
});
