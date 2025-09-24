import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
 server: {
  proxy: {
    '/api': 'https://tasklyserver-0ux1.onrender.com'
  }
}
});


//   'https://tasklyserver-0ux1.onrender.com'
//   'http://localhost:3000'