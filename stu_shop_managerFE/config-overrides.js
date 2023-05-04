/*
const {override,fixBabelImports,addLessLoader} = require('customize-cra');

//针对antd实现按需打包：根据import来打包（使用‘babel-plugin-import’）
module.exports = override(
    fixBabelImports('import',{
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, //自动打包相关的样式
    }),
    //使用less-loader对源码中的less的变量进行重新指定
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'}
    }),
);
*/

const {override,fixBabelImports,addLessLoader,overrideDevServer} = require('customize-cra');

const addProxy = () => (configFunction) => {
    configFunction.proxy = {
        '/api': {
            target: 'http://127.0.0.1:8000',
            changeOrigin: true,
            pathRewrite: { '^/api': '/' },
        },
    };

    return configFunction;
}

//针对antd实现按需打包：根据import来打包（使用‘babel-plugin-import’）
module.exports = {
    webpack:override(
    fixBabelImports('import',{
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, //自动打包相关的样式
    }),
    //使用less-loader对源码中的less的变量进行重新指定
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'}
    }),
),
devServer: overrideDevServer(
    addProxy()
)
}



