module.exports = {
    devServer: {
        port: 8080,
        open: true,
        proxy: {
            '/blogApi': {
                target: 'http://localhost:3000',
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