/**
 * @Description:
 * @author: 邓红军
 * @date: 2022/7/13
 * @fileName: 组件
 */

import {App, createApp, CSSProperties} from "vue";
import component from "./component";


export interface LoadingOptions {
    target?: string | HTMLElement;
    fullscreen?: boolean;
    background?: string;
    customClass?: string;
    progressBar?: boolean;
    duration?: number;
    lock?: boolean;
    loadButton?: () => void;
    loadTextOptions?: { text: string, style: CSSProperties };
    lottieName?: "plane" | "ball" | "circle",
    failText?: string,
}

export  type LoadingReturn = {
    destroy: () => void,
    reload: () => void,
    vm: App,
}


/**
 * 创建组件
 * @param options
 */
export function createLoadingComponent(options?: LoadingOptions): LoadingReturn {

    const vm: App = createApp(component, options as any);


    vm.provide('loading-notice-api', () => vm.unmount()); //卸载组件


    const instance: any = vm.mount(document.createElement('div'));


    return {
        reload: instance.reload,
        destroy: instance.destroy,
        vm,
    }
}

export default function loading(options?: LoadingOptions): LoadingReturn {
    return createLoadingComponent(options);
}

export type LoadingInstance = ReturnType<typeof createLoadingComponent>
