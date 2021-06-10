const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const env = process.env.NODE_ENV

// const smp = new SpeedMeasureWebpackPlugin({
    // outputFormat: 'human',
    // outputTarget: resolve('./buildSpeed.log')
// })

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    runtimeCompiler: true,
    devServer: {
        port: 8010,
        proxy: {
            '/api': {
                target: 'https://bstest.ienjoys.com',
                changeOrigin: true,
                pathRewrite: {
                '^/api': ''
                }
            }
        }
    },
    // 默认情况下，babel-loader不解析node_modules中的文件，配置这个参数可以显式的解析Node_modules中的某个依赖
    transpileDependencies: [
        /gem-pub-lib/
    ],

    // 显示打包中loader和plugin中花费的时间
    // configureWebpack: smp.wrap({}),

    chainWebpack: (config) => {
        config.optimization.minimize(env === 'production')

        config.when(env !== 'development', config => {
            config.plugin('gzipPlugin')
                .use(CompressionWebpackPlugin, [
                {
                    test: /\.js|\.css$/,
                    threshold: 10240
                }
                ])
        })

        config.resolve.alias
            .set('@', resolve('src'))
            .set('publib', resolve('/node_modules/gem-pub-lib/packages'))

        // 自动引入scss
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))

        // 加快打包速度
        // config.plugin('hardSource').use(HardSourceWebpackPlugin, [{
        //     cacheDirectory: resolve('buildCache/hard-source/[confighash]')
        // }]);


        // config.module
        //         .rule('eslint')
        //             .use('eslint')
        //             .tap(options => merge(options, { plugins: ['babel-plugin-syntax-object-rest-spread'] }));

        // config.merge({
        //     optimization: {
        //         splitChunks: {
        //             cacheGroups: {
        //                 vue: {
        //                     name: 'chunk-vue',
        //                     test: /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/,
        //                     priority: -9,
        //                     enforce: true,
        //                     chunks: 'all',
        //                     reuseExistingChunk: true
        //                 }
        //             }
        //         }
        //     }
        // })
        // config.module.rule('js').use('babel-loader').tap(args => {
        //     return {
        //         exclude: [
        //             /!node_modules[\\/]gem-pub-lib/
        //         ],
        //         // include: /gem\-pub\-lib/
        //     }
        // })
    },
};

function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
        patterns: [
            path.resolve(__dirname, './src/assets/css/mixin.scss'),
            path.resolve(__dirname, './src/assets/css/common.scss')
        ]
    })
}
