import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        landing: resolve(projectRoot, 'index.html'),
        adminDashboard: resolve(projectRoot, 'admin/dashboard/index.html'),
        adminTestimonios: resolve(projectRoot, 'admin/testimonios/index.html'),
        compartirExperiencia: resolve(projectRoot, 'compartir-experiencia/index.html'),
      },
    },
  },
});
