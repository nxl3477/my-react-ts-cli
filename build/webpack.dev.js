const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [ 
    // react热更新
    'react-hot-loader/patch'
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
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
            options: {
              // modules: true,
              localIdentName: '[contenthash:base64:6]'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        // 避免转换到依赖里面的样式
        use: [ 
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
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
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
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
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name]-[contenthash].css',
      chunkFilename: '[name]-[id]-[contenthash].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),

  ],
  devServer: {
    contentBase: require('path').join(__dirname, "../dist"),
    compress: true,
    port: 8081,
    hot: true,
    host: "localhost",
    overlay: true, // 编译出现错误时，将错误直接显示在页面上
  }
}