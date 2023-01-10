import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Button from './src/Button'
export const MButton: SFCWithInstall<typeof Button> = withInstall(Button)
export default MButton;

export * from './src/Button'