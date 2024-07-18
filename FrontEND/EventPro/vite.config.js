import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const manifestForPlugin = {
  registerType: 'prompt',
  includeAssests: ['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "EventPro App",
    short_name: "EventPro",
    description: "Plataforma dedicada a gestionar eventos",
    lang: 'es-ES',
    icons: [
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: '/maskable-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: "/favicon.ico",
        sizes: "48x48"
      }
    ],
    theme_color: '#A855F7',
    background_color: '#242424',
    display_override: ["window-control-overlay", "minimal-ui"],
    display: "standalone",
    scope: '/',
    start_url: "/",
    orientation: 'portrait'
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  preview: {
    port: 3000,
  },
  server: {
    port: 3010
  }
});
