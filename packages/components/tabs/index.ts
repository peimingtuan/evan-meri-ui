import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Tabs from './src/Tabs'
export const MTabs: SFCWithInstall<typeof Tabs> = withInstall(Tabs)
export default MTabs;

export * from './src/Tabs'
