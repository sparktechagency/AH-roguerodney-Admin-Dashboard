import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: '10.0.80.47',
    },
    preview: {
        port: 3000,
        host: '10.0.80.47',
        allowedHosts: ['rahat3000.binarybards.online'],
    },
});
