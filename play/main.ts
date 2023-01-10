import { createApp } from "vue";
import App from "./app.vue";
import meri from "../packages/components";
import "../packages/theme/index.less";
import "meri-icon/lib/style.css"
const app = createApp(App);
app.use(meri);
app.mount("#app");
