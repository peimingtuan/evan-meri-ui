import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Cascader from './src/Cascader'
export const MCascader: SFCWithInstall<typeof Cascader> = withInstall(Cascader)
export default MCascader;

export * from './src/Cascader'