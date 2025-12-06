import { defineConfig } from 'vite'
import path from 'path'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TiptapEditor',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@tiptap/react',
        '@tiptap/core',
        '@tiptap/pm',
        '@tiptap/starter-kit',
        '@tiptap/extension-image',
        '@tiptap/extension-list',
        '@tiptap/extension-text-align',
        '@tiptap/extension-typography',
        '@tiptap/extension-highlight',
        '@tiptap/extension-subscript',
        '@tiptap/extension-superscript',
        '@tiptap/extension-table',
        '@tiptap/extension-horizontal-rule',
        '@tiptap/markdown',
        '@tiptap/extensions',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-popover',
        '@floating-ui/react',
        'lodash.throttle',
        'react-hotkeys-hook',
        'katex'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          '@tiptap/react': 'TiptapReact',
          '@tiptap/core': 'TiptapCore'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css'
          return assetInfo.name || 'assets/[name][extname]'
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true
  },
  server: {
    watch: {
      usePolling: true,
    },
    hmr: true,
  },
})
