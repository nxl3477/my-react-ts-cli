const webpack = require('webpack');
module.exports = {
  entry: [ 
    // react热更新
    'react-hot-loader/patch'
  ],
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

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