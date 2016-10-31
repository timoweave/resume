const path = require('path');

const config = {
  mlab : "mongodb://helloresume:helloresume@ds137197.mlab.com:37197/resume",
  mlocal : "mongodb://localhost:27017/resume",
  isDeveloping : process.env.NODE_ENV !== 'production',
  webpack : path.join(__dirname, 'webpack.config.js')
};

module.exports = config;
