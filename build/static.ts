import { outDirSrc, staticSrc } from "./utils/paths";
import { run } from "./utils";

// 复制Package.json 文件
export default async () => {
    await run(`mkdir ${outDirSrc}/static/`)
    await run(`cp -R ${staticSrc}/ ${outDirSrc}/static/`)
}