const http = require('http');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello Node!\n');
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');

console.log('Hello, Node!');
console.log('Goodbye!');

const bufs = Buffer.from([1, 2, 3, 4]);
for (const buf of bufs) {
console.log(buf);
};