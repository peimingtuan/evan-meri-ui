import { run } from "./utils";
import { outDirSrc } from "./utils/paths"


// 删除之前的文件
export default async () => await run(`rimraf ${outDirSrc}`);