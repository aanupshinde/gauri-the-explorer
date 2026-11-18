import type { CollectionEntry } from 'astro:content';

// If an entry has `permalink` (its address on the OLD site), use it exactly — that keeps
// years of Google ranking. Otherwise use the new clean address.
const norm = (p: string) => '/' + p.replace(/^\/+|\/+$/g, '') + '/';

export const storyUrl = (s: CollectionEntry<'stories'>) => (s.data.permalink ? norm(s.data.permalink) : `/stories/${s.id}/`);
export const destinationUrl = (d: CollectionEntry<'destinations'>) =>
  d.data.permalink ? norm(d.data.permalink) : `/destinations/${d.id}/`;

export const formatDate = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export const readingTime = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 200));
