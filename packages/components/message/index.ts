import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Message from './src/Message'
export const MMessage: SFCWithInstall<typeof Message> = withInstall(Message)
export default MMessage;

export * from './src/Message'