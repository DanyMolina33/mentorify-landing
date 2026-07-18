import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        landing: resolve(process.cwd(), 'index.html'),
        compartirExperiencia: resolve(process.cwd(), 'compartir-experiencia/index.html'),
        adminTestimonios: resolve(process.cwd(), 'admin/testimonios/index.html'),
        adminDashboard: resolve(process.cwd(), 'admin/dashboard/index.html'),
      },
    },
  },
});
