import type {App, Component, Plugin} from "vue"; // 只导入类型 而不是导入值
import {NOOP} from '@vue/shared'
import directive from "../loading/src/directive";

// 类型必须导出否则生成不了.d.ts文件
export type SFCWithInstall<T> = T & Plugin;

export const withInstall = <T, E extends Record<string, any>>(comp: T, extra?: E) => {
    (comp as SFCWithInstall<T>).install = function (app: App, prefix: string = 'M') {
        app.component(`${prefix.toUpperCase()}${(comp as any).name}`, comp as Component);
        //指令注册
        if ((comp as any).directive) {
            app.directive(`${(comp as any).name.toLowerCase()}`, (comp as any).directive);
        }
    };

    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            ;(comp as any)[key] = comp
        }
    }
    return comp as SFCWithInstall<T> & E
};

export const withNoopInstall = <T>(component: T) => {
    ;(component as SFCWithInstall<T>).install = NOOP

    return component as SFCWithInstall<T>
}
