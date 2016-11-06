var express = require('express');
var morgan = require('morgan');
var chalk = require('chalk');
var resume = require('./routes');

class ResumeServer {

  constructor(port = 3001, host = "127.0.0.1") {
    this.port = port;
    this.host = host;
    this.app = express();
    this.setup();
  }

  setup() {
    this.app.use(morgan('dev'));
    this.app.use('/api/resume', resume);
  }
  
  start(callback = undefined) {
    callback = callback || this.defaultStartCallback.bind(this);
    this.app.listen(this.port, callback);
  }

  defaultStartCallback() {
    console.log(chalk.green('OK'), 'connected', 'express', this.port);
  }
}

module.exports = ResumeServer;

if (require.main === module) {
  const server = new ResumeServer();
  server.start();
} 


