const net = require('net');

const PORT = 8080;

//create connection to server
const client = net.createConnection(PORT, 'localhost', () => {
  client.setEncoding('utf8');
  console.log(`Request made to ${PORT}`);

  //grabs request from node command line
  process.argv.forEach((value, index) => {
    console.log(`${index}: ${value}`);
    //grabs .html or .css portion of address
    let wantedFile = process.argv[2];
    let indexOfHTML = wantedFile.indexOf('/');
    let requestedHTML = wantedFile.substring(indexOfHTML, wantedFile.length);

    //writes to server in request header format
    client.write(`GET ${requestedHTML} HTTP/1.1`);
  })
});

//send 'requests' to server
client.on('data', (request) => {
  // console.log(request.toString().trim());
})
process.stdin.pipe(client);

//close connection
client.on('end', () => {
  console.log('terminating connection');
});
