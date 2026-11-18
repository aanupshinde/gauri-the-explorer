// Gallery = Gauri's own camera photos only (list lives in gallery.json — add/remove entries there).
import type { ImageMetadata } from 'astro';
import list from './gallery.json';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/wp/*.{jpg,jpeg,png,webp,avif}', { eager: true });
const byName = Object.fromEntries(Object.entries(files).map(([p, m]) => [p.split('/').pop()!, m.default]));

export const galleryPhotos = (list as { file: string; place: string; alt: string; caption?: string }[])
  .filter((p) => byName[p.file])
  .map((p) => ({ name: p.file, src: byName[p.file], alt: p.alt, place: p.place, caption: p.caption }));

export const galleryPlaces = [...new Set(galleryPhotos.map((p) => p.place))];
