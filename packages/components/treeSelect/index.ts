import { withInstall, SFCWithInstall } from '../utils/with-intall'
import TreeSelect from './src/TreeSelect'
export const MTreeSelect: SFCWithInstall<typeof TreeSelect> = withInstall(TreeSelect)
export default MTreeSelect;

export * from './src/TreeSelect'