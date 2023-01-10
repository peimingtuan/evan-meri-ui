import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Logo from './src/Logo'
export const MLogo: SFCWithInstall<typeof Logo> = withInstall(Logo)
export default MLogo;

export * from './src/Logo'