const HtmlWebpackPlugin = require('html-webpack-plugin');
const fileLoader = require('file-loader');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
        { test: /\.svg$/, loader: 'file-loader'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};