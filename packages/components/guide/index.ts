/*
 * @FilePath: index.ts
 * @Author: zhangjiaqi
 * @Date: 2022-07-14 19:23:42
 * @LastEditors: 
 * @LastEditTime: 2022-07-14 19:25:06
 * Copyright: 2022 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion: 
 */
import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Guide from './src/Guide'
export const MGuide: SFCWithInstall<typeof Guide> = withInstall(Guide)
export default MGuide;

export * from './src/Guide'