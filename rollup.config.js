import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const banner = `/*! MicroUI v${pkg.version} | MIT License | https://github.com/lam0819/microui */`;

// Simple plugin to replace __VERSION__ with actual version
const replaceVersion = () => ({
    name: 'replace-version',
    transform(code) {
        return code.replace(/__VERSION__/g, pkg.version);
    }
});

export default [
    // Development build
    {
        input: 'src/index.js',
        output: {
            file: 'dist/microui.js',
            format: 'umd',
            name: 'MicroUI',
            banner
        },
        plugins: [
            nodeResolve(),
            replaceVersion(),
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
            banner
        },
        plugins: [
            nodeResolve(),
            replaceVersion(),
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
            banner
        },
        plugins: [
            nodeResolve(),
            replaceVersion(),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            })
        ]
    }
];