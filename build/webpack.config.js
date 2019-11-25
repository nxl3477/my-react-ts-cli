
const webpack = require('webpack');
const { join } = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    join(__dirname, '../src/index.tsx') 
  ],
  resolve: {
    extensions: ['.js', '.jsx', ".tsx", ".ts"],
    alias: {
      '@': join(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        // url loader 依赖 file-loader
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ] 
  },
  plugins: [
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'index.html',
      template: join(__dirname, '../public/index.html')
    }),
    // 设置前端环境变量
    new webpack.DefinePlugin({}),
    new CopyWebpackPlugin([ // 复制插件
      { from: join(__dirname,'../static'), to:  join(__dirname, '../dist/static') }
    ])
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