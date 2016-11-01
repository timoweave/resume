'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var chalk = require('chalk');

module.exports = {
  devtool: 'eval-source-map',
  context: __dirname,
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'client/app.jsx')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: "[name].chunk.[id].js",
    publicPath: '/'
  },
  plugins: [
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
    /*
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),
     */
    /*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    })
     */
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include : [ /client/ ],
        exclude: [ /node_modules/ ],
        loader: ['babel-loader'],
        query: {
          "presets": ["es2017", "stage-0", "stage-1", "node5", "react", "react-hmre"]
        }
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
      }
    ]
  }
};
