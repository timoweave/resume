const path = require('path');
const webpack = require('webpack');
const node_modules_path = path.resolve(__dirname, 'node_modules');
const bower_components_path = path.resolve(__dirname, 'bower_components');

const config = {
  target : "web",
  devtool : 'eval-source-map',
  // context : __dirname,
  entry : {
    cats : path.resolve(__dirname, 'client', 'app.jsx'),
    vendor : [ "bootstrap", "jquery", "react", "react-dom" ]
  },
  output : {
    path : path.resolve(__dirname, 'dist'),
    filename: '[name]-frontend.js',
    publicPath : '/public',
    chunkFilename: "chunk-[chunkhash]-[name]-frontend.js"
  },
  module: { loaders: [] },
  plugins : []
  // externals : []
};

const is_developing = true;
if (is_developing) {
  add_hot_loading(config);  
}

module.exports = setup(config);

// functions

function setup(config) {
  const loaders = config.module.loaders
  loaders.push(babel_loader());
  loaders.push(css_loader());
  loaders.push(font_loader());
  loaders.push(json_loader());
  loaders.push(image_loader());

  const plugins = config.plugins;
  plugins.push(no_error_plugin());
  plugins.push(common_plugin());
  plugins.push(order_plugin());
  plugins.push(duplication_plugin());
  plugins.push(chunk_count_plugin());
  plugins.push(chunk_size_plugin());

  return config;
}

function babel_loader()  {
  return {
    test : /\.js[x567]?$/,
    loaders : ['react-hot-loader', 'babel-loader'],
    include : path.join(__dirname, 'public'),
    excludes : [ node_modules_path, bower_components_path ],
    query : {
      plugins : [ "transform-es2015-modules-commonjs" ],
      // presets: [ "es2017", "stage-1", "node5", "react" ],
      presets : [
        [
          "env", {
            "targets": {
              "chrome" : 54
            },
            "loose" : true,
            "modules" : "commonjs"
          }
        ]
      ],
      cacheDirectory : true
    }
  };
}

function json_loader() {
  return {
    test: /\.json?$/,
    loader: 'json-loader'
  };
}

function css_loader() {
  return {
    test : /\.css$/,
    loaders : ['style-loader', 'css-loader' ]
  };
}

function font_loader() {
  return {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    loader: 'file-load',
    query : {
      name : '/fonts/[name].[ext]'
    }
  };
}

function image_loader() {
  return {
    test: /\.(jpg|png|svg)$/,
    loader: 'file-loader',
    query : {
      name: 'images/[name].[ext]'
    }
  };
}



const plugins = config.plugins;

function common_plugin() {
  return new webpack.optimize.CommonsChunkPlugin({ names : [ "common", "vendor" ] });
}
function order_plugin() {
  return new webpack.optimize.OccurrenceOrderPlugin();
}

function duplication_plugin() {
  return new webpack.optimize.DedupePlugin();
}

function chunk_count_plugin() {
  return new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 15 });
}

function chunk_size_plugin() {
  return new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 });
}

function no_error_plugin() {
  return new webpack.NoErrorsPlugin();
}

function uglify_plugin() {
  // TBD: having some issue 
  // const uglify = new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } });
  /* const uglify = new webpack.optimize.UglifyJsPlugin({
     compress: { warnings: false },
     comments: false,
     sourceMap: false,
     mangle: false,
     minimize: true
     });
     return uglify;
   */
  return null;
}

function add_hot_loading(config) {
  config.entry.cats = [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true',
    config.entry.cats
  ];
  config.entry.birds = [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true',
    config.entry.birds
  ];
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
}
