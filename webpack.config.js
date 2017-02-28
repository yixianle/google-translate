'use strict';
let path = require('path');
var webpack = require('webpack')

const stylelint = require('stylelint');

var env = process.env.NODE_ENV
var config = {
  entry: {
    index: './app/react/index.js'
    // application: './app/assets/javascripts/application.js',
    // articles: './app/assets/javascripts/articles.js',
    // editor: './app/assets/javascripts/editor.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      }
    ]
  },
  output: {
    path: path.join(__dirname, '/public/assets'),
    filename: '[name]_bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
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
