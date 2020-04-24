import resolve from '@rollup/plugin-node-resolve';
import strip from 'rollup-plugin-strip';
import babel from 'rollup-plugin-babel';
import {terser} from "rollup-plugin-terser";
import clear from "rollup-plugin-clear";

// https://rollupjs.org/guide/en#big-list-of-options
export default [
    // Node Module
    {
        input: './src/assert.js',
        output: {
            file: './dist/index.js',
            format: 'cjs',
            name: 'assert',
        },
        plugins: [
            resolve(),
            clear({targets: ['./dist']}),
        ]
    },
    // ES2015 Minified
    {
        input: './src/index.js',
        output: {
            file: './dist/assert.min.js',
            format: 'iife',
            name: 'assert',
            compact: true,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            strip({
                // set this to `false` if you don't want to remove debugger statements
                debugger: true,

                // set this to `false` if you're not using sourcemaps – defaults to `true`
                sourceMap: true,
            }),
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: false,
                externalHelpers: false,
                babelrc: false,
                presets: [
                    [
                        "@babel/env",
                        {
                            targets: {
                                ie: '11',
                                edge: '17',
                                firefox: '60',
                                chrome: '71',
                                safari: '11.1',
                            },
                        }
                    ]
                ],
            }),
            terser(),
        ]
    },
    // ES2015 None-Minified
    {
        input: './src/index.js',
        output: {
            file: './dist/assert.js',
            format: 'iife',
            name: 'assert',
            compact: false,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            strip({
                // set this to `false` if you don't want to remove debugger statements
                debugger: true,

                // set this to `false` if you're not using sourcemaps – defaults to `true`
                sourceMap: true,
            }),
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: false,
                externalHelpers: false,
                babelrc: false,
                presets: [
                    [
                        "@babel/env",
                        {
                            targets: {
                                ie: '11',
                                edge: '17',
                                firefox: '60',
                                chrome: '71',
                                safari: '11.1',
                            },
                        }
                    ]
                ],
            }),
        ]
    },
    // ES Module Minified
    {
        input: './src/assert.js',
        output: {
            file: './dist/assert.esm.min.js',
            format: 'esm',
            name: 'assert',
            compact: true,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            strip({
                // set this to `false` if you don't want to remove debugger statements
                debugger: true,

                // set this to `false` if you're not using sourcemaps – defaults to `true`
                sourceMap: true,
            }),
            terser(),
        ]
    },
    // ES Module None-Minified
    {
        input: './src/assert.js',
        output: {
            file: './dist/assert.esm.js',
            format: 'esm',
            name: 'assert',
            compact: false,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            strip({
                // set this to `false` if you don't want to remove debugger statements
                debugger: true,

                // set this to `false` if you're not using sourcemaps – defaults to `true`
                sourceMap: true,
            }),
        ]
    }
];
