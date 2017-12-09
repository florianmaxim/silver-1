const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: {
    app: path.join(__dirname, './source'),
  },

  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, './build'),
  },

  module: {

    loaders: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      }
    ],
  },

  plugins: [
    new CopyWebpackPlugin([
       { from: './source/static',
           to: 'static'}
    ]),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, './source/index.html'),
      filename: 'index.html',
      inject: 'body',
    })
  ]

};
