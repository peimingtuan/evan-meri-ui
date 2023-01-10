import { withInstall, SFCWithInstall } from '../utils/with-intall'
import ${ componentName } from './src/${componentName}'
export const M${ componentName }: SFCWithInstall<typeof ${ componentName }> = withInstall(${ componentName })
export default M${ componentName };

export * from './src/${componentName}'