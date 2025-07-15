import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    host: true,
    allowedHosts: ['romer-dev.com', 'www.romer-dev.com'],
    port: 3000
  }
});
