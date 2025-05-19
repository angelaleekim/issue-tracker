import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'], // Group common libraries
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Proxy API requests to the backend
    },
  },
});
