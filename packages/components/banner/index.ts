import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Banner from './src/Banner'
export const MBanner: SFCWithInstall<typeof Banner> = withInstall(Banner)
export default MBanner;

export * from './src/Banner'