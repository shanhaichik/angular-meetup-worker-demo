const merge = require('webpack-merge');
const common = require('./webpack.common');

const worker = {
  "target": "webworker",
  "entry": {
    "worker": [
      "./src/worker.ts"
    ]
  }
};

module.exports = merge(common, worker);
