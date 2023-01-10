/*
 * @Author: wangyongcun
 * @Date: 2021-08-20 02:19:49
 * @LastEditors: Devin
 * @LastEditTime: 2022-08-08 10:59:35
 * @Description: vite 增量配置信息
 */
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
const path = require('path')
export default defineConfig({
	plugins: [vueJsx()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'packages')
		}
	},
	esbuild: {
		jsxFactory: 'h',
		jsxFragment: 'Fragment'
	},
	server: {
		port: 8020
	},
})
