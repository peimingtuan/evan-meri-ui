import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Modal from './src/Modal'
export const MModal: SFCWithInstall<typeof Modal> = withInstall(Modal)
export default MModal;

export * from './src/Modal'