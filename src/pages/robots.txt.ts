// robots.txt: buscadores y asistentes que citan fuentes, sí; entrenamiento de IA, no.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const mapa = new URL('sitemap-index.xml', site).href;
  const texto = [
    'User-agent: *',
    'Content-Signal: search=yes, ai-input=yes, ai-train=no',
    'Allow: /',
    'Disallow: /404/',
    '',
    '# Entrenamiento de modelos de IA: no',
    'User-agent: GPTBot',
    'User-agent: ClaudeBot',
    'User-agent: Google-Extended',
    'User-agent: CCBot',
    'User-agent: Applebot-Extended',
    'User-agent: Meta-ExternalAgent',
    'User-agent: Bytespider',
    'Disallow: /',
    '',
    `Sitemap: ${mapa}`,
    '',
  ].join('\n');
  return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
