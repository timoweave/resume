'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin(),
  new HtmlWebpackPlugin({
    template: 'client/app.html',
    inject: 'body',
    filename: 'index.html'
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  })
];

const modules = {
  loaders: [
    { // babel
      test: /\.jsx?$/,
      // loaders: [ 'react-hot-loader', 'babel-loader' ],
      loader: 'react-hot-loader!babel-loader',
      excludes : [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'bower_components') ],
      query: {
        plugins : [ "transform-es2015-modules-commonjs" ],
        presets: ["react", "es2017", "stage-1", "react-hmre"],
        /*
        presets : [
          [
            "env", {
              "targets": {
                "chrome" : 54
              },
              "loose" : true
            }
          ]
        ],*/
        cacheDirectory : true
      }
    },
    { // json
      test: /\.json?$/,
      loader: 'json-loader'
    },
    { // css
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }
  ]
}

const config = {
  target : 'web',
  devtool: 'eval-source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'client/app.jsx')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/public',
    chunkFilename: "chunk-[name]-[chunkhash].js"
  },
  plugins: plugins,
  module: modules
  // externals : []
};

module.exports = config;
