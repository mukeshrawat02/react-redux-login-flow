const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/static/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
        include: path.join(__dirname, '/src')
      },
      { test: /(\.css)$/, loaders: ['style', 'css'] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') }
    ]
  },
  plugins: [
    new ExtractTextPlugin('main.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
