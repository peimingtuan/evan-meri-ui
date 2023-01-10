---
index: 0
text:  加载 Loading
componentIndex: 5
sidebarDepth: 2
---

# Loading 加载

加载数据时显示动效

### 全局加载

<demo src="./test/demo.vue" langue="vue"  title="Demo演示" desc="进度条/无进度条/加载失败背景透明用法">
</demo>

### 局部加载

<demo src="./test/demo2.vue" langue="vue"  title="Demo演示" desc="服务调用与指令用法">
</demo>

### 服务

Loading 还可以以服务的方式调用。引入 Loading 服务：

```typescript
import {Loading} from 'meri-plus';
```

在需要调用时：

```typescript
Loading.service(options);
```

其中 `options` 参数为 Loading 的配置项，具体见下表。`LoadingService` 会返回一个 Loading 实例，可通过调用该实例的 `destroy`
方法来关闭它：

```javascript
let loadingInstance = Loading.service(options);

setTimeout(() => {
    loadingInstance.destroy(); // 关闭 loading
    loadingInstance.reload(); // 配置 progressBar可调用此方法重新加载
}, 1000);
```

## API

### Options

| 名称                                    | 类型       | 可选值                   | 默认值                    | 说明                                                     |
|:--------------------------------------|:---------|:----------------------|:-----------------------|:-------------------------------------------------------|
| target                                | string   | -                     | document.body          | Loading 需要覆盖的 DOM 节点                                   |
| fullscreen                            | boolean  | -                     | true                   | 覆盖全屏                                                   |
| lock                                  | boolean  | -                     | false                  | 锁住页面禁止滚动                                               |
| background                            | string   | -                     | rgba(255, 255, 255, 1) | 加载背景颜色                                                 |
| progressBar                           | boolean  | -                     | false                  | 是否显示进度条，`只有在服务调用才生效`                                   | 
| duration                              | number   | -                     | 10                     | 加载超时时间 默认 10秒                                          | 
| lottieName/element-loading-lottieName | string   | plane / ball / circle | plane                  | 动画显示 服务调用使用：lottieName 指令使用：element-loading-lottieName |
| loadTextOptions                       | Object   | -                     | `{text:"",style:{} }`  | 加载图表下面文案配置项 text 文字、 style 样式                          |
| failText                              | string   | -                     | 页面加载失败                 | 加载失败按钮下文案                                              | 
| loadButton                            | Function | -                     | ()=>void               | 加载失败按钮回调                                               |  
| customClass                           | string   | -                     | -                      | 自定义class                                               | 
| reload                                | Function | -                     | -                      | 重新加载                                                   | 
