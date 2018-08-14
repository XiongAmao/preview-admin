const webpack = require('webpack')
const path = require('path')
const mockMiddleware = require('./mock/index.js')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
  // 根据需要配置完整的路径 https://cli.vuejs.org/config/#baseurl
  outputDir: path.resolve('../../server/dist'),
  productionSourceMap: false,
  devServer: {
    before (app) {
      mockMiddleware(path.resolve('./mock/config.js'), app)
    },
    proxy: {
      '/api': {
        // 开发环境
        target: 'http://0.0.0.0:9992/',
        changeOrigin: true
      },
      '/rp': {
        target: 'http://0.0.0.0:9992/',
        changeOrigin: true
      }
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('iview-loader')
      .loader('iview-loader')
      .options({ prefix: true })

    // 在axios中引入router时遇到的报错，参考以下issues解决
    // https://github.com/vuejs/vue-cli/issues/1351
    config.plugin('html').tap((args) => {
      args[0].chunksSortMode = 'none'
      return args
    })
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        __conf: resolve('config')
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        _baseURL_: JSON.stringify(''),
        __MODE__: JSON.stringify(process.env.NODE_ENV)
      })
    ]
  }
}
