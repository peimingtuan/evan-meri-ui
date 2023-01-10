import { findIndex } from "lodash";

/**
 * 切换数组中的对象
 * @param list 数组集合
 * @param item 当前对象
 * @returns 处理后的数组集合
 */
export const toggle = (list: any[], item: any) => {
    // 查询当前对象是否已经存在数组中
    const index = findIndex(list, item);
    // 如果存在则进行删除，不存在则进行添加
    index !== -1 ? list.splice(index, 1) : list.push(item);
    // 返回修改后得数据
    return list;
}