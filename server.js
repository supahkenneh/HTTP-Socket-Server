const source = require('./sourcefiles');
const net = require('net');
const PORT = 8080;

const statusMessages = {
  good: `200 OK`,
  notFound: `404 Not Found`,
  forbidden: `403 Forbidden`,
  serverError: `500 Internal Server Error`,
}

//create server
const server = net.createServer((request) => {
  request.setEncoding('utf8');

  //log that request has been made
  request.on('data', (data) => {
    console.log('A request has been made');
    generateResponse(data, request);
    console.log(`Request fulfilled!`);
  })
})

server.on('end', () => {
  console.log(`Disconnect client`);
})

//listening on port
server.listen(PORT, () => {
  console.log(`Waiting for requests`);
});



/************** HELPER FUNCTIONS **************/
//function that takes request and generates response
function generateResponse(data, sender) {

  //parses through request header info
  let parsedRequest = data.split('\r\n');
  let header = parsedRequest[0].split(' ');
  let wantedFile = header[1];
  let httpVersion = header[2];
  console.log(`${wantedFile} requested`);

  //grabs requested document and returns response header
  switch (wantedFile) {
    case '/hydrogen.html':
      sender.write(createHeader(httpVersion, statusMessages.good, source.hydrogen));
      break;

    case '/helium.html':
      sender.write(createHeader(httpVersion, statusMessages.good, source.helium));
      break;

    case '/css/styles.css':
      sender.write(createHeader(httpVersion, statusMessages.good, source.css));
      break;

    case `/`:
      sender.write(createHeader(httpVersion, statusMessages.good, source.indexx));
      break;

    case '/index.html':
      sender.write(createHeader(httpVer, statusMessages.good, source.indexx));
      break;

    default:
      sender.write(createHeader(httpVersion, statusMessages.notFound, source.fourOhFour));
      break;
  }
};

function createHeader(httpVer, status, source){
  return `${httpVer} ${status}
Status: ${httpVer} ${status}
Server: ${process.env.USER} ${process.env.TERM_PROGRAM} ${process.env.TERM_PROGRAM_VERSION}
Date: ${new Date()}

${source}`
};
