import { run } from "./utils"
import path from 'path';
import { configs } from './utils/config'
import { outDirSrc, RootSrc, componentsSrc } from './utils/paths';
import ts from 'gulp-typescript'
import { withTaskName } from './utils';
import { build, defineConfig } from "vite";

const task = withTaskName(`vite/ts`, async () => {
    await run("pnpm run genarate");
})

export default task;
