const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.ts',// 入口
  output: {
    filename: 'app.js' // 输出文件
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'] //解析格式
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [{
          loader: 'ts-loader'
        }], // 使用ts-loader加载ts/tsx
        exclude: /node_modules/ // 排除依赖包下的解析
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/tpl/index.html' //通过模板生成网站首页，并把内容内嵌到html中
    })
  ]
}