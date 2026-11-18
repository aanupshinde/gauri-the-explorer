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
      destination: reference('destinations'),
      tags: z.array(z.string()).default([]),
      // Exact path of this article on the OLD site, e.g. "/2021/05/my-ladakh-trip/".
      // Keeps every old link alive so Google ranking is not lost.
      permalink: z.string().optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      featured: z.boolean().default(false),
      sample: z.boolean().default(false),
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
      visited: z.string().optional(),
      permalink: z.string().optional(),
      sample: z.boolean().default(false),
    }),
});

export const collections = { stories, destinations };
