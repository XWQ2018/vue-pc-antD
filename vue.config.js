const path = require('path');
// const path = await import('path');
const resolve = dir => path.join(__dirname, dir);
module.exports = {
    publicPath: './',
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/common.scss";`, //sass-loader 8.x版本,加载scss变量
                // additionalData: `@import "@/assets/scss/common.scss";`,//9.x版本
            },
        },
    },
    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
            .set('@assets', resolve('src/assets'))
            .set('@css', resolve('src/assets/css'))
            .set('@img', resolve('src/assets/img'))
            .set('@components', resolve('src/components'));
        // config.performance.hints(false);
    },
};
