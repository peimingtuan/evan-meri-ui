import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Transfer from './src/Transfer'
export const MTransfer: SFCWithInstall<typeof Transfer> = withInstall(Transfer)
export default MTransfer;

export * from './src/Transfer'