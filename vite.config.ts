import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'

function copyThemes(): Plugin {
    return {
        name: 'copy-themes',
        closeBundle() {
            mkdirSync('dist/themes', { recursive: true })
            copyFileSync('src/themes/light.css', 'dist/themes/light.css')
            copyFileSync('src/themes/dark.css', 'dist/themes/dark.css')
        },
    }
}

export default defineConfig({
    root: '.',
    plugins: [copyThemes()],
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