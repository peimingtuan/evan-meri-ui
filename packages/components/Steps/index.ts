/*
 * @Author: guoxiaohuan
 * @Date: 2022-06-23 18:11:17
 * @LastEditors: guoxiaohuan
 * @LastEditTime: 2022-07-14 19:48:47
 * @Description: 
 */
import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Steps from './src/Steps'
export const MBSteps: SFCWithInstall<typeof Steps> = withInstall(Steps)
export default MBSteps;

export * from './src/Steps'
