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
    }
}