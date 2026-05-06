import { microfrontends } from '@vercel/microfrontends/experimental/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

export default defineConfig({
  plugins: [react(), microfrontends() as Plugin],
});

