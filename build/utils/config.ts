export const configs = {
  es: {
    module: "esnext",
    target: "ES6"
  },
  lib: {
    module: "CommonJS",
    target: "ES6"
  },
};
export type Config = typeof configs.es;