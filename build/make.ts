import { series, parallel, TaskFunction } from "gulp"
import { withTaskName, run } from "./utils"
import { RootSrc, templateSrc } from "./utils/paths";
import path from "path";
import fs from "fs/promises"

// 全部驼峰命名
const componentName = "Table";
const dir = Array.from(componentName).map((word, index) => index == 0 ? word.toLowerCase() : word).join('');
const className = `m${componentName}`.replace(/[A-Z]/g, (str) => `-${str.toLowerCase()}`)


const replace = (text: string, name: string) => {
    name = name.trim()
    if (name === 'componentName') return componentName;
    if (name === 'className') return className;
    if (name === 'dir') return dir;
    console.error(text);
    return text;
}

const task: TaskFunction = series(
    withTaskName("创建一个新的组件", async (...argu) => {
        console.log(argu)
    }),
    withTaskName("生成文件夹", series(
        () => run(`mkdir ${path.resolve(RootSrc, `packages/components/${dir}`)}`),
        () => run(`mkdir ${path.resolve(RootSrc, `packages/components/${dir}/styles`)}`),
        () => run(`mkdir ${path.resolve(RootSrc, `packages/components/${dir}/src`)}`),
    )),
    withTaskName("生成文件", parallel(
        () => run(`touch ${path.resolve(RootSrc, `packages/components/${dir}/index.ts`)}`),
        () => run(`touch ${path.resolve(RootSrc, `packages/components/${dir}/styles/index.less`)}`),
        () => run(`touch ${path.resolve(RootSrc, `packages/components/${dir}/index.md`)}`),
        () => run(`touch ${path.resolve(RootSrc, `packages/components/${dir}/src/${componentName}.tsx`)}`),
        () => run(`touch ${path.resolve(RootSrc, `packages/components/${dir}/src/${componentName}Props.ts`)}`),
    )),
    withTaskName("写入文件", parallel(
        async () => {
            fs.writeFile(path.resolve(RootSrc, `packages/components/${dir}/index.ts`), `${await fs.readFile(path.resolve(templateSrc, 'index.ts'))}`.replace(/\$\{(.*?)\}/g, replace))
        },
        async () => {
            fs.writeFile(path.resolve(RootSrc, `packages/components/${dir}/styles/index.less`), `${await fs.readFile(path.resolve(templateSrc, 'index.less'))}`.replace(/\$\{(.*?)\}/g, replace))
        },
        async () => {
            fs.writeFile(path.resolve(RootSrc, `packages/components/${dir}/index.md`), `${await fs.readFile(path.resolve(templateSrc, 'index.md'))}`.replace(/\$\{(.*?)\}/g, replace))
        },
        async () => {
            fs.writeFile(path.resolve(RootSrc, `packages/components/${dir}/src/${componentName}.tsx`), `${await fs.readFile(path.resolve(templateSrc, 'index.tsx'))}`.replace(/\$\{(.*?)\}/g, replace))
        },
        async () => {
            fs.writeFile(path.resolve(RootSrc, `packages/components/${dir}/src/${componentName}Props.ts`), `export default {}`)
        },
        async () => {
            fs.appendFile(path.resolve(RootSrc, `packages/components/components.ts`), `\nexport * from './${dir}'`)
        },
        async () => {
            fs.appendFile(path.resolve(RootSrc, `packages/theme/index.less`), `\n@import '../components/${dir}/styles/index.less';`)
        },
    )),
)

export default task;