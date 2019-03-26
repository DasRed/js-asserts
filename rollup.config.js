import resolve from 'rollup-plugin-node-resolve';
import progress from 'rollup-plugin-progress';
import strip from 'rollup-plugin-strip';
import babel from 'rollup-plugin-babel';
import {terser} from "rollup-plugin-terser";

// https://rollupjs.org/guide/en#big-list-of-options
export default [
    // Node Module
    {
        input:   './src/assert.js',
        output:  {
            file:   './dist/index.js',
            format: 'cjs',
            name:   'assert',
        },
        plugins: [
            resolve(),
            progress({clearLine: false}),
        ]
    },
    // ES2015 Minified
    {
        input:   './src/index.js',
        output:  {
            file:      './dist/assert.min.js',
            format:    'iife',
            name:      'assert',
            compact:   true,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            progress({clearLine: false}),
            strip({
                // set this to `false` if you don't want to remove debugger statements
                debugger: true,

                // set this to `false` if you're not using sourcemaps – defaults to `true`
                sourceMap: true,
            }),
            babel({
                exclude:         'node_modules/**',
                runtimeHelpers:  false,
                externalHelpers: false,
                babelrc:         false,
                presets:         [
                    [
                        "@babel/env",
                        {
                            targets: {
                                ie:      '11',
                                edge:    '17',
                                firefox: '60',
                                chrome:  '71',
                                safari:  '11.1',
                            },
                        }
                    ]
                ],
            }),
            terser({sourcemap: true}),
        ]
    },
    // ES2015 None-Minified
    {
        input:   './src/index.js',
        output:  {
            file:      './dist/assert.js',
            format:    'iife',
            name:      'assert',
            compact:   false,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            progress({clearLine: false}),
            strip({
                // set this to `false` if you don't want to remove debugger statements
                debugger: true,

                // set this to `false` if you're not using sourcemaps – defaults to `true`
                sourceMap: true,
            }),
            babel({
                exclude:         'node_modules/**',
                runtimeHelpers:  false,
                externalHelpers: false,
                babelrc:         false,
                presets:         [
                    [
                        "@babel/env",
                        {
                            targets: {
                                ie:      '11',
                                edge:    '17',
                                firefox: '60',
                                chrome:  '71',
                                safari:  '11.1',
                            },
                        }
                    ]
                ],
            }),
        ]
    },
    // ES Module Minified
    {
        input:   './src/assert.js',
        output:  {
            file:      './dist/assert.esm.min.mjs',
            format:    'esm',
            name:      'assert',
            compact:   true,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            progress({clearLine: false}),
            strip({
                // set this to `false` if you don't want to remove debugger statements
                debugger: true,

                // set this to `false` if you're not using sourcemaps – defaults to `true`
                sourceMap: true,
            }),
            terser({sourcemap: true}),
        ]
    },
    // ES Module None-Minified
    {
        input:   './src/assert.js',
        output:  {
            file:      './dist/assert.esm.js',
            format:    'esm',
            name:      'assert',
            compact:   false,
            sourcemap: true,
        },
        plugins: [
            resolve(),
            progress({clearLine: false}),
            strip({
                // set this to `false` if you don't want to remove debugger statements
                debugger: true,

                // set this to `false` if you're not using sourcemaps – defaults to `true`
                sourceMap: true,
            }),
        ]
    }
];
