/**
 * Plugin de Vite: corrige las rutas de imágenes que escribe el CMS dentro de
 * las noticias .mdx ANTES de que Astro intente importarlas. Así una ruta mal
 * guardada nunca vuelve a romper el build en Netlify.
 *
 *   ![x](actualidad/img/blog/a.png)  -> ![x](/actualidad/img/blog/a.png)
 *   ![x](/img/blog/a.png)            -> ![x](/actualidad/img/blog/a.png)
 *   ![]()  (imagen vacía)            -> se elimina
 *   ![x](https://...)                -> se deja igual
 */
const BASE = '/actualidad';

function normalizar(url) {
  if (/^(https?:)?\/\//i.test(url) || url.startsWith('data:')) return url;
  if (url.startsWith('./') || url.startsWith('../')) return url; // imagen local a propósito
  const limpia = url.replace(/^\/+/, '').replace(/^actualidad\//, '');
  return `${BASE}/${limpia}`;
}

const IMAGEN_MD = /!\[([^\]]*)\]\(\s*<?([^)\s>]*)>?(\s+"[^"]*")?\s*\)/g;

export default function rutasImagenesMdx() {
  return {
    name: 'rodeg-rutas-imagenes-mdx',
    enforce: 'pre',
    transform(code, id) {
      if (!id.split('?')[0].endsWith('.mdx')) return null;
      const nuevo = code.replace(IMAGEN_MD, (todo, alt, url, titulo = '') =>
        url ? `![${alt}](${normalizar(url)}${titulo})` : ''
      );
      return nuevo === code ? null : { code: nuevo, map: null };
    },
  };
}
