import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ['rete', 'rete-area-plugin', 'rete-connection-plugin', 'rete-react-plugin', 'rete-render-utils']
    }
})
