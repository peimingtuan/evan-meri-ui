import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Loading from './src/loading'
export const MLoading: SFCWithInstall<typeof Loading> = withInstall(Loading)
export default MLoading;
export * from './src/loading'

