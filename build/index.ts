import { series, parallel, TaskFunction } from "gulp";

import clear from "./clean"
import ts from "./ts"
import vite from "./vite";
import less from "./less"
import font from "./font";
import packages from './packages'
import doc from "./doc"
import staticTask from './static'
import { withTaskName } from "./utils";

const tasks: TaskFunction = series(
    // 删除文件夹
    withTaskName("clear", clear),
    parallel(
        // 构建ES
        withTaskName("vite", vite),
        // 复制字体 主题等文件
        withTaskName("font", font),
        // 构建文档
        // withTaskName("doc", doc)
    ),
    // 构建Less
    less,
    // 复制package文件
    withTaskName("package", packages) as TaskFunction,
    // 复制静态文件
    // withTaskName("static", staticTask) as TaskFunction,
)

//1.打包样式 2.打包工具方法 2.打包所有组件 3.打包每个组件 4.生成一个组件库 5.发布组件 
export default tasks;