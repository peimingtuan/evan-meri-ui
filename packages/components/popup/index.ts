import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Popup from './src/Popup'
export const MPopup: SFCWithInstall<typeof Popup> = withInstall(Popup)
export default MPopup;

export * from './src/Popup'