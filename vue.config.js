module.exports = {
    productionSourceMap: false,
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],
    configureWebpack: {
        devtool: 'source-map'
    }
}