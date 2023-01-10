import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Input from './src/Input'
export const MInput: SFCWithInstall<typeof Input> = withInstall(Input)
export default MInput;

export * from './src/Input'