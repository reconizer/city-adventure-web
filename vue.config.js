const path = require('path');

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/city-adventure-creator-app/' : '/',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,

  css: undefined,

  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];

    types.forEach(type => {
      addStyleResource(config.module.rule('sass').oneOf(type))
    });

    // Do not use url loader; use file loader instead
    config.module.rules.delete('images');
    config.module.rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('file-loader').loader('file-loader');
  },

  lintOnSave: undefined
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/sass/_variables.sass'),
        path.resolve(__dirname, './src/sass/_mixins.sass')
      ],
    })
}
