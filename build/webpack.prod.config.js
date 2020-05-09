const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    // 代码映射
    devtool: 'none',
    // 入口
    entry: {
        app: [path.join(__dirname, '../src/index.js')],
        // 提取公共模块代码
        vender: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux']
    },
    // 开发环境(development)和生产环境(production)的构建目标差异很大。
    // 在开发环境中，我们需要具有实时重新加载 或 热模块替换能力的 source map 和 localhost server。
    // 在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。


    // 以前webpack使用uglifyjs-webpack-plugin来压缩文件，使我们打包出来的文件体积更小。
    // 现在只需要配置mode即可自动使用开发环境的一些配置，包括JS压缩等等
    mode: 'production',
    output: {
        // 输出到dist目录，输出文件名为bundle.js
        path: path.join(__dirname, '../dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath : '/dist/'
    },
    module: {
        rules: [
            // src目录下面的以.js结尾的文件，要使用babel解析
            // cacheDirectory是用来缓存编译结果，下次编译加速
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, '../src')
            },
            // css-loader: 使你能够使用类似@import 和 url(...)的方法实现 require()的功能
            // style-loader: 将所有的计算后的样式加入页面中； 
            // 二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中(dist/index.js)
            {
                test: /\.(css)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                },{
                    // CSS的规则都是全局的，任何一个组件的样式规则，都对整个页面有效。
                    // 产生局部作用域的唯一方法，就是使用一个独一无二的class的名字，
                    // 不会与其他选择器重名。这就是 CSS Modules 的做法。
                    loader:'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[local]--[hash:base64:5]'
                    }
                },'postcss-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 8192意思是，小于等于8K的图片会被
                        // 转成base64编码，直接插入HTML中，减少HTTP请求。
                        limit: 8192
                    }
                }]
            }
        ]
    },
    // webpack-dev-server
    devServer: {
        // contentBase: path.join(__dirname, '../dist'), // 允许访问指定目录下面的文件
        compress: true,  // gzip压缩
        host: '127.0.0.1', // 允许ip访问
        hot:true, // 热更新
        historyApiFallback:true, // 解决启动后刷新404
        port: 8000, // 端口
        proxy: { // 配置服务代理
            '/api': {
                 target: 'http://localhost:8000',
                 pathRewrite: {'^/api' : ''},  //可转换
                 changeOrigin:true // 可以帮我们解决跨域的问题
            }
        },
    },
    resolve: {
        alias: {
            pages: path.join(__dirname, '../src/pages'),
            components: path.join(__dirname, '../src/components'),
            router: path.join(__dirname, '../src/router'),
            actions: path.join(__dirname, '../src/redux/actions'),
            reducers: path.join(__dirname, '../src/redux/reducers'),
            images: path.join(__dirname, '../src/images')
        }
    },
    plugins: [
        // 模版自动导入打包后的文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html')
        }),
        // 抽取css
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css'
        }),
        // css压缩
        new OptimizeCssAssetsPlugin(),
        // 打包清空
        new CleanWebpackPlugin()
    ],

    // 这表示将选择哪些块进行优化。当提供一个字符串，有效值为all，async和initial。
    // 提供all可以特别强大，因为这意味着即使在异步和非异步块之间也可以共享块。
    optimization: {
        splitChunks: {
          chunks: 'all'
        }
    }
}