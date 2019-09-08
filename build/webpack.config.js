
// const webpack = require('webpack');
const { join } = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const argv = require('yargs').argv

// 映射到相对应的文件
const configMap = {
  'development': 'dev',
  'production': 'prod'
}

// 引入对应的配置文件
const mergeConfig = require(`./webpack.${configMap[argv.mode]}.js`)

// 基础公共配置s
const baseConfig = {
  entry: [ 
    join(__dirname, '../src/index.js') 
  ],
  resolve: {
    extensions: ['.js', '.jsx', ".tsx"],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': join(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [ "style-loader", "css-loader", "sass-loader" ]
      },
      { 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { 
        test: /\.tsx?$/,
        loader: ["ts-loader"]
      }
    ] 
  },
  plugins: [
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'index.html',
      template: join(__dirname, '../public/index.html')
    })
  ],
  // 输出的信息
  stats:{
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
}

// 合并配置
module.exports = webpackMerge(baseConfig, mergeConfig)