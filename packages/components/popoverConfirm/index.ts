/*
 * @Description: 
 * @Author: Devin
 * @Date: 2022-07-30 21:34:21
 * @LastEditTime: 2022-07-30 21:40:25
 * @LastEditors: Devin
 * @Reference: 
 */
import { withInstall, SFCWithInstall } from '../utils/with-intall'
import PopConfirm from './src/popover-confirm'
export const MPopConfirm: SFCWithInstall<typeof PopConfirm> = withInstall(PopConfirm)
export default MPopConfirm

export * from './src/popover-confirm-types'
