import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
    // Development build
    {
        input: 'src/index.js',
        output: {
            file: 'dist/microui.js',
            format: 'umd',
            name: 'MicroUI',
            banner: '/*! MicroUI v1.0.0 | MIT License | https://github.com/lam0819/microui */'
        },
        plugins: [
            nodeResolve(),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            })
        ]
    },
    // Production build
    {
        input: 'src/index.js',
        output: {
            file: 'dist/microui.min.js',
            format: 'umd',
            name: 'MicroUI',
            banner: '/*! MicroUI v1.0.0 | MIT License | https://github.com/lam0819/microui */'
        },
        plugins: [
            nodeResolve(),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            }),
            terser({
                format: {
                    comments: /^!/
                }
            })
        ]
    },
    // ES Module build
    {
        input: 'src/index.js',
        output: {
            file: 'dist/microui.esm.js',
            format: 'es',
            banner: '/*! MicroUI v1.0.0 | MIT License | https://github.com/lam0819/microui */'
        },
        plugins: [
            nodeResolve(),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            })
        ]
    }
];