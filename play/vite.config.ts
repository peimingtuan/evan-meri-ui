/*
 * @Author: Devin
 * @Date: 2022-06-15 11:17:07
 * @LastEditors: Devin
 * @LastEditTime: 2022-07-26 14:46:12
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  base: "/",
  plugins: [vue(), vueJsx()],
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  server: {
    port: 3000,
    proxy:{
      "/api":"https://gapmdev.persagy.com"
    }
  },
});
