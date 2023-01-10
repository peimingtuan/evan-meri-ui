/*
 * @FilePath: index.ts
 * @Author: zhangjiaqi
 * @Date: 2022-07-26 14:28:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-22 20:11:26
 * Copyright: 2022 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion: 
 */
import { withInstall, SFCWithInstall } from '../utils/with-intall'
import TimePicker from './src/TimePicker'
import TimePickerPanel from './src/TimePickerPanel'
export const MTimePicker: SFCWithInstall<typeof TimePicker> = withInstall(TimePicker)
export const MTimePickerPanel: SFCWithInstall<typeof TimePickerPanel> = withInstall(TimePickerPanel)
export default MTimePicker;

export * from './src/TimePicker'