import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Select from './src/Select'
import Option from './src/Option'
import OptionGroup from './src/OptionGroup'
export const MOption: SFCWithInstall<typeof Option> = withInstall(Option)
export const MOptionGroup: SFCWithInstall<typeof OptionGroup> = withInstall(OptionGroup)
export const MSelect: SFCWithInstall<typeof Select> = withInstall(Select)

export default MSelect

export * from './src/token'
