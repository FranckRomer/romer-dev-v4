// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Permitir cualquier host (útil detrás de proxy / Dockploy)
      allowedHosts: true
    },
    preview: {
      host: true,
      // Permitir cualquier host también en preview
      allowedHosts: true,
      port: 3000
    }
  },
  integrations: [react()],
  output: 'static'
});

