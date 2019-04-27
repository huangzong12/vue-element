const path = require('path');

const webpack = require('webpack');

const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

// dll文件存放的目录
const dllPath = './dll';

module.exports = {
  mode: 'production',
  entry: {
    // 需要提取的库文件
    vendor: ['vue/dist/vue.runtime.esm.js', 'vue-router', 'vuex', 'axios', 'iview']
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name].dll.[chunkhash].js', // vendor.dll.js中暴露出的全局变量名
    library: '[name]'   // 保持与 webpack.DllPlugin 中名称一致
  },
  plugins: [
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      name: '[name]',   // 保持与 output.library 中名称一致
      context: process.cwd()
    }),
    new ParallelUglifyPlugin({
      sourceMap: false,
      uglifyJS: {
        output: {
          comments: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          drop_debugger: true
        }
      }
    })
  ]
};
