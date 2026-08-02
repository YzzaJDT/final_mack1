import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            // Forwards API calls to the Node/Express server (server/index.js)
            // during development so the frontend can call relative /api paths.
            "/api": "http://localhost:3001",
        },
    },
});
