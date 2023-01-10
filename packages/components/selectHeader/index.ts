import { withInstall, SFCWithInstall } from '../utils/with-intall'
import SelectHeader from './src/SelectHeader'
export const MSelectHeader: SFCWithInstall<typeof SelectHeader> = withInstall(SelectHeader)
export default MSelectHeader;

export * from './src/SelectHeader'