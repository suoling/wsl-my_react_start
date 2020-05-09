const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// hash
// 是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值

// chunkhash
// 和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。

// contenthash
// 是针对文件内容级别的，只有你自己模块的内容变了，那么hash值才改变，所以我们可以通过contenthash解决上诉问题


module.exports = {
    // 代码映射
    devtool: 'inline-source-map',
    // 入口
    entry: {
        app: [
            // @babel/polyfill可以让我们愉快的使用浏览器不兼容的es6、es7的API。
            // 但是他有几个缺点：
            // 一是我们只是用了几个API，它却整个的引入了
            // 二是会污染全局
            "@babel/polyfill",
            path.join(__dirname, '../src/index.js')
        ],
        // 我们打包的文件里面包含了react,redux,react-router等等这些代码，
        // 每次发布都要重新加载，其实没必要，我们可以将他们单独提取出来。
        // 在webpack.dev.config.js中配置入口：
        // 提取公共模块代码
        vender: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux']
    },
    mode: 'development',
    output: {
        // 输出到dist目录，输出文件名为bundle.js
        path: path.join(__dirname, '../dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        // publicPath : '/dist/'
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
                use: [
                    // { loader: MiniCssExtractPlugin.loader },
                    'style-loader',
                    {
                        // CSS的规则都是全局的，任何一个组件的样式规则，都对整个页面有效。
                        // 产生局部作用域的唯一方法，就是使用一个独一无二的class的名字，
                        // 不会与其他选择器重名。这就是 CSS Modules 的做法。
                        loader:'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]--[hash:base64:5]'
                        }
                    },
                    // PostCSS提供了Autoprefixer
                    // 我们在写CSS的时候，需要加浏览器前缀的工作，它将帮我们完成
                    'postcss-loader'
                ]
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
        host: '0.0.0.0', // 允许ip访问
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
        // 看这里：切记名称不可声明成你引入的其他包名。
        // 别名的会覆盖你的包名，导致你无法引用其他包。
        // 栗子：redux、react等
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
        // 每次启动都会使用这个html-webpack-plugin，
        // webpack会自动将打包好的JS注入到这个index.html模板里面
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html')
        }),
        // 我们看到source下只有js文件，但是实际上我们是有一个css文件的，
        // 它被打包进入了js文件里面，现在我们将它提取出来。 
        // 使用webpack的mini-css-extract-plugin插件

        // new MiniCssExtractPlugin({
        //     filename: '[name].[contenthash].css',
        //     chunkFilename: '[id].[contenthash].css'
        // })
    ]
    
}