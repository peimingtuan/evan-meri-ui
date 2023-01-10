/*
 * @Author: Devin
 * @Date: 2022-04-11 17:47:34
 * @LastEditors: Devin
 * @LastEditTime: 2022-06-16 18:01:30
 */
import { SFCWithInstall, withInstall } from "../utils/with-intall";
import Anchor from "./src/Anchor";

export const MAnchor: SFCWithInstall<typeof Anchor> = withInstall(Anchor);
export default MAnchor;

export * from './src/Anchor'