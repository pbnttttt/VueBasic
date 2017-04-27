const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const extractCSS = new ExtractTextPlugin('vendor.css');
    let cssDev = ['vue-style-loader', 'css-loader'];
    let cssProd = extractCSS.extract({
        use: 'css-loader',
        fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
    });
    const cssConfig = isDevBuild ? cssDev : cssProd;

    return [{
        stats: {
            modules: false // 關閉 console 在 built modules 時顯示資訊
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
            // alias: {
            //     'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
            // }
        },
        entry: {
            vendor: [
                'bootstrap-vue',
                'bootstrap/dist/css/bootstrap.css',
                'bootstrap-vue/dist/bootstrap-vue.css',
                'vue'
            ]
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js',
            publicPath: '/dist/',
            library: '[name]_[hash]'
        },
        module: {
            rules: [
                { test: /\.css(\?|$)/, use: cssConfig },
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
            ]
        },
        plugins: [
            extractCSS,
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"'
            }),
            new webpack.DllPlugin({
                path: path.join(__dirname, 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    }];
}