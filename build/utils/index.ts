import { spawn } from "child_process";
import { TaskFunction } from "gulp";
import { RootSrc } from "./paths";
// 对任务进行命名
export const withTaskName = <T>(name: string, fn: any) => Object.assign(fn, { displayName: name }) as TaskFunction;

// 在node使用子进程来运行脚本
export const run = async (command: string) => {
  // rf -rf
  return new Promise((resolve) => {
    const [cmd, ...args] = command.split(" ");

    console.log(command);
    // execa这些库 
    const app = spawn(cmd, args, {
      cwd: RootSrc,
      stdio: "inherit", // 直接将这个子进程的输出
      shell: true, // 默认情况下 linux 才支持 rm -rf （我再电脑里安装了git bash）
    });
    app.on("close", resolve);
  });
};