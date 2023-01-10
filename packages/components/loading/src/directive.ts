/**
 * @Description:
 * @author: 邓红军
 * @date: 2022/7/21
 * @fileName: directive
 */
import {DirectiveBinding, isRef, ref, UnwrapRef} from "vue";
import {createLoadingComponent, LoadingInstance, LoadingOptions} from "./service";
import {isObject, isString} from "lodash";

const INSTANCE_KEY = Symbol('MLoading')

interface DirectiveLoadingOptions extends LoadingOptions {
    callMethod?: string;
}

export type LoadingBinding = boolean | UnwrapRef<DirectiveLoadingOptions>

export interface ElementLoading extends HTMLElement {
    [INSTANCE_KEY]?: {
        instance: LoadingInstance
        options: DirectiveLoadingOptions
    }
}

/**
 * @description: 创建loading组件
 * @param el
 * @param binding
 */
function createInstance(el: ElementLoading, binding: DirectiveBinding<LoadingBinding>) {
    const vm = binding.instance;
    // @ts-ignore
    const getBindingProp = <K extends keyof DirectiveLoadingOptions>(key: K): DirectiveLoadingOptions[K] => isObject(binding.value) ? binding.value[key] : undefined;

    const resolveExpression = (key: any) => {
        const data = (isString(key) && vm?.[key]) || key
        if (data) return ref(data)
        else return data
    }
    const getProp = <K extends keyof DirectiveLoadingOptions>(name: K) => resolveExpression(getBindingProp(name) || el.getAttribute(`element-loading-${name}`))

    const options: DirectiveLoadingOptions = {
        target: el,
        lock: binding.modifiers?.lock || false,
        fullscreen: false,
        lottieName: getProp("lottieName")?.value,
        background: getProp("background")?.value,
        callMethod: "directive",
    }

    el[INSTANCE_KEY] = {
        instance: createLoadingComponent(options),
        options,
    }
}

const updateOptions = (newOptions: UnwrapRef<DirectiveLoadingOptions>, originalOptions: DirectiveLoadingOptions) => {
    for (const key of Object.keys(originalOptions)) {
        if (isRef(originalOptions[key]))
            originalOptions[key].value = newOptions[key]
    }
}


export default {
    mounted(el: ElementLoading, binding: DirectiveBinding) {
        if (binding.value) {
            createInstance(el, binding)
        }
    },
    updated(el: ElementLoading, binding: DirectiveBinding) {
        const instance = el[INSTANCE_KEY]
        if (binding.oldValue !== binding.value) {
            if (binding.value && !binding.oldValue) {
                createInstance(el, binding)
            } else if (binding.value && binding.oldValue) {
                if (isObject(binding.value))
                    updateOptions(binding.value, instance!.options)
            } else {
                instance?.instance.destroy()
            }
        }
    },
    unmounted(el: ElementLoading) {
        el[INSTANCE_KEY]?.instance.destroy()
    }
}
