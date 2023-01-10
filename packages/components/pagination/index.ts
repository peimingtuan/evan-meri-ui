/*
 * @Author: Devin
 * @Date: 2022-07-05 16:11:38
 * @LastEditors: Devin
 * @LastEditTime: 2022-07-06 10:24:54
 */
import { SFCWithInstall, withInstall } from "../utils/with-intall";
import Pagination from "./src/Pagination";

export const MPagination: SFCWithInstall<typeof Pagination> = withInstall(Pagination);
export default MPagination;

export * from './src/pagination-tool'