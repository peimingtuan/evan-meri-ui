import path from 'path';

// 项目根目录 /
export const RootSrc = path.resolve(__dirname, '../../')
// 组件库入口
export const packagesSrc = path.resolve(RootSrc, 'packages')
// 组件文件入口
export const componentsSrc = path.resolve(packagesSrc, 'components')
// 样式文件入口
export const themeSrc = path.resolve(packagesSrc, 'theme')
// 静态文件入口
export const staticSrc = path.resolve(packagesSrc, 'static')
// 字体文件入口
export const fontSrc = path.resolve(themeSrc, 'fonts')
// 模板文件夹
export const templateSrc = path.resolve(RootSrc, 'build', 'template')

// 项目中的dist文件夹
export const outDirSrc = path.resolve(RootSrc, './dist')
// 项目中主题样式的文件夹
export const outThemeSrc = path.resolve(outDirSrc, 'theme')
// 项目中单个组件的样式文件夹
export const outStyleSrc = path.resolve(outDirSrc, 'styles')

