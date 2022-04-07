/**
 * 优化手段
 * 1. thread-loader
 * 2. cache-loader (大部分loader 已经内置， 只需打开)
 * 3. dll缓存( hard-source-webpack-plugin )
 * 4. 抽离css， 生产环境不要使用style-loader， 但是开发环境用style-laoder 才会热更新
 * 5. 按需加载 js
 * 6. js 压缩 + gzip
 * 7. 自动雪碧图
 * 8. 图片自动压缩
 * 9. 多核打包 uglify 和 happypack 和 thread-loader 等方式开启多核打包
 * 10. 并发打包 parallel-webpack 应用于多页面打包（起多个webapck实例， 不过在4.0时代好向没有什么意义了）
 * 11. 拆分项目 -> 微前端
 * 12. 多页面项目(mpa) 单配置（可抽离公共资源） ||  多配置
 * 13. 路径别名， 减少路径搜索时间
 * 14. exclude 过滤 node_modules
 * 15, ant 按需加载 （ 需要解决ts-loader 的问题）， 可用babel 代替
 * 16， babel useBuildIn 按需polyfill 避免polyfill 体积过大
 * 17. 使用es module 按需引入模块
 * 18, 首页js 资源注入到html上， 减少请求次数， 减少tcp连接时间
 * 19. 静态资源自动上传cdn， 利用cdn缓存，就近访问资源， 避免携带cookie 减少请求体积
 * 20. 抽离运行时， 抽离 runtime, 抽离node_module 中的第三方依赖
 * 21, 增加构建打点 分析打包各个插件loader 耗费时间，便于优化 （speed-measure-webpack-plugin） （慎用， 如果需要对 html-webpack-plugin进行扩展的需求， 你会丢失htmlWebpackPlugin挂载到tabable上的生命周期， 贼坑哦）
 * 22. 生产环境使用 cheap-module-source-map 减少source-map 行信息
 * 23. 分析各个依赖大小， 生成数据报表 webpack-bundle-analyzer
 * 24. 开放无需打包静态资源目录， 避免不必要的打包（copy-webpack-plugin）
 * 25. 多核压缩js, 缓存已打包文件， 抽离注释或是删除注释
 * 26. 安装eslint + 配置 prettier 并使其与eslint 集成
 * 27. manifest 及 pwa 应用
 * 28. css treesharking  purifycss-webpack
 * 29. dns 预解析
 * 
 * react同构文章: https://juejin.im/post/5c627d9b6fb9a049f23d3e38
 */

const webpack = require('webpack');
const { join } = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 构建打点 记录各个插件时间 （慎用， 如果需要对 html-webpack-plugin进行扩展的需求， 你会丢失htmlWebpackPlugin挂载到tabable上的生命周期， 贼坑哦）
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// 更友好的webpack错误提示 
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const smp = new SpeedMeasurePlugin();
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
  // 如果需要的是 mpa 应用，就用 glob 插件读取所有 entry 文件， 配置单独的htmlwebpackplugin, just ok
  // 各个文件的 entry 的格式一定要一样， 比如 数组，那就都要是数组， 谨记
  entry: { 
    'entry': join(__dirname, '../src/index.jsx') 
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': join(__dirname, '../src'),
      'src': join(__dirname, '../src'),
      'store': join(__dirname, '../src/store'),
      // 方便导入消费者
      'http-helper': join(__dirname, '../src/http/index')
    }
  },
  // 使用cdn 依赖
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        // url loader 依赖 file-loader
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name]-[contenthash:7].[ext]'
        }
      }
    ] 
  },
  plugins: [
    new HtmlWebpackPlugin({
      // filename: 'index.html',
      template: join(__dirname, '../public/index.html'),
      // 压缩html
      // minify: {
      //   // 去除空格
      //   // collapseWhitespace: true,
      //   // 去除引号
      //   removeAttributeQuotes: true,
      //   // 去除注释
      //   removeComments: true
      // }
    }),
    // 设置前端环境变量
    // 也可以使用 webpack.EnvironmentPlugin 这种简写的方式
    new webpack.EnvironmentPlugin({
      APP_ENV: argv.appEnv, // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    })
    // new CopyWebpackPlugin([ // 复制插件
    //   { from: join(__dirname,'../static'), to:  join(__dirname, '../dist/static') }
    // ]),
    // 友好的webpack错误提示
    // new FriendlyErrorsWebpackPlugin(),
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
// module.exports = smp.wrap(webpackMerge(baseConfig, mergeConfig))
module.exports = webpackMerge(baseConfig, mergeConfig)