// webpack.config.js
const path = require('path');

module.exports = {
  // other stuff
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../src'),
    ],
  },
};
