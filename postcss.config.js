module.exports = {
  plugins: [
    // cssnext 已经包含了 autoprefixer 所以使用了 cssnext就不需要 autoprefixer
    // 然而我去找的时候看到 postcss 已经被弃用， 改为了 postcss-preset-env
     //全球有超过5%的人使用的浏览器  配置地址: https://github.com/browserslist/browserslist#queries
    require('postcss-preset-env')({
      // 处理 grid 布局在 IE 10-11前缀
      autoprefixer: { grid: true },
      browsers: [
        "> 1%",     //全球有超过1%的人使用的浏览器
        "last 10 versions", // 每个浏览器最后10个版本
        "not ie <= 8"  // 兼容不小于 ie8
      ]
    }),
    // 自动合并 @import 加载的css 文件（目前不知道会不会和 code split 冲突 待观察）
    require('postcss-import')(),
    // 压缩css 和 删除注释
    require('cssnano')()
  ]
}