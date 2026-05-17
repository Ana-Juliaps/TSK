import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
   base: '/TSK/',
  server: {
    port: 5173,
    proxy: {
      '/auth':          'http://localhost:3000',
      '/home':          'http://localhost:3000',
      '/artistas':      'http://localhost:3000',
      '/usuarios':      'http://localhost:3000',
      '/notificacoes':  'http://localhost:3000',
      '/pesquisa':      'http://localhost:3000',
      '/acessibilidade':'http://localhost:3000',
      '/musicas':       'http://localhost:3000',
    },
  },
});
