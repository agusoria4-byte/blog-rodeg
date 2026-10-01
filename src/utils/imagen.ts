/**
 * Normaliza la ruta de una imagen del CMS para que funcione tanto en
 * localhost:4321/actualidad/ como detrás del proxy de rodegweb.netlify.app/actualidad/.
 *
 * Acepta formatos viejos que quedaron guardados en las noticias:
 *   "actualidad/img/blog/x.png"  -> "/actualidad/img/blog/x.png"
 *   "/img/blog/x.png"            -> "/actualidad/img/blog/x.png"
 *   "/actualidad/img/blog/x.png" -> se deja igual
 *   "https://..."                -> se deja igual (imagen externa)
 */
export function urlImagen(src?: string): string | undefined {
  if (!src) return src;
  if (/^(https?:)?\/\//i.test(src) || src.startsWith('data:')) return src;

  const base = import.meta.env.BASE_URL.replace(/\/+$/, ''); // "/actualidad"
  const limpia = src.replace(/^\.?\/+/, '').replace(/^actualidad\//, '');
  return `${base}/${limpia}`;
}
