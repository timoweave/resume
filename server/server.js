const config = require('../config');
const express = require('express');

class Server {

  constructor(port = 3000, host = "127.0.0.1") {
    this.isDeveloping = config.isDeveloping ? port : process.env.PORT;
    this.port = port;
    this.host = host;
    this.middleware = null;
    this.app = null;
    this.setup();
  }

  setup() {
    const bodyParser = require('body-parser');
    const jsonParser = bodyParser.json();
    const urlencodedParser = bodyParser.urlencoded({extended: false});

    const morgan = require('morgan')('dev');
    const resume = require('./resume/routes');
    const publicFiles = express.static(__dirname + '/../dist'); 

    this.app = express();
    this.app.use(morgan);
    this.app.use(publicFiles);
    this.app.use(jsonParser);
    this.app.use(urlencodedParser);
    this.addWebpack();
    this.app.use('/api/resume', resume);

    this.app.get('*', this.getIndexHtml());
  }

  addWebpack() {
    if (!this.isDeveloping) { return; }

    const webpackConfig = require('../webpack.config.js');

    const webpack = require('webpack');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackMiddlewareConfig = {
      publicPath: webpackConfig.output.publicPath,
      contentBase: 'src',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    };

    const compiler = webpack(webpackConfig);
    const middleware = webpackMiddleware(compiler, webpackMiddlewareConfig);

    this.middleware = middleware;
    this.app.use(middleware);
    this.app.use(webpackHotMiddleware(compiler));
  }

  getIndexHtml() {
    const path = require('path');
    const index_html = path.join(__dirname, '../dist/index.html');
    const srv = this;

    return (req, res) => {
      if (srv.isDeveloping && srv.middleware) {
        let content = srv.middleware.fileSystem.readFileSync(index_html);
        res.write(content);
        res.end();
      } else {
        res.sendFile(index_html);
      }
    }
  }

  start(onStartCallback = undefined) {
    
    onStartCallback = onStartCallback || this.defaultStartCallback.bind(this);

    this.app.listen(this.port, this.host, onStartCallback);
  }
  
  defaultStartCallback(err) {
    if (err) {
      console.log(err);
    }
    console.log('Ok', 'express', this.host + ':' + this.port);
  }

}

module.exports = Server;

if (require.main === module) {
  const server = new Server();
  server.start();
}


