import { App } from 'vue'
export * from './components'
import * as components from './components'
import { vEllipsis } from "./utils/ellipsis";
import '../theme/theme.css'
import "meri-icon/lib/style.css"
const install = (app: App, prefix: string = 'M') => {
    app.directive("ellipsis", vEllipsis);
    Object.values(components).forEach(comp => app.use(comp as any, prefix))
};

export default install;
