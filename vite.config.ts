import { build, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import dts from 'vite-plugin-dts'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(),dts()],
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  build: {
    outDir: path.resolve(__dirname, "dist/dist"),
    lib: {
      entry: path.resolve(__dirname, "packages/components/index.ts"),
      name: "meri",
      fileName: (format) => `meri.${format}.js`
    },
    sourcemap: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue','lodash','meri-icon','dayjs','axios','@vueuse/core','@vue/shared','@floating-ui/dom','@types/lodash','async-validator','element-resize-detector','vue3-lottie'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        }
      }
    }
  }
})
