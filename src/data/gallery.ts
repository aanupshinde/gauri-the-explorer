// The gallery shows every photo in src/assets/photos/ automatically.
// To add a caption and place for a photo, add a line to `details` below using its file name.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,jpeg,png,webp,avif}', { eager: true });

const details: Record<string, { alt: string; place: string; caption?: string }> = {
  'hero-mountains': { alt: 'Mountains glowing at sunset', place: 'Ladakh' },
  'lake-dawn': { alt: 'A still mountain lake at dawn', place: 'Ladakh', caption: 'Sample caption: 5 a.m., three jackets, worth it.' },
  'snow-peaks': { alt: 'Snow-capped peaks', place: 'Ladakh' },
  'night-sky': { alt: 'Stars above the mountains', place: 'Ladakh' },
  'valley-flowers': { alt: 'Wildflowers in a valley', place: 'Ladakh' },
  'desert-dunes': { alt: 'Golden dunes at sunset', place: 'Jaisalmer' },
  'fort-walls': { alt: 'Honey-coloured fort walls', place: 'Jaisalmer' },
  'old-city': { alt: 'Narrow lanes of an old city', place: 'Jaisalmer' },
  'market-colours': { alt: 'A colourful market', place: 'Jaisalmer' },
  'backwaters': { alt: 'Palm-lined backwaters', place: 'Kerala' },
  'tea-hills': { alt: 'Tea gardens on misty hills', place: 'Munnar' },
  'monsoon-falls': { alt: 'A misty waterfall', place: 'Meghalaya' },
  'forest-trail': { alt: 'A green forest trail', place: 'Meghalaya' },
  'island-blue': { alt: 'Turquoise sea', place: 'Andaman' },
  'coast-sunset': { alt: 'Sunset over the coast', place: 'Andaman' },
};

const HIDDEN = new Set(['gauri-portrait']); // photos that shouldn't appear in the gallery

export const galleryPhotos = Object.entries(files)
  .map(([path, mod]) => {
    const name = path.split('/').pop()!.replace(/\.[^.]+$/, '');
    const d = details[name];
    return { name, src: mod.default, alt: d?.alt ?? name.replace(/-/g, ' '), place: d?.place ?? 'More', caption: d?.caption };
  })
  .filter((p) => !HIDDEN.has(p.name));

export const galleryPlaces = [...new Set(galleryPhotos.map((p) => p.place))];
