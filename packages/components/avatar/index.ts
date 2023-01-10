import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Avatar from './src/Avatar'
export const MAvatar: SFCWithInstall<typeof Avatar> = withInstall(Avatar)
export default MAvatar;

export * from './src/Avatar'