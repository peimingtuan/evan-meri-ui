
/*
 * @Author: Devin
 * @Date: 2022-05-10 11:08:47
 * @LastEditors: Devin
 * @LastEditTime: 2022-06-15 16:24:57
 */
import { SFCWithInstall, withInstall } from "../utils/with-intall";
import Tag from "./src/Tag";
export const MTags: SFCWithInstall<typeof Tag> = withInstall(Tag);
export default MTags;

export * from './src/Tag'
