import { outDirSrc, RootSrc } from "./utils/paths";
import { run } from "./utils";

// 复制Package.json 文件
export default async () => {
    await run(`cp ${RootSrc}/package.json ${outDirSrc}/package.json`)
}