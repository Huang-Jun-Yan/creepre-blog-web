module.exports = {
    // publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
    devServer: {
        port: 8080,
        open: true,
        proxy: {
            '/blogApi': {
                target: 'http://121.43.188.162:3300/', // http://localhost:3000 --- http://121.43.188.162:3300/
                changeOrigin: true,
                pathRewrite: {
                    '^/blogApi': ''
                }
            }
        }
    },
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    // Provide path to the file with resources
                    // resources: "./src/assets/css/base.scss",

                    // Or array of paths
                    resources: ['./src/assets/css/base.scss']
                })
                .end()
        })
    }
}