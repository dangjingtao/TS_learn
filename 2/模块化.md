## TypeScript

TypeScript是一种由微软开发的**自由和开源**的编程语言。作为JavaScript的一个超集，添加了可选的静态类型和基于类的面向对象编程。

它可以编译为JavaScript。是一种给JavaScript添加特性的语言扩展。它拥有以下特性：

- 类型注释和编译时类型检查
- 基于类的面向对象编程（很像java）
- 泛型
- 接口
- 声明文件
- ...

TypeScript的设计目的应该是解决JavaScript的“痛点”：**弱类型和没有命名空间，导致很难模块化，不适合开发大型程序。**另外它还提供了一些语法糖来帮助大家更方便地实践面向对象的编程。

> **强类型语言**是一种强制类型定义的语言，一旦某一个变量被定义类型，如果不经过**强制转换**，则它永远就是该数据类型。
>
> 根据编译时机来看，多数强类型语言也被定义为**静态语言**——编译时变量的数据类型就可以确定的语言，大多数静态语言要求在使用变量之前必须生命数据类型。包括Java、C、C++、C#等。
>
> **弱类型语言**是一种弱类型定义的语言，某一个变量被定义类型，该变量可以根据环境变化自动进行转换，不需要经过显性强制转换。
>
> 根据编译时机来看，多数弱类型语言也称之为**动态语言**——一类运行时才确定数据类型的语言，变量在使用之前无需申明类型，通常变量的值是被赋值的那个值的类型。包括vb 、PHP、javascript等。

ts是angular的默认开发语言，在即将面世的vue3也将在98%的代码中使用ts。如果还不学，那可能就晚了！

官方中文文档：

<https://www.tslang.cn/index.html>

## 1. helloworld

### 1.1 快速上手

#### 1.1.1 安装

全局安装ts：

```
npm install -g typescript
```

创建一个`hello.ts`：

```typescript
let greeting = (person: String) => `Hello, ${person}`
document.body.innerHTML = greeting("djtao")
```

ts完全支持es5/6的写法。

#### 1.1.2 编译 

在命令行终端运行：

```
tsc hello.ts
```

编译完成后，生成了一个同名的js文件，这就是ts编译出来的JavaScript。写法和普通js无异：

```js
var greeting = function (person) { return "Hello, " + person; };
document.body.innerHTML = greeting("djtao");
```

#### 1.1.3 在web应用上运行

在`greeter.html`里输入如下内容：

```html
<!DOCTYPE html>
<html>
    <head><title>TypeScript Greeter</title></head>
    <body>
        <script src="hello.js"></script>
    </body>
</html>
```

把你编译好的`hello.js`文件在浏览器里打开`greeter.html`运行这个应用即可。

### 1.2 借助webpack工程化开发

现在我们要在一个前端工程项目中使用ts。应该怎么配置呢？

```
npm init -y
```

键入`tsc -h`，可以看到很多配置信息。我们想用一个单独的文件来管理这个项目的typescript配置，可以执行：

```
tsc --init
```

这个时候就创建了一个`tsconfig.json`配置文件。配置项很长很多，以后再进行详细分析。

现在直接来配置webpack。

安装webpack三件套：

```
npm i webpack webpack-cli webpack-dev-server -D
```

为了考虑可维护性，webpack配置可以分为生产环境，开发环境和公共环境配置。

创建build目录用来存放所有webpack配置文件。

#### 1.2.1 公共配置

对应文件：`build/webpack.base.config.js`。

```js
// 1.公共配置
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.ts',// 入口
    output: {
        filename: 'app.js' // 输出文件
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'] //解析格式
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: [{
                    loader: 'ts-loader'
                }], // 使用ts-loader加载ts/tsx
                exclude: /node_modules/ // 排除依赖包下的解析
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/tpl/index.html' //通过模板生成网站首页，并把内容内嵌到html中
        })
    ]
}
```

在上面的文件中，我们使用`ts-loader`加载`ts/tsx`。同时还需要本地再次安装ts

```
npm i ts-loader typescript html-webpack-plugin -D
```

`html-webpack-plugin`插件的作用是：通过制定模板生成网站首页，并把内容内嵌到html中。

编写模板：新建`src/tpl/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>typescript</title>
</head>

<body>
  <div id="app"></div>
</body>
</html>
```

以上就是主要的模板。

#### 1.2.2 开发环境配置

对应文件：`build/webpack.dev.config.js`。

```js
module.exports = {
    devtool: 'cheap-module-eval-source-map'
}
```

cheap-module-eval-source-map是官方推荐的开发工具。

#### 1.2.3 生产环境配置

对应文件：`build/webpack.pro.config.js `

生产环境依赖于`clean-webpack-plugin`插件。

```
npm i clean-webpack-plugin -D
```

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    plugins: [
        new CleanWebpackPlugin()
    ]
}
```

每次成功构建后，清理编译目录（dist）。

#### 1.2.4 webpack全局入口

对应文件：`build/webpack.config.js`

```js
const Merge = require('webpack-merge')

const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const proConfig = require('./webpack.pro.config')

module.exports = (env, argv) => {
  let config = argv.mode === 'development' ? devConfig : proConfig;
  return Merge.merge(baseConfig, config);
};
```

根据打包环境配置引入哪个配置。并与公共配置合并。

引入了合并工具：

```
npm i webpack-merge -D
```

那么webpack配置就完了。

#### 1.2.5 npm 命令配置

在`package.json`配置script脚本：

```json
// 开发环境
"start": "webpack-dev-server --mode=development --config ./build/webpack.config.js",
```

```json
// 生产环境
"build": "webpack --mode=production --config ./build/webpack.config.js",
```

#### 1.2.6 实验一下

新建`src/index.ts`，直接写ts:

```ts
let greeting = (person: string) => `Hello, ${person}`
document.body.innerHTML = greeting("djtao")
```

npm start，访问http://localhost:8080 ,就可以看到效果了。

![](http://markdown.djtao.net/Fqd5dt22mzx-Xy2kPEpEEy5xcgs7)

再来看一下生产打包`npm build`：

可以看到根目录生成了一个dist文件，内有index.html和app.js。打包已经成功了。

后续的笔记都在此工程上展开。

> 本项目github地址：https://github.com/dangjingtao/TS_learn.git


