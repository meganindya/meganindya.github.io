import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from '@nabla/vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        eslintPlugin({
            formatter: 'stylish'
        }),
        {
            name: 'md-plugin',

            transform(src, id) {
                if (/\.(md)$/.test(id)) {
                    return {
                        code: `const content = \`${src}\`; export default content;`
                    };
                }
            }
        }
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    envDir: './src/env'
});
