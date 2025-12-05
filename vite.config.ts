import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './apps/demo/src'),
      '@tiptap-editor/ui-primitives': path.resolve(__dirname, './packages/ui-primitives/src'),
      '@tiptap-editor/nodes': path.resolve(__dirname, './packages/nodes/src'),
      '@tiptap-editor/ui-components': path.resolve(__dirname, './packages/ui-components/src'),
      '@tiptap-editor/hooks': path.resolve(__dirname, './packages/hooks/src'),
      '@tiptap-editor/utils': path.resolve(__dirname, './packages/utils/src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api']
      }
    }
  },
  server: {
    watch: {
      usePolling: true
    },
    hmr: true,
    port: 5173,
    open: true
  },
  build: {
    outDir: path.resolve(__dirname, './apps/demo/dist'),
    sourcemap: true,
    emptyOutDir: true
  },
  optimizeDeps: {
    include: [
      '@tiptap-editor/ui-primitives',
      '@tiptap-editor/nodes',
      '@tiptap-editor/ui-components',
      '@tiptap-editor/hooks',
      '@tiptap-editor/utils'
    ],
    exclude: [
      '@tiptap/pm',
      '@tiptap/react'
    ]
  },
  preview: {
    port: 5174
  }
})
