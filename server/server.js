
class Server {

  constructor(port = 3000, host = "127.0.0.1", config = undefined) {
    this.config = config || require('../config');
    this.express = require('express');
    this.path = require('path');
    this.port = port;
    this.host = host;

    this.isDeveloping = this.config.isDeveloping ? port : process.env.PORT;
    this.app = this.express();
    this.middlewares = [];
    this.webpack = {};
  }

  getIndexHtml() {
    const srv = this;
    const path = require('path');
    const index_html = path.join(__dirname, '../dist/index.html');
    
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
    this.setup();
    onStartCallback = onStartCallback || this.defaultStartCallback.bind(this);
    this.app.listen(this.port, this.host, onStartCallback);
  }

  defaultStartCallback(err) {
    if (err) {
      console.log(err);
    }
    console.log('Ok', 'express', this.host + ':' + this.port);
  }

  setup() {
    this.middlewares = [
      this.addLogger.bind(this),
      this.addStaticFiles.bind(this),
      this.addBodyParser.bind(this),
      this.addWebpack.bind(this),
      this.addResumeRoutes.bind(this),
      this.addIndexRoute.bind(this)
    ];

    this.middlewares.map((middleware, index) => {
      const ith = ("00" + index).substr(-2);
      console.log(ith, middleware());
    });
    console.log("OK", "middleware(s) setup");
  }

  addIndexRoute() {
    this.app.get('*', this.getIndexHtml());
    return 'add index html';
  }

  addResumeRoutes() {
    const resumePath = this.path.join(__dirname, './resume/routes.js');
    const resume = require(resumePath);
    this.app.use('/api/resume', resume);
    return ["add resume routes", resumePath].join(" ");
  }

  addLogger() {
    const morgan = require('morgan')('dev');
    this.app.use(morgan);
    return "add morgan logger";
  }

  addBodyParser() {
    const bodyParser = require('body-parser');
    const jsonParser = bodyParser.json();
    const urlencodedParser = bodyParser.urlencoded({extended: false});

    this.app.use(jsonParser);
    this.app.use(urlencodedParser);
    return "add body parser";
  }

  addStaticFiles() {
    const fontsPath = this.path.join(__dirname, '../fonts');
    const publicPath = this.path.join(__dirname, '..');
    // const distPath = __dirname.split('/').slice(0, -1).concat('dist').join('/');
    const publicFiles = this.express.static(publicPath);
    const fontsFiles = this.express.static(fontsPath);
    this.app.use(publicFiles);
    this.app.use(fontsFiles);
    return ["add static files", publicPath].join(" ");
  }

  addLiveReload() {
    if (!this.isDeveloping) { return "skip live reload"; }
    const livereload = require('express-livereload');
    const config = {};
    livereload(this.app, config);
    return "add live reload";
  }

  getApp() {
    return this.app;
  }

  getExpress() {
    return this.express;
  }

  getMiddlewares() {
    return this.middlewares;
  }

  getWebpackMiddleware() {
    return this.webpack.middleware;
  }

  addWebpack() {
    if (!this.isDeveloping) { return "skip webpack"; }
    const webpackConfig = require(this.config.webpack);
    const webpack = require('webpack');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackMiddlewareConfig = {
      publicPath: webpackConfig.output.publicPath,
      contentBase: 'src',
      stats: {
        colors: true,
        hash: true,
        timings: true,
        chunks: false,
        chunkModules: true,
        modules: true
      }
    };
    const compiler = webpack(webpackConfig);
    const middleware = webpackMiddleware(compiler, webpackMiddlewareConfig);
 
    this.middleware = middleware;
    this.app.use(middleware);
    this.app.use(webpackHotMiddleware(compiler));
    return ["add webpack", this.config.webpack].join(" ");
  }

  get_index_html() { // no
    const server = this;
    const path = require('path');
    const index_html = path.join(__dirname, '../dist/index.html');

    return getWebpackIndexHtml;

    function getWebpackIndexHtml(req, res) {
      if (server.isDeveloping && server.webpackMiddleware) {
        let content = server.webpackMiddleware.fileSystem.readFileSync(index_html);
        res.write(content);
        res.end();
      } else {
        res.sendFile(index_html);
      }
    }
  }

  add_web_pack() { // no
    if (!this.isDeveloping) { return "skip webpack"; }
    this.webpack.config = require(this.config.webpack);

    this.webpack.webpack = require('webpack');
    const hotMiddleware = require('webpack-hot-middleware');

    this.webpack.devMiddleware = require('webpack-dev-middleware');
    const configMiddleware = {
      publicPath: this.webpack.config.output.publicPath,
      contentBase: 'client',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    };

    const compiler = this.webpack.webpack(this.webpack.config);
    const middleware = this.webpack.devMiddleware(compiler,
                                                         configMiddleware);
    this.webpack.configMiddleware = configMiddleware;
    this.webpack.compiler = compiler;
    this.webpack.middleware = middleware;
    this.webpack.hotMiddleware = hotMiddleware;

    this.app.use(middleware);
    this.app.use(hotMiddleware(compiler));

    return ["add webpack", this.config.webpack].join(" ");
  }

}

(() => {
  if (typeof module === 'object') {
    module.exports = Server;
  }

  if ((typeof require === 'function') && (require.main === module)) {
    const server = new Server();
    server.start();
  }
})();


