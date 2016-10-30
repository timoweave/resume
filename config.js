const config = {
  mlab : "mongodb://helloresume:helloresume@ds137197.mlab.com:37197/resume",
  mlocal : "mongodb://localhost:27017/resume",
  isDeveloping : process.env.NODE_ENV !== 'production'
};

module.exports = config;
