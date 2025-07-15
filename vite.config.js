// vite.config.js
import { defineConfig } from 'astro/config';

export default defineConfig({
    output: 'static', // Asegúrate de que sea static
    build: {
        assets: 'assets'
    },
    server: {
        host: '0.0.0.0',
        port: 3000
    },
    vite: {
        preview: {
            host: '0.0.0.0',
            port: 3000,
            allowedHosts: ['romer-dev.com', 'www.romer-dev.com', 'localhost']
        }
    }
});
