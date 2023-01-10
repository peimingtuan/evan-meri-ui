import { withInstall, SFCWithInstall } from '../utils/with-intall'
import RadioGroup from './src/RadioGroup'
export const MRadioGroup: SFCWithInstall<typeof RadioGroup> = withInstall(RadioGroup)
export default MRadioGroup

export * from './src/RadioGroup'