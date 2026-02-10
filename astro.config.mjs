// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['romer-dev.com']
    },
    preview: {
      host: true,
      allowedHosts: ['romer-dev.com', 'www.romer-dev.com'],
      port: 3000
    }
  },
  integrations: [react()],
  output: 'static'
});

