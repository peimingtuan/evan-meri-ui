import { withInstall, SFCWithInstall } from '../utils/with-intall'
import ImageUpload from './src/ImageUpload'
export const MImageUpload: SFCWithInstall<typeof ImageUpload> = withInstall(ImageUpload)
export default MImageUpload;

export * from './src/ImageUpload'