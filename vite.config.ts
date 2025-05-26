import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: '10.0.80.47', // or specify a specific IP address, e.g., '127.0.0.1'
    },
    preview: {
        port: 3000,
        host: '10.0.80.47', // or specify a specific IP address
        allowedHosts: ['rahat3000.binarybards.online'],
    },
});
