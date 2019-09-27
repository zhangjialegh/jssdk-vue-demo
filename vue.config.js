module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/api/': {
        target: 'http://localhost:8001/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/':'/api/'
        }
      }
    }
  },
  configureWebpack: config => {
    require('vux-loader').merge(config, {
        options: {},
        plugins: ['vux-ui']
    })
  }
}