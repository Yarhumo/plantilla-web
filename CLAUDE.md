# Instrucciones para Claude en este repositorio

Sitio estático de un cliente. Lo mantiene Hugo Herrera (arquitecto, no programa).

## Stack fijo (no cambiar sin pedirlo)
Astro (salida estática, 0 JS por defecto) · contenido en src/content (editado por Pages CMS, ver .pages.yml) · publicación en Cloudflare Workers (wrangler.jsonc, assets en ./dist). Nunca GitHub Pages (términos prohíben uso comercial). Nunca Tailwind por CDN.

## Reglas
- La identidad visual del cliente vive en las variables de :root en src/styles/global.css.
- Todo campo nuevo de contenido se agrega en DOS lugares: src/content.config.ts y .pages.yml.
- Imágenes del CMS en src/assets/media (Astro las convierte a AVIF/WebP). Videos >4 MB → YouTube/Vimeo o Cloudflare R2.
- Movimiento: máximo 2–3 gestos, siempre dentro de prefers-reduced-motion: no-preference.
- Accesibilidad AA: contraste ≥ 4,5:1, foco visible, áreas táctiles ≥ 44 px, alt en toda imagen.
- Presupuesto: primera vista < 500 KB, HTML+CSS+JS < 60 KB, LCP < 2,5 s en 4G.
- Antes de entregar: `npx astro build` sin errores, capturas en 390 px y 1440 px, JSON-LD válido.

## Entrega a Hugo
- Parche: solo archivos cambiados, zip plano (sin carpeta envolvente), lista de qué reemplaza.
- Versión completa: todo el código, sin src/assets/media ni contenido editado en el CMS, salvo que Hugo lo pida.
- Pasos de subida en lenguaje no técnico (ver README.md).
