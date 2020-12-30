import typescript from "rollup-plugin-typescript2";
import screeps from "rollup-plugin-screeps";

export default {
    input: "src/main.ts",

    plugins: [
        typescript({
            tsconfig: "./tsconfig.json"
        }),
        screeps({
            configFile: "./screeps.json"
        })
    ],

    treeshake: false,

    output: {
        file: "./dist/main.js",
        format: "cjs",
        sourcemap: false
    },


}