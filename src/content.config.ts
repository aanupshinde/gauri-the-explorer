import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const stories = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/stories' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      cover: image(),
      coverAlt: z.string(),
      categories: z.array(z.string()).default([]),
      destination: reference('destinations').optional(),
      // The article's exact address on the OLD WordPress site — keeps Google ranking.
      permalink: z.string().optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      featured: z.boolean().default(false),
    }),
});

const destinations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/destinations' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      region: z.string(),
      country: z.string().default('India'),
      lat: z.number(),
      lng: z.number(),
      cover: image(),
      coverAlt: z.string(),
      tagline: z.string(),
      galleryPlace: z.string().optional(), // matches "place" in src/data/gallery.json
      permalink: z.string().optional(),
    }),
});

// Simple text pages that keep their old URL (privacy policy, disclaimer…)
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({ title: z.string(), permalink: z.string(), updated: z.coerce.date().optional() }),
});

export const collections = { stories, destinations, pages };
