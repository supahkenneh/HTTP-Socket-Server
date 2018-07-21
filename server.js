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
    const data = request.toString();
    console.log(`this is ${data}`);
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