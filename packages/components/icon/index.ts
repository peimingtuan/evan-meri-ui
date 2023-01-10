import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Icon from './src/Icon'
export const MIcon: SFCWithInstall<typeof Icon> = withInstall(Icon)
export default MIcon;

export * from './src/Icon'