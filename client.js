const net = require('net');
const PORT = 8080;

//create connection to server
const client = net.createConnection(PORT, 'localhost', () => {
  client.setEncoding('utf8');
  console.log(`Request made to ${PORT}`);
  //grabs request from node command line
  process.argv.forEach((value, index) => {
    //grabs .html or .css portion of address
    let wantedFile = process.argv[2];
    //if argument doesn't exist, give instruction and end process
    if (!wantedFile) {
      process.stdout.write('INCORRECT INPUT. \nhelp/usage:\n Please make requests in the following format:\nnode client.js HTML/URL link')
      process.exit();
    }
    let indexOfHTML = wantedFile.indexOf('/');
    let requestedHTML = wantedFile.substring(indexOfHTML, wantedFile.length);
    let host = wantedFile.substring(0, indexOfHTML);
    //writes to server in request header format
    sendRequest(requestedHTML, host);
  })
});

//send 'requests' to server
client.on('data', (request) => {
  console.log(request.toString().trim());
})
process.stdin.pipe(client);

//handles ECONNRESET error
client.on('error', () => {
  process.exit();
})

//close connection
client.on('end', () => {
  console.log('terminating connection');
});


/************* HELPER FUNCTIONS *************/
function sendRequest(HTML, hostServer) {
  client.write(`GET ${requestedHTML} HTTP/1.1
  Date: ${new Date()}
  Host: ${host} ${PORT}
  User-Agent: ${process.env.TERM_PRORAM} ${process.env.TERM_PROGRAM_VERSION}
  
  `)
}