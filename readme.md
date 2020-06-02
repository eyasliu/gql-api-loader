# Graphql Api Loader

自动请求生成 graphql 请求的 webpack loader

## 使用方法

### 安装

```
npm install --save-dev gql-api-loader
```

### 使用步骤

#### 1. webpack loader 配置

在 webpack 配置中加上 `gql-api-loader` 的配置

```js
{
  // ... 其他配置
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        // use: { loader: 'gq-loader'}, // 最简单配置
        use: { loader: 'gql-api-loader'
          options: { // 选项
            endpoint: '/graphql' // 可选，该值可以再运行时改变，这里可以理解为是一个默认值
          }
        }
      }
    ]
  }
}
```

loader 的 options 可选项为

```js
{
  raw: false, // 如果为true，直接导出 graphql 查询语句，已自动解析 Fragment 依赖，如果为false，导出可直接执行的查询函数，默认为false
  debug: false, // 调试模式
  endpoint: '/graphql', // 默认的 graphql url，可以在运行时更改
}
```

#### 2. 编写 .graphql 文件

示例

`fragment.graphql` 定义共用的部分

```graphql
fragment userFields on User {
  uid
  userName
}
```

业务接口，先导入 `fragment.graphql`，然后定义两个查询

```graphql
#import './fragment.gql'
query check {
  me {
    ...userFields
    nickName
  }
}

mutation create($param: UserParam) {
  userCreate(input: $param) {
    ...userFields
    nickName
  }
}
```

在业务代码中引用，调用接口

```js
import gqlConfig from 'gql-api-loader/lib/config'
gqlConfig({
  endpoint: 'http://127.0.0.1:9000/gql', // graphql 的 url
  credentials: 'include', // fetch 参数的 credentials 配置，是否携带 cookies
  headers: { Authorization: 'Beare XXXXXXXXXXXXXX' }, // 可以配置请求的headers
  fetch: (url, options) => window.fetch(url, options), // 完全自己定义请求函数，参数与 window.fetch 一致
})

import user from './user.graphql'

;(async function(){
  const { me } = await user.check() // 直接请求
  console.log(me)

  const {userCreate: userinfo} = await user.create({input: {userName: 'eyas'}}) // 参数要以object形式传入
  console.log(userinfo)
})()

```

