# 分页插件

该文件包括两个类:

- `Pagination`: 这个是没有生成分页DOM结构的，只有页码的处理逻辑
- `PaginationWithDOM`: 这个继承于`Pagination`，生成页码`DOM元素`，配置灵活

具体配置可以查看源代码，很简单。

## 用法

## Pagination

```
let instance = new Pagination({
  contents: [], // 要分页的数据
  perPageRecord: 5 // 每页展示多少条数据
})

// 调用其API
instance.getPreviousPageContent() // 获取上一页数据
instance.getNextPageContent() // 获取下一页数据
instance.getPageContent(1) // 可以指定页面获取页面数据
```

### PaginationWithDOM

页面DOM结构

```
<div>
    <ul id="list"></ul>
</div>

<div>
    <div id="mPageItem">

    </div>
</div>
```

Javascript调用

```
  let data = []

  for (let i = 1; i < 10; i++) {
    data.push(i)
  }

  const pageInstance = new PaginationWithDOM({
    contents: data,
    pageContainerId: 'mPageItem'
  }, (content) => {
    // 渲染数据的方式, 由用户控制
    let html = ''
    content.forEach(c => {
      html += `<li>${c}</li>`
    })
    document.querySelector('#list').innerHTML = html
  })
```