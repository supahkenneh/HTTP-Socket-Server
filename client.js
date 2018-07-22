const net = require('net');
const PORT = 8080;

//create connection to server
const client = net.createConnection(PORT, 'localhost', () => {
  client.setEncoding('utf8');
  process.stdout.write(`Request made to ${PORT}`);
  //grabs request from node command line
  process.argv.forEach((value, index) => {
    //grabs .html or .css portion of command
    let wantedFile = process.argv[2];
    //if argument doesn't exist, give instruction and end process
    if (!wantedFile) {
      process.stdout.write(helpUsage)
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
  process.stdout.write(request);
})
process.stdin.pipe(client);

//handles ECONNRESET error
client.on('error', () => {
  process.stdout.write(`\nTerminating connection`);
  process.exit();
});

//close connection
client.on('end', () => {
  process.stdout.write(`Terminating connection`);
});


/********** UTLITY FUNCTIONS and VARIABLES **********/
//takes CLI request and converts to HTTP Request format
function sendRequest(HTML, hostServer) {
  client.write(`GET ${HTML} HTTP/1.1
  Date: ${new Date()}
  Host: ${hostServer} ${PORT}
  User-Agent: ${process.env.TERM_PRORAM} ${process.env.TERM_PROGRAM_VERSION}
  
  `)
};

const helpUsage = '\nINCORRECT INPUT. \n\nNeed help?\n\nPlease make requests in the following format:\n\n     node client.js HTML/URL link\n\n';