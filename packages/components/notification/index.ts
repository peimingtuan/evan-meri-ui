import {withInstall, SFCWithInstall} from '../utils/with-intall'
import Notification from './src/NotificationProps'

export const MNotification: SFCWithInstall<typeof Notification> = withInstall(Notification)
export default MNotification;
export * from './src/NotificationProps'
