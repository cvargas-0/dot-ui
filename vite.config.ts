import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
    root: '.',
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'DotUI',
            fileName: (format) => `dot-ui.${format}.js`,
            formats: ['es', 'umd'],
        },
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.names.includes('style.css')) return 'dot-ui.css'
                    return assetInfo.name ?? 'asset'
                },
            },
        },
        outDir: 'dist',
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    }
})