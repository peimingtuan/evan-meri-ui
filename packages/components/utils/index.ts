import { customRef, ref, Ref, unref } from "vue";

export const compose = (...fn: Function[]) => {
    return fn.reduce((a, b) => (...args: any) => a(b(...args)))
}


// export const propsToRef: <T>(props: any, key: string, init: T) => Ref<T> = (props: any, key: string, init: any) => {
//     const value = props[key] || init;
//     return customRef((track, trigger) => {
//       const self = ref(value);
//       return {
//         set(newValue) {
//           trigger();
//           if (props[key] === undefined) {
//             self.value = newValue;
//           } else {
//             emit(`update:${key}`, newValue)
//           }
//         },
//         get() {
//           track();
//           return props[key] === undefined ? unref(self) : props[key];
//         }
//       };
//     })
//   }

export function propsToRef<T>(props: any, emit: (event: string, ...args: any[]) => void, key: string, init: T) {
    const value = props[key] || init;
    return customRef((track, trigger) => {
        const self = ref(value);
        return {
            set(newValue) {
                trigger();
                if (props[key] === undefined) {
                    self.value = newValue;
                } else {
                    emit(`update:${key}`, newValue)
                }
            },
            get() {
                track();
                return props[key] === undefined ? unref(self) : props[key];
            }
        };
    })
}


