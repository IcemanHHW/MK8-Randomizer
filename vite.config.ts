import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/MK8-Randomizer/',
  plugins: [
    tailwindcss(),
  ],
})