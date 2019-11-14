
const webpack = require('webpack');
const { join } = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
    extensions: ['.js', '.jsx', ".tsx"],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': join(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        // 避免转换到依赖里面的样式
        use: [ 
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: "css-loader",
            // 开启css module
            // options: {
            //   modules: true,
            //   localIdentName: '[hash:base64:6]'
            // }
          }, 
          "sass-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            // 开启css module
            options: {
              modules: true,
              localIdentName: '[hash:base64:6]'
            }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            },
          }
        ]
      },
      { 
        test: /\.(js|jsx|ts(x?))$/,
        // 因为在此处过滤掉了 node_modules, 所以如果不使用babel-plugin-import 就 antd 相关的代码不会被打包到项目
        exclude: /node_modules/,
        use: [ 
          {
            loader: 'babel-loader' ,
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
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