const path = require('path');

const webpack = require('webpack');

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const resolve = dir => {
  return path.join(__dirname, dir)
};

function createProxy(params) {
  const result = {};
  Object.keys(params).forEach(item => {
    result[item] = {
      target: params[item],
      changeOrigin: true
    };
  });
  return result;
}

module.exports = {
  // baseUrl: '/',
  // publicPath: '/',
  // outputDir: 'dist',
  // assetsDir: 'static',
  productionSourceMap: false,   // 设为false打包时不生成.map文件
  lintOnSave: process.env.NODE_ENV === 'development', //开发环境开启eslint校验代码
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  configureWebpack: (config) => {
    //入口文件
    config.entry.app = ['babel-polyfill', './src/main.js'];
    //只有打包生产环境才需要将console删除
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
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
      );
      if (process.env.dll) {
        config.plugins.push(
          new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require('./dll/vendor-manifest.json')
          }),
          // 将dll注入到生成的html模板中
          new AddAssetHtmlPlugin({
            filepath: resolve('./dll/*.js'), // dll文件位置
            publicPath: '/js',  // dll 引用路径
            outputPath: '../dist/js',   // dll最终输出的目录
            includeSourcemap: false
          })
        )
      }
    }
    //开启打包分析
    if (process.env.analyz) {
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');

    config.resolve.alias
      .set('@', resolve('src'))
      .set('@view', resolve('src/view'))
      .set('@comp', resolve('src/components'))
      .set('@utils', resolve('src/utils'));
    //为了补删除换行而加的配置
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        // modify the options...
        options.compilerOptions.preserveWhitespace = true;
        return options;
      });
  },
  devServer: {
    port: 8080,// 端口号
    open: true, //配置自动启动浏览器
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: createProxy({
      "/mvc": "http://172.16.17.30:28080"
    })
  }
};
