const source = require('./sourcefiles');

//use net methods
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
    request.end();
  })

  //disconnect
  request.on('end', () => {
    console.log(`Request fulfilled`);
  })
})

//listening on port
server.listen(PORT, () => {
  console.log(`Waiting for requests`);
});


function generateResponse(data, sender) {

//array of data in request seperated by their line breaks
let parsedRequest = data.split('\r\n');
let header = parsedRequest[0].split(' ');
let wantedFile = header[1];
let httpVersion = header[2];
console.log(`requested ${wantedFile}`);

//grabs requested document
  switch (wantedFile) {
    case '/hydrogen.html':
    sender.write(`${httpVersion} ${statusMessages.good}\n${source.hydrogen}`)
      break;

    case '/helium.html':
    sender.write(`${httpVersion} ${statusMessages.good}\n${source.helium}`)
    break;

    case '/404.html':
    sender.write(`${httpVersion} ${statusMessages.good}\n${source.fourOhFour}`)
    break;

    case '/styles.css':
    sender.write(`${httpVersion} ${statusMessages.good}\n${source.css}`)
    break;

    case `/`:
    sender.write(`${httpVersion} ${statusMessages.good}\n${source.indexx}`)
    break;

    case '/index.html':
    sender.write(`${httpVersion} ${statusMessages.good}\n${source.indexx}`)
    break;

    default:
      console.log('err');
      break;
  }
}
