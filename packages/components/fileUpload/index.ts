import { withInstall, SFCWithInstall } from '../utils/with-intall'
import FileUpload from './src/fileUpload'
export const MFileUpload: SFCWithInstall<typeof FileUpload> = withInstall(FileUpload)
export default MFileUpload;

export * from './src/fileUpload'