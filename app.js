const express = require('express')
const clusterInit = require('./cluster')
const app = express()

function httpInit () {
  app.get('/', function(req, res) {
    console.log(process.pid)
    res.send('Hello World!');
  });
  
  app.listen(4000, function() {
    console.log('Server started on port 4000', process.pid);
  });
}

clusterInit(httpInit)