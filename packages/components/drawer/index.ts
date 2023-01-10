import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Drawer from './src/drawer'
export const MDrawer: SFCWithInstall<typeof Drawer> = withInstall(Drawer)
export default MDrawer;

export * from './src/drawer'