/* eslint-disable */

import * as path from 'path';
import { createVuePlugin } from 'vite-plugin-vue2';
import esbuildPlugin from 'esbuild-plugin-vite-element-ui';
import legacyPlugin from '@vitejs/plugin-legacy';

// https://cn.vitejs.dev/config/
export default ({ command, mode }) => {
    let rollupOptions = {};

    let optimizeDeps = {};
    if (command === 'serve') {
        optimizeDeps.esbuildOptions = { plugins: [esbuildPlugin()] };
    }

    let alias = {
        '@': path.resolve(__dirname, './src'),
        vue$: 'vue/dist/vue.esm.js',
    };

    let proxy = {
        '/api': { target: 'https://bstest.ienjoys.com', changeOrigin: true, pathRewrite: { '^/api': '' } },
    };

    let esbuild = {};

    return {
        base: './', // index.html文件所在位置
        root: './', // js导入的资源路径，src
        resolve: {
            alias,
        },
        define: {
            'process.env.APP_IS_LOCAL': '"true"',
        },
        server: {
            // 代理
            proxy,
        },
        build: {
            target: 'es2015',
            minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
            manifest: false, // 是否产出maifest.json
            sourcemap: false, // 是否产出soucemap.json
            outDir: 'build', // 产出目录
            rollupOptions,
        },
        esbuild,
        optimizeDeps,
        plugins: [
            createVuePlugin(),
            legacyPlugin({
                targets: ['Android > 39', 'Chrome >= 60', 'Safari >= 10.1', 'iOS >= 10.3', 'Firefox >= 54', 'Edge >= 15'],
            }),
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "./src/assets/css/mixin.scss";',
                },
            },
        },
    };
};