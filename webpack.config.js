const main = require('./webpack/webpack.main');
const worker = require('./webpack/webpack.worker');

module.exports = [
  worker,
  main
];
