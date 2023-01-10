/*
 * @Author: wangyongcun
 * @Date: 2021-08-15 15:43:51
 * @LastEditors: wangyongcun
 * @LastEditTime: 2022-11-11 18:42:52
 * @Description: 扩展配置
 */
import DefaultTheme from 'vitepress/theme'; //引入默认主题
import meri from '../../packages/components';// 组件库组件
import '../../packages/theme/index.less';// 组件库组件
import './index.css'; // 文档样式
// 导出vitepress配置
export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.use(meri);
    }
}