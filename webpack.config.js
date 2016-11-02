'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    template: 'client/app.html',
    inject: 'body',
    filename: 'index.html'
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  })
];

const modules = {
  loaders: [{
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      "presets": ["react", "es2015", "stage-0", "react-hmre"]
    }
  }, {
    test: /\.json?$/,
    loader: 'json'
  }, {
    test: /\.css$/,
    loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
  }]
}

const config = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'client/app.jsx')
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    chunkFilename: "[name]-[chunkhash].js"
  },
  plugins: plugins,
  module: modules
};

module.exports = config;
