'use strict';
let path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const stylelint = require('stylelint');

var env = process.env.NODE_ENV
var config = {
  entry: {
    index: './browser/index.js'
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'assets/[name]_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './browser/index.html',
    inject: 'body'
  })]
  // ,
  // plugins: [
  //   new webpack.optimize.OccurrenceOrderPlugin(),
  //   new webpack.DefinePlugin({
  //     'process.env.NODE_ENV': JSON.stringify(env)
  //   })
  // ]
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

module.exports = config
