import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { storyUrl } from '../lib/urls';
export async function GET(context) {
  const stories = (await getCollection('stories')).sort((a, b) => +b.data.date - +a.data.date);
  return rss({
    title: 'Gauri the Explorer',
    description: 'Travel stories and photography by Gauri.',
    site: context.site,
    items: stories.map((s) => ({ title: s.data.title, description: s.data.excerpt, pubDate: s.data.date, link: storyUrl(s) })),
  });
}
