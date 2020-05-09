const babelConfig = {
    presets: [["@babel/preset-env",{
        useBuiltIns: "entry",
        corejs: 2
    }], "@babel/preset-react"],
    // @babel/plugin-syntax-dynamic-import -- 支持动态导入文件
    plugins: [
        "@babel/plugin-syntax-dynamic-import",
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties'
    ]
}

module.exports = babelConfig

// useBuiltIns是关键属性，它会根据 browserlist 是否转换新语法与 polyfill 新 AP业务代码使用到的新 API 按需进行 polyfill

//  false : 不启用polyfill, 如果 import '@babel/polyfill', 会无视 browserlist 将所有的 polyfill 加载进来
//  entry : 启用，需要手动 import '@babel/polyfill', 这样会根据 browserlist 过滤出 需要的 polyfill
//  usage : 不需要手动import '@babel/polyfill'(加上也无妨，构造时会去掉), 且会根据 browserlist +

// 注：经测试usage无法支持IE，推荐使用entry，虽然会大几十K。

// @babel/plugin-transform-runtime和@babel/runtime-corejs2，前者是开发时候使用，后者是生产环境使用。主要功能：避免多次编译出helper函数：Babel转移后的代码想要实现和原来代码一样的功能需要借助一些帮助函数。还可以解决@babel/polyfill提供的类或者实例方法污染全局作用域的情况。

// @babel/plugin-proposal-class-properties是我之前漏掉了，如果你要在class里面写箭头函数或者装饰器什么的，需要它的支持。
