module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? '/vue-weather/' : '/',
    devServer: {
        host: "localhost",
        open: true,
    },
    publicPath: './',
    lintOnSave: false,
    productionSourceMap: false
}