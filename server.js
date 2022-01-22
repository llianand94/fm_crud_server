const http = require('http');
const app = require('./app');

const server = http.createServer(app);// обработчик запросов HTTP

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
  console.log(`my server started listen on port : ${PORT}`)
});

