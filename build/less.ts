// 打包样式
import less from "gulp-less";
import autoprefixer from "gulp-autoprefixer";
import cleanCss from "gulp-clean-css";
import rename from "gulp-rename";
import path from "path";
import { themeSrc, outThemeSrc, componentsSrc, outStyleSrc } from "./utils/paths";
import { src, dest, parallel, TaskFunction } from "gulp";

// 构建整体的CSS文件
function lessTask() {
    return src(path.resolve(themeSrc, "**/*.{less,css}"))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(dest(path.resolve(outThemeSrc)));
}

function every() {
    return src(path.resolve(componentsSrc, "**/*.less"))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(rename(p => {
            return ({
                ...p,
                dirname: `m${path.join(p.dirname, '..')}`
            });
        }))
        .pipe(dest(path.resolve(outStyleSrc)));
}

const task: TaskFunction = parallel(lessTask, every);

export default task;