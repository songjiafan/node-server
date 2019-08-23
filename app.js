const cluster = require('cluster')
const os = require('os')
const express = require('express')
const app = express()

if (cluster.isMaster) {
  const cpuCoreNum = os.cpus().length
  for (let i = 0; i < cpuCoreNum; i++) {
    cluster.fork()
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', e => {
      console.log(e)
    });
  }
} else {
  app.get('/', function(req, res) {
    console.log(process.pid)
    res.send('Hello World!');
  });
 
  var server = app.listen(4000, function() {
    console.log('Server started on port 3000', process.pid);
  });
}


