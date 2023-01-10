/*
 * @Author: Devin
 * @Date: 2022-06-28 17:37:54
 * @LastEditors: Devin
 * @LastEditTime: 2022-08-08 17:00:39
 */
import { SFCWithInstall, withInstall } from "../utils/with-intall";
import Dropdown from "./src/Dropdown";

export const MDropdown: SFCWithInstall<typeof Dropdown> = withInstall(Dropdown);
export default MDropdown;

export * from './src/Dropdown'