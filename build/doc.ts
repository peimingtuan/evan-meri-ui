import { run } from "./utils";

// 生成es 文件
export default async () => {
    await run("vitepress build")
};