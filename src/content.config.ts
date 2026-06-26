import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('AstroDeck Team'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const offerings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/offerings' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['class', 'workshop', 'series']),
    teacher: z.string(),
    cost: z.number(),
    duration: z.string(),
    schedule: z.string(),
    calcom_event_slug: z.string(),
    description: z.string(),
    featured: z.boolean().default(false),
    active: z.boolean().default(true),
  }),
});

const packages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/packages' }),
  schema: z.object({
    title: z.string(),
    class_count: z.number(),
    cost: z.number(),
    per_class_cost: z.number(),
    validity_days: z.number().optional(),
    description: z.string(),
    highlight: z.boolean().default(false),
  }),
});

export const collections = { blog, offerings, packages };
