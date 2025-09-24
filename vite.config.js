// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://tasklyserver-0ux1.onrender.com",
        changeOrigin: true,
        secure: false,
       
      },
    },
  },
});



//   'https://tasklyserver-0ux1.onrender.com'
//   'http://localhost:3000'