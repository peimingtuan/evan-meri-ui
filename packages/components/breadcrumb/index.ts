import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Breadcrumb from './src/Breadcrumb'
export const MBreadcrumb: SFCWithInstall<typeof Breadcrumb> = withInstall(Breadcrumb)
export default MBreadcrumb;
export * from './src/Breadcrumb'
