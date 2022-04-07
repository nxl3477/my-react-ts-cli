const webpack = require('webpack');
const { join } = require('path')

function getIPAdress() {
  var interfaces = require('os').networkInterfaces();　　
  for (var devName in interfaces) {　　　　
      var iface = interfaces[devName];　　　　　　
      for (var i = 0; i < iface.length; i++) {
          var alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
              return alias.address;
          }
      }　　
  }
}


module.exports = {
  entry: {
    // react热更新
    'react-hot-loader': 'react-hot-loader/patch'
  },
  output: {
    path: join(__dirname, '../dist'),
    filename: "js/[name]-[hash].js",
    publicPath: '/',
    // 接受webpack打包后函数导出值的变量名
    // library: 'result',
    // var || this || window || umd 导出的变量以挂到什么对象上
    // libraryTarget: 'window'
  },
  // 开发环境还是使用 eval 比较快
  devtool: "cheap-module-eval-source-map",
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        // 避免转换到依赖里面的样式
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
          }
        ]
      },
      // 带 .module 的文件会使用css module 模式
      {
        test: /\.module\.scss$/,
        // 避免转换到依赖里面的样式
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: '[hash:base64:6]'
            }
          },
          {
            loader: "sass-loader",
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: "css-loader"
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
          // 'thread-loader',
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
    // new HappyPack({
    //   // 3) re-add the loaders you replaced above in #1:
    //   loaders: [ 'babel-loader?presets[]=es2015' ],
    //   id: 'babel'
    // }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.DefinePlugin({
    //   PRODUCTION: JSON.stringify('This is something we needed.')
    // })
  ],
  devServer: {
    contentBase: require('path').join(__dirname, "../dist"),
    compress: true,
    port: 9000,
    hot: true,
    host: getIPAdress(),
    historyApiFallback: true,
    overlay: true, // 编译出现错误时，将错误直接显示在页面上
    open: true
  }
}