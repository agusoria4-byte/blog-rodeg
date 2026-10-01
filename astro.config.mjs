// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import rutasImagenesMdx from './src/utils/vite-rutas-imagenes.mjs';

// https://astro.build/config
export default defineConfig({
  base: '/actualidad',
  vite: {
    // rutasImagenesMdx corrige rutas de imágenes mal guardadas por el CMS (ver src/utils/vite-rutas-imagenes.mjs)
    plugins: [rutasImagenesMdx(), tailwindcss()]
  },

  integrations: [mdx()]
});
