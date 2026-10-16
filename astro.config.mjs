// Configuración del sitio. La dirección (url) se edita en Pages CMS → "Datos del sitio".
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

const sitio = JSON.parse(readFileSync('./src/content/sitio/sitio.json', 'utf8'));

export default defineConfig({
  site: sitio.url,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
