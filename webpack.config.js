const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const extractCSS = new ExtractTextPlugin('app.css');
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
        },
        entry: {
            app: './src/boot.ts'
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js',
            publicPath: '/dist/'
        },
        module: {
            rules: [
                {
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
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: 'url-loader?limit=25000'
                }
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
            // enable HMR globally
            new webpack.HotModuleReplacementPlugin(),
            // prints more readable module names in the browser console on HMR updates
            new webpack.NamedModulesPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"'
            }),
            //new webpack.optimize.CommonsChunkPlugin({ name: "vendor" }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./dist/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    }];
}