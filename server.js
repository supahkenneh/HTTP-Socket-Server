const source = require('./sourcefiles');

//use net methods
const net = require('net');

const PORT = 8080;

const files = {
  '/index.html' : '/index.html',
  '/helium.html' : '/helium.html',
  '/hydrogen.html' : '/hydrogen.html',
  '/styles.css' : '/styles.css'
};

//create server
const server = net.createServer((request) => {
  request.setEncoding('utf8');

//log that request has been made
  request.on('data', (request) => {
    console.log('A request has been made');
    requestInfo(request);
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


function requestInfo (request) {
  //array of data in request seperated by their line breaks
  let parsedRequest = request.split('\r\n');
  console.log(parsedRequest);
  let method = parsedRequest[0].split(' ');
  let wantedFile = method[1];
  switch(wantedFile){
    case '/hydrogen.html':
    console.log('hydrogen');
    break;
    
    case '/helium.html':
    console.log('helium');
    break;

    case '/404.html':
    console.log('404');
    break;

    case '/styles.css':
    console.log('css');
    break;

    case `/`:
    console.log('index');
    break;

    case '/index.html':
    console.log('index');
    break;
  }
}
