var express = require('express');
var morgan = require('morgan');
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
    console.log('OK', 'connected', 'express', this.port);
  }
}

(() => {
  if (typeof module === 'object') {
    module.exports = ResumeServer;
  }

  if (((typeof require === 'function') && (require.main === module)) {
    const server = new ResumeServer();
    server.start();
  }
})();


