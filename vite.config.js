import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import './dotenv.config.js';

export default defineConfig({
  plugins: [react()],
});