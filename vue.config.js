module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "assets": "@/assets",
                "common": "@/common",
                "components": "@/components",
                "network": "@/network",
                "views": "@/views"
            }
        }
    },
    /*  devServer: { //在cartlistitem中报错后添加的代码
         host: '0.0.0.0',
         port: 8080,
     } */
}