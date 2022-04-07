// const webpack = require('webpack');
const { join } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 一键集成dll缓存
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// js压缩
const TerserPlugin = require('terser-webpack-plugin');
// 依赖包大小分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 打包进度条显示
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// 打包成功通知
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
// 图片压缩插件
const ImageminPlugin = require('imagemin-webpack-plugin').default
// css tree shaking
// const PurifyCSSPlugin = require('purifycss-webpack');
// 多进程打包
// const HappyPack = require('happypack');
// const os = require('os')
// 拿到系统CPU的最大核数，happypack 将编译工作灌满所有线程 - 1
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 })
module.exports = {
  output: {
    path: join(__dirname, '../dist'),
    filename: "js/[name]-[contenthash].js",
    publicPath: '/',
    // 接受webpack打包后函数导出值的变量名
    // library: 'result',
    // var || this || window || umd 导出的变量以挂到什么对象上
    // libraryTarget: 'window'
  },
  // mode = production 会默认开启多实例压缩和缓存
  // 不包含列信息，同时 loader 的 sourcemap 也被简化为只包含对应行的。最终的 sourcemap 只有一份，它是 webpack 对 loader 生成的 sourcemap 进行简化，然后再次生成的。
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            }
          },
          {
            loader: "postcss-loader",
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [ 
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader"
          }, 
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          }
        ]
      },
      {
        test: /\.module\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: '[contenthash:base64:6]'
            }
          }, 
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          }
        ]
      },
      {
        test: /\.less$/,
        include: [/antd/],
        use: [
          // thread-loader 和 MiniCssExtractPlugin.loader 有冲突
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
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
        // 因为在此处过滤掉了 node_modules, 所以如果不使用babel-plugin-import 的话 antd 相关的代码不会被打包到项目
        exclude: /node_modules/,
        // use: 'happypack/loader?id=js'
        use: [ 
          {
          // 把这个 loader 放置在其他 loader 之前， 放置在这个 loader 之后的 loader 就会在一个单独的 worker 池(worker pool)中运行
          // --- 记录一下我测试的结果，因项目文件只有几个还比较少， 加上了 thread-loader, 平均只比没有加的时候快 300 毫秒  
            loader: 'thread-loader'
          },
          // {
          //   loader: 'console-loader'
          // },
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
    // 分析打包的依赖包大小关系
    // new BundleAnalyzerPlugin(),
    // gzip
    // new CompressionWebpackPlugin(),
    // 显示打包进度条
    new ProgressBarPlugin(),
    // 打包成功弹窗通知
    new WebpackBuildNotifierPlugin({
      title: "alltuu-dev 打包成功",
      // logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true
    }),

    
    // happyPack 感觉实际没什么用啊， 改用thread-loader 了， 等项目大了再观察观察
    // new HappyPack({
    //   id: 'js',
    //   threadPool: happyThreadPool,
    //   loaders: [
    //     {
    //       loader: 'babel-loader' ,
    //       options: {
    //         // 缓存打包编译过的文件
    //         cacheDirectory: true
    //       }
    //     }
    //   ],
    // }),
    // 打包前清除缓存
    new CleanWebpackPlugin(),
    // 抽离 css
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash].css',
      chunkFilename: 'css/[name]-[contenthash].css',
      esModule: true,
      // 是否禁用检查顺序
      ignoreOrder: true
    }),
    // css tree shaking 需要放到 MiniCssExtractPlugin 之后, 但是很傻逼啊， 我的css 都丢了
    // 论坛上的关于 tree shaking 的讨论 https://gitter.im/css-modules/css-modules?at=5701b77b76b6f9de194dc1d6
    // new PurifyCSSPlugin({
    //   paths: glob.sync([
    //     join(__dirname, '../*.html'),
    //     join(__dirname, '../src/**/**.tsx'),
    //     join(__dirname, '../src/**/**.ts'),
    //     join(__dirname, '../src/**/**.js')
    //   ])
    // }),
    // 开启dll缓存
    // new HardSourceWebpackPlugin(),
    // 图片压缩插件
    new ImageminPlugin({ 
      // disable: process.env.NODE_ENV !== 'production', // 开发时不启用
      pngquant: {
        //图片质量
        quality: '95-100'
      },
      test: /\.(jpe?g|png|gif|svg)$/i 
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // 压缩 js
      new TerserPlugin({
        // 多核打包 - 显式的指定一下好了， 默认就是true
        parallel: true,
        // 开启缓存 （ Doesn't work with webpack 5!）
        cache: true,
        // 抽出注释
        extractComments: false,
      }),
      // 压缩css (已被 postcss 代替)
      // new OptimizeCssAssetsPlugin()
    ],
    // 抽离webpack运行时
    runtimeChunk: {
      name: entrypoint => `runtimechunk-${entrypoint.name}`
    },
    // code split
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1, // 默认值
      // maxSize: 0,
      // maxAsyncRequests: 5,  // 限制最大请求
      // maxInitialRequests: 3, // 最大的初始化加载个数
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      // 会被 chunk具体配置中的name 覆盖， 如果chunk中没有设置， 并且此处 name = true ， 会以key 替代 【name】变量占位符
      name: true,
      cacheGroups: {
         // 抽离node_modules 运行时依赖( 个人觉得vendor最好加上minChunk， 因为存在部分页面才用到的依赖没必要一口气加载过来)
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all", // 所有文件
          minChunks: 3, // 最少复用次数
          priority: 10 // 权重
        },
        // 注意: priority属性（表示权重）
        // 其次: 打包业务中公共代码
        common: {
          name: "common",
          chunks: "initial", //初始化文件
          minSize: 3,  // 只要超出2字节就生成一个新包
          reuseExistingChunk: true, // 如果已从主捆绑包中拆分出的模块，则将重用该模块，而不是生成新的模块
          priority: 0
        },
        async: {
          chunks: "async", // 异步文件
          reuseExistingChunk: true, // 已从主捆绑包中拆分出的模块，则将重用该模块，而不是生成新的模块
          minSize: 3
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