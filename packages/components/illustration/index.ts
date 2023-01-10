import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Illustration from './src/Illustration'
export const MIllustration: SFCWithInstall<typeof Illustration> = withInstall(Illustration)
export default MIllustration;

export * from './src/Illustration'