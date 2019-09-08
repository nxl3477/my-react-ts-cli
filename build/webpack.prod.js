// const webpack = require('webpack');
const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  output: {
    path: join(__dirname, '../dist'),
    filename: "bundle-[hash].js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'index.html',
      template: join(__dirname, '../public/index.html')
    })
  ]
}