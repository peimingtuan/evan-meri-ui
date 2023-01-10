import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Tree from './src/Tree'
export const MTree: SFCWithInstall<typeof Tree> = withInstall(Tree)
export default MTree;

export * from './src/Tree'