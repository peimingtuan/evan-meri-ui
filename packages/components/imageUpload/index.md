---
index: 0
text: 上传图片 imageUpload
componentIndex: 1
sidebarDepth: 2
---

# 上传图片 imageUpload

可上传单个或多个图片
点击按钮上传时，可按住shift多选图片，超过数量则不能进行上传

## 图片上传


### 数量限制

<demo src="./test/limit.vue" langue="vue"  title="尺寸" desc="点击按钮上传时，可按住shift多选文件，选择数量超过剩余可以上传文件数量时，无法进行上传">
</demo>

### 自定义触发上传事件

<demo src="./test/dispatch.vue" langue="vue"  title="自定义触发上传事件" desc="上传文件的触发器支持自定义
">
</demo>

### 禁用状态

<demo src="./test/disable.vue" langue="vue"  title="disabled禁用" desc="通过 disabled 属性，对上传文件控件实现禁用">
</demo>


## API

### Attributes

| 名称      | 类型                       | 可选值     | 默认值                  | 说明                                              |
| :-------- | :------------------------- | :--------- | :---------------------- | :------------------------------------------------ |
| host      | String                     | 无         | 无                      | 文件请求服务根地址 需要满足host+FileType 能访问到 |
| action    | String                     | 无         | 无                      | 文件上传请求的接口                                |
| fileSize  | Number                     | Number     | Number.MAX_SAFE_INTEGER | 文件最大上传的字节数                              |
| multiple  | Boolean                    | true/false | false                   | 上传是否可以选择多个                              |
| accepts   | String                     | 无         | 全类型                  | 自定义文件类型                                    |
| limit     | Number                     | 无         | 9                       | 可上传文数                                        |
| disabled  | Boolean                    | true/false | false                   | 是否禁用上传文件                                  |
| dropTitle | String                     | 无         | 上传文件                | 上传文件的文字                                    |
| files     | FileType[]                 | 无         | []                      | 已经上传的文件集合                                |
| upload    | (item: FileType) => void   | 无         | 无                      | 自定义上传的方法度                                |
| valite    | (item: FileType) => string | void       | 无                      | 自定义校验方法，校验完成后可以将错误提示信息返回  |
        

### FileType 

```typescript
// 当前已经上传的文件集合
export type FileType = {
    // 文件服务器对应得Key
    key?: string,
    // 文件的完成路径
    src?: string,
    // 文件名称
    name: string,
    // 文件的体积
    size?: number,
    // 文件类型(标准文件类型)
    type?: string,
    // 文件的后缀
    suffix?: string,
    // 当前文件对象
    file?: File,
    // 状态
    state: "wait" | "pending" | "resolve" | "reject",
    // 进度
    progress?: number,
    // 校验失败的信息
    message?: string,
}
```

### expose

| 名称  | 类型       | 说明                    |
| :---- | :--------- | :---------------------- |
|       |
| files | FileType[] | 当前组件中的的所有文件  |
| input | input:file | 组件中的input:file 对象 |

### Events

| 名称   | 参数                                 | 说明                                                 |
| :----- | :----------------------------------- | :--------------------------------------------------- |
|        |
| delete | (files:FileType[], item:FileType)    | 删除后的回调，files删除后剩余文件，item:被删除的文件 |
| uploda | (files:FileType[], items:FileType[]) | 上传后的回调，files上传后所有文件，item:被上传的文件 |

