import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Switch from './src/Switch'
export const MSwitch: SFCWithInstall<typeof Switch> = withInstall(Switch)
export default MSwitch;

export * from './src/Switch'