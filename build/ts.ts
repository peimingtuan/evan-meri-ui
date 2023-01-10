import { parallel, src, dest, TaskFunction } from 'gulp'
import path from 'path';
import { configs } from './utils/config'
import { outDirSrc, RootSrc, componentsSrc } from './utils/paths';
import ts from 'gulp-typescript'
import { withTaskName } from './utils';

const tasks = Object.entries(configs).map(([name, { module, target }]) => {
    return withTaskName(`${name}/ts`, () => {
        const tsConfig = path.resolve(RootSrc, 'tsconfig.json'); // ts的配置文件的路径
        return src(path.resolve(componentsSrc, '**/*.{ts,tsx}')).pipe(
            ts.createProject(tsConfig, {
                module,
                target
            })()
        ).pipe(dest(path.resolve(outDirSrc, name)));
    })
})
const task: TaskFunction = parallel(...tasks)

export default task;
