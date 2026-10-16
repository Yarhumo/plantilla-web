// Esquema del contenido: qué campos tiene cada parte del sitio.
// Si un campo obligatorio falta, la publicación se detiene y avisa (mejor que publicar algo roto).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Pages CMS guarda "" cuando se borra una imagen: lo tratamos como "sin imagen".
const vacioANulo = (v: unknown) => (v === '' || v === null ? undefined : v);

const sitio = defineCollection({
  loader: glob({ pattern: 'sitio.json', base: './src/content/sitio' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      eslogan: z.string().optional(),
      descripcion: z.string().max(170, 'La descripción para Google debe tener máximo ~160 caracteres'),
      url: z.string().url(),
      idioma: z.string().default('es-CO'),
      tipo_negocio: z.string().default('LocalBusiness'),
      ciudad: z.string().optional(),
      region: z.string().optional(),
      pais: z.string().default('CO'),
      direccion: z.string().optional(),
      area_servicio: z.array(z.string()).default([]),
      telefono: z.string().optional(),
      whatsapp: z.string().optional(),
      whatsapp_mensaje: z.string().optional(),
      correo: z.string().optional(),
      horario: z.string().optional(),
      formulario_url: z.string().optional(),
      redes: z.array(z.object({ nombre: z.string(), url: z.string().url() })).default([]),
      logo: z.preprocess(vacioANulo, image().optional()),
      imagen_compartir: z.preprocess(vacioANulo, image().optional()),
      color_tema: z.string().default('#141312'),
      verificacion_google: z.string().optional(),
      analitica_token: z.string().optional(),
    }),
});

const inicio = defineCollection({
  loader: glob({ pattern: 'inicio.json', base: './src/content/inicio' }),
  schema: ({ image }) =>
    z.object({
      titular: z.string(),
      bajada: z.string().optional(),
      portada: z.preprocess(vacioANulo, image().optional()),
      portada_alt: z.string().default(''),
      boton_texto: z.string().default('Conversemos'),
      intro_titulo: z.string().optional(),
      intro: z.string().optional(),
      servicios_titulo: z.string().default('Qué hacemos'),
      servicios: z.array(z.object({ titulo: z.string(), texto: z.string() })).default([]),
      proyectos_titulo: z.string().default('Proyectos'),
      proceso_titulo: z.string().default('Cómo trabajamos'),
      proceso: z.array(z.object({ titulo: z.string(), texto: z.string() })).default([]),
      testimonios: z
        .array(z.object({ texto: z.string(), autor: z.string(), contexto: z.string().optional() }))
        .default([]),
      preguntas: z.array(z.object({ pregunta: z.string(), respuesta: z.string() })).default([]),
      contacto_titulo: z.string().default('Contacto'),
      contacto_texto: z.string().optional(),
    }),
});

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      resumen: z.string().max(170, 'El resumen debe tener máximo ~160 caracteres'),
      publicar: z.boolean().default(false),
      destacado: z.boolean().default(false),
      orden: z.number().default(99),
      fecha: z.preprocess(vacioANulo, z.coerce.date().optional()),
      categoria: z.string().optional(),
      ubicacion: z.string().optional(),
      cliente: z.string().optional(),
      area: z.string().optional(),
      estado: z.string().optional(),
      portada: image(),
      portada_alt: z.string(),
      galeria: z
        .array(
          z.object({
            imagen: image(),
            alt: z.string(),
            pie: z.string().optional(),
          }),
        )
        .default([]),
      creditos: z.array(z.object({ rol: z.string(), nombre: z.string() })).default([]),
      foto_credito: z.string().optional(),
    }),
});

const paginas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/paginas' }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string().max(170),
    publicar: z.boolean().default(true),
  }),
});

export const collections = { sitio, inicio, proyectos, paginas };
