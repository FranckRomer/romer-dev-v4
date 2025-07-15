// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    preview: {
        host: true,
        allowedHosts: ['romer-dev.com'],
        port: 4321 // O el puerto que estés usando
    }
});
