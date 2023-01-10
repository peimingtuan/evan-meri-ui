import path from "path";
import { outThemeSrc, fontSrc } from "./utils/paths";

import { src, dest } from "gulp";
// 对字体文件进行打包
function font() {
    return src(path.resolve(fontSrc, "**/*.{ttf,woff,woff2}"))
        .pipe(dest(path.resolve(outThemeSrc)));
}

export default font;