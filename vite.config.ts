import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // 函数形式是正确的 Rollup TS 类型
        manualChunks(id) {
          if (id.includes('node_modules/three'))          return 'three';
          if (id.includes('node_modules/framer-motion')) return 'motion';
          if (id.includes('node_modules/react-dom'))     return 'react-vendor';
          if (id.includes('node_modules/react/'))        return 'react-vendor';
        },
      },
    },
    // 提升 chunk 体积警告阈值（three.js 较大）
    chunkSizeWarningLimit: 700,
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
  },
  server: {
    warmup: {
      clientFiles: [
        './src/App.tsx',
        './src/components/Hero.tsx',
        './src/components/AnimatedBackground.tsx',
        './src/components/ui/LiquidEther.tsx',
      ],
    },
  },
  // 依赖预构建：让 Vite 提前 bundle 大型 CJS 库
  optimizeDeps: {
    include: ['three', 'framer-motion', 'react', 'react-dom'],
  },
})
