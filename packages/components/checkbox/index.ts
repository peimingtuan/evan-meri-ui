import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Checkbox from './src/Checkbox'
export const MCheckbox: SFCWithInstall<typeof Checkbox> = withInstall(Checkbox)
export default MCheckbox;

export * from './src/Checkbox'