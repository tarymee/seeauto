# mock接口说明

该api目录存放的是前端所有用到的模拟接口文件 后端按照这些模拟数据文件输出真实的接口

**如无特殊说明 接口都使用POST请求**

## 接口地址
接口地址格式为 https://xxx.com/api/{模拟接口文件名} 「如不同意该格式请告知我 可商量换另一种格式」
以首页列表 indexList.json 为例 接口地址为 https://xxx.com/api/indexList
域名还没申请下来的话 可先用ip地址加端口号代替 如 https://127.0.0.1:8088/api/indexList


## 接口说明
```javascript
{
    "description": "", // description是该接口的一些说明注意事项 后端不需要输出
    "request": { // request是该接口的请求参数 后端不需要输出
        "pageSize": "10",
        "pageIndex": "1"
    },
    "response": { // response返回数据 后端需要输出
        "pageTotal": "2",
        "pageSize": "10",
        "pageIndex": "1",
        "data": [
            {
                "id": "1", // id
                "img": "http://images.3ftc.com/FqOk_0jorD8IE8s--FtwV0MfbdV2", // 图片
                "title": "迟来的思域车主前来报道，现场图文分享，有感而发，真实记录买车情况...", // 标题
                "url": "pages/article/article?id=12345654", // 链接
                "type": "1", // 类型
                "typename": "热门推荐" // 类型名称
            }
            ...
        ]
    }
}
```

## 一些传参统一约定
+ 如果接口需要有用户信息的校验「比如获取用户信息接口」 前端统一传 token
+ 如果用户是登录状态 除了登录接口外所有接口都有传 token 这样可方便后端做一些用户访问统计
+ 如果接口需要城市信息「比如首页的下拉信息内容列表接口 是需要根据用户手机的定位城市返回该城市的信息的」 前端统一传 cityid
+ 如果接口需要详细定位信息「比如附近商家页面」 前端统一传经纬度信息 latitude longitude
+ 如果接口是下拉刷新列表类型的 前端统一传 pageSize「每页条数」 pageIndex「第几页 1表示第1页」 后端统一返回 pageTotal「总页数」 pageSize pageIndex 以及 该接口的数组信息



## 返回信息 url 说明
url 是根据小程序根目录下 pages.json 文件里面的 pages 数组，里面包含了小程序中所有页面 其中 path 就是页面链接

以下为两个例子

+ 首页: "pages/index/index"
+ 车型详情: "pages/model/model?id=xxx" 一般详情页面的链接后面需要加上 ?id=xxx

```javascript
{
    "pages": [
        {
            "path": "pages/index/index", // 首页链接
            "style": {
                "navigationStyle": "custom",
                "navigationBarTitleText": "首页"
            }
        },
        {
            "path": "pages/model/model", // 车型详情链接 以 "pages/model/model?id=xxx" 访问
            "style": {
                "navigationStyle": "custom",
                "navigationBarTitleText": "车型详情"
            }
        }
    ]
}
```