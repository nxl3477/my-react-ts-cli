const webpack = require('webpack');

module.exports = {
  entry: [ 
    // react热更新
    'react-hot-loader/patch'
  ],
  resolve: {
    alias: {
      // 解决控制台报错， 提示部分特性将无法使用的问题
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
    new webpack.HotModuleReplacementPlugin()
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