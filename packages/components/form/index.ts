import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Form from './src/Form'
export const MForm: SFCWithInstall<typeof Form> = withInstall(Form)
export default MForm;

export * from './src/Form'