# Plantilla web de cliente · v1.0

Sitio rápido, editable sin código y gratis de publicar (solo se paga el dominio).
**GitHub** guarda los archivos, **Cloudflare** publica y **Pages CMS** es el formulario para editar.
Funciona como un plano: GitHub es el archivo, Cloudflare la obra y Pages CMS la ventanilla de cambios.

## Qué trae
- Inicio: portada, introducción, servicios, proyectos, proceso, testimonios, preguntas frecuentes y contacto con WhatsApp prellenado.
- Una página por proyecto (`/proyectos/nombre/`), con ficha, galería y créditos, y WhatsApp que menciona ese proyecto.
- Página de tratamiento de datos (Ley 1581): **un abogado debe revisar el texto**.
- SEO: título y descripción por página, tarjeta para compartir (WhatsApp, LinkedIn, X), datos estructurados (negocio, proyectos, migas, preguntas), sitemap, robots.txt.
- Velocidad: 0 JavaScript; imágenes convertidas solas a AVIF/WebP en varios tamaños.
- Accesibilidad AA: contraste, foco visible, botones de 44 px y "Saltar al contenido".

## Publicar (primera vez, ≈30 min)
1. **GitHub**: New repository → nombre del cliente (sin espacios) → **Private** → Create.
2. "uploading an existing file" → arrastra el **contenido** de la carpeta descomprimida (no la carpeta) → Commit.
   En Mac, los archivos que empiezan por punto quedan ocultos. Revisa en GitHub que existan `.pages.yml`, `.node-version` y `.gitignore`. Si falta alguno: Add file → Create new file → mismo nombre → pega el contenido.
3. Edita `wrangler.jsonc` en GitHub (lápiz): cambia `"web-cliente"` por el nombre del proyecto → Commit.
4. **Cloudflare** → Compute → Workers & Pages → Create → Import a repository → elige el repo.
   - Build command: `npx astro build`
   - Deploy command: `npx wrangler deploy`
   → Save and Deploy. En 1–3 min queda en `nombre.tu-usuario.workers.dev`.
5. **Pages CMS** (app.pagescms.org) → entra con GitHub → elige el repo → edita "Datos del sitio": nombre, descripción, **url**, WhatsApp… → Save. El sitio se actualiza en 1–2 min.
6. **Dominio**: cómpralo (Cloudflare, Porkbun o Namecheap) → en el Worker: Settings → Domains & Routes → Add → Custom domain. Pon la misma dirección en "Datos del sitio → url".
7. **Google**: Search Console → propiedad de tipo Dominio → envía `/sitemap-index.xml` → "Solicitar indexación" del inicio y de 3–5 proyectos. Luego importa todo en Bing Webmaster Tools.
8. Cloudflare del dominio → Rules → Redirect Rules → plantilla "Redirect from WWW to root".

## Editar contenido
Pages CMS → sección → Save. Un proyecto nuevo se crea con **Publicar apagado**: revísalo y luego actívalo.
- **Fotos**: horizontales, 2400 px de ancho, JPG calidad ~80, menos de 1 MB, nombre sin espacios ni tildes. Siempre con descripción.
- **Imagen para compartir**: 1200×630.
- **Videos**: súbelos a YouTube o Vimeo, no al sitio.

## Cambiar la identidad visual
Todo vive en las primeras líneas de `src/styles/global.css` (bloque `:root`): colores, tipografías y medidas.
Si cambias un color, verifica el contraste en webaim.org/resources/contrastchecker (texto ≥ 4,5:1).

### Tipografías propias
Por defecto usa las del sistema: pesan 0 KB. Para una fuente libre (OFL) autoalojada, pídele a Claude: *"agrega la fuente X con Fontsource"*. Él agrega el paquete y ajusta `--f-titulo` / `--f-texto`.

## Si algo falla
GitHub → pestaña del repo → ✗ rojo → Details → captura a Claude. Lo más común es un campo obligatorio vacío o una descripción de más de 160 caracteres: el mensaje dice cuál.

## Para Claude
Ver `CLAUDE.md`.
