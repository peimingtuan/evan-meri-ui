import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Radio from './src/Radio'
export const MRadio: SFCWithInstall<typeof Radio> = withInstall(Radio)
export default MRadio;

export * from './src/Radio'