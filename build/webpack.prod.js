// const webpack = require('webpack');
const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  output: {
    path: join(__dirname, '../dist'),
    filename: "[name]-[contenthash].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: "css-loader",
            // 开启css module
            options: {
              // modules: true,
              localIdentName: '[contenthash:base64:6]'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [ 
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
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
          // 如果你css文件还不多就别加了
          // {
          //   loader: 'thread-loader'
          // },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            }
          },
          {
            loader: "css-loader",
            // 开启css module
            options: {
              modules: true,
              localIdentName: '[contenthash:base64:6]'
            }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            },
          }
        ],
        include: [/antd/]
      },
      {
        test: /\.(js|jsx|ts(x?))$/,
        // 因为在此处过滤掉了 node_modules, 所以如果不使用babel-plugin-import 就 antd 相关的代码不会被打包到项目
        exclude: /node_modules/,
        use: [ 
          // {
          // // 把这个 loader 放置在其他 loader 之前， 放置在这个 loader 之后的 loader 就会在一个单独的 worker 池(worker pool)中运行
          // // --- 记录一下我测试的结果，因项目文件只有几个还比较少， 加上了 thread-loader, 平均只比没有加的时候快 300 毫秒  
          //   loader: 'thread-loader'
          // },
          {
            loader: "cache-loader"
          },
          {
            loader: 'babel-loader' ,
            options: {
              // 缓存打包编译过的文件
              cacheDirectory: true
            }
          }
        ]
      },
    ]
  },
  plugins: [
    // 打包前清除缓存
    new CleanWebpackPlugin(),
    // 抽离 css
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name]-[contenthash].css',
      chunkFilename: '[name]-[id]-[contenthash].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    // gzip
    // new CompressionWebpackPlugin(),
    // 生成html
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'index.html',
      template: join(__dirname, '../public/index.html')
    }),
    // 开启dll缓存
    new HardSourceWebpackPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // 压缩 js
      new TerserPlugin({
        extractComments: false,
      }),
      // 压缩css
      new OptimizeCssAssetsPlugin()
    ],
    // 抽离运行时
    runtimeChunk: {
      name: entrypoint => `runtimechunk-${entrypoint.name}`
    },
    // code split
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 3,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      // 会被 chunk具体配置中的name 覆盖， 如果chunk中没有设置， 并且此处 name = true ， 会以key 替代 【name】变量占位符
      name: true,
      cacheGroups: {
        // 注意: priority属性
        // 其次: 打包业务中公共代码
        common: {
          // name: "common",
          chunks: "all",
          minSize: 1,
          priority: 0
        },
        // 首先: 打包node_modules中的文件
        vendor: {
          // name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        },
        async: {
          chunks: "async",
          minSize: 1
        }
      }
    }
  },
  // 性能相关
  performance: {
    // 提示
    hints: "warning", // 枚举
    // 资源大小提示
    maxAssetSize: 20000000, // 整数类型（以字节为单位）
    // 入口文件大小
    maxEntrypointSize: 40000000, // 整数类型（以字节为单位）
    // 匹配文件类型
    assetFilter: function(assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  }
}