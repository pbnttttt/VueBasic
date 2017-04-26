const path = require('path');
const webpack = require('webpack');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('vendor.css');

module.exports = {
    entry: './src/boot.ts',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.js', '.ts']
        // alias: {
        //     'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        // }
    },
    module: {
        rules: [
            { test: /\.(vue|vue\.html)$/, loader: 'vue-loader', options: { loaders: { js: 'awesome-typescript-loader?silent=true' } } },
            //{ test: /\.ts$/, use: 'awesome-typescript-loader?silent=true' },
            { test: /\.ts$/, loader: 'ts-loader', options: { appendTsSuffixTo: [/\.(vue|vue\.html)$/] } }, // 要在 vue 檔使用 typescript，就要用ts-loader
            { test: /\.css(\?|$)/, use: extractCSS.extract({ use: 'css-loader' }) },
            //{ test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
        ]
    },
    devServer: {
        open: true, //啟動 server 後開啟 browser
        compress: true, //啟動 gzip 壓縮
        stats: "errors-only", //Log 只顯示錯誤訊息
        hot: true
    },
    plugins: [
        extractCSS,
        //new CheckerPlugin(),
        // enable HMR globally
        new webpack.HotModuleReplacementPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin(),
    ]
}