// Funciones de apoyo: leer contenido y armar enlaces.
import { getCollection, getEntry } from 'astro:content';

export async function getSitio() {
  const e = await getEntry('sitio', 'sitio');
  if (!e) throw new Error('Falta src/content/sitio/sitio.json');
  return e.data;
}

export async function getInicio() {
  const e = await getEntry('inicio', 'inicio');
  if (!e) throw new Error('Falta src/content/inicio/inicio.json');
  return e.data;
}

/** Proyectos con "publicar" activo, ordenados por "orden" y luego por fecha. */
export async function getProyectos() {
  const todos = await getCollection('proyectos', ({ data }) => data.publicar);
  return todos.sort(
    (a, b) =>
      a.data.orden - b.data.orden ||
      (b.data.fecha?.getTime() ?? 0) - (a.data.fecha?.getTime() ?? 0),
  );
}

/** Enlace de WhatsApp con mensaje prellenado. Devuelve undefined si no hay número. */
export function enlaceWhatsApp(numero?: string, mensaje?: string) {
  const n = (numero ?? '').replace(/\D/g, '');
  if (!n) return undefined;
  return `https://wa.me/${n}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ''}`;
}

/** URL absoluta a partir de una ruta interna. */
export function absoluta(ruta: string, sitio: URL | undefined) {
  return new URL(ruta, sitio).href;
}

/** Año para mostrar en fichas. */
export function anio(fecha?: Date) {
  return fecha ? String(fecha.getUTCFullYear()) : undefined;
}
