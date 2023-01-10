import { withInstall, SFCWithInstall } from '../utils/with-intall'
import SidebarCustom from './src/SidebarCustom'
export const MsidebarCustom: SFCWithInstall<typeof SidebarCustom> = withInstall(SidebarCustom)
export default MsidebarCustom;

export * from './src/SidebarCustom'

