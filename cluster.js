const cluster = require('cluster')
const os = require('os')
const express = require('express')
const app = express()

const noop = () => {}

module.exports = function clusterInit (fn = noop) {
  if (cluster.isMaster) {
    const cpuCoreNum = os.cpus().length

    for (let i = 0; i < cpuCoreNum; i++) {
      cluster.fork() // fork子进程
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.error('worker is died, program will restart a worker')
      cluster.fork()
    })
  } else {
    fn()
  }
}
