const path = require('path');
const webpack = require('webpack');
//const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const extractCSS = new ExtractTextPlugin('style.css');

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
        entry: {
            app: './src/boot.ts'
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js',
            publicPath: '/dist/'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
            // alias: {
            //     'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
            // }
        },
        module: {
            rules: [{
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            css: cssConfig //http://vue-loader.vuejs.org/zh-cn/configurations/extract-css.html
                        },
                        preLoaders: {
                            js: 'ts-loader' //http://vue-loader.vuejs.org/zh-cn/configurations/advanced.html
                        }
                    }
                },
                //{ test: /\.tsx?$/, use: 'awesome-typescript-loader?silent=true' },
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                }, 
                {
                    test: /\.css(\?|$)/,
                    use: cssConfig
                },
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
    }];
}