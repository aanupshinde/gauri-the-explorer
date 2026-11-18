import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Hostinger serves static files from public_html. trailingSlash "always" + directory format
// gives URLs like /stories/my-trip/ — matching WordPress-style permalinks. If the OLD site used
// .html files, change build.format to 'file' (see MIGRATION.md).
export default defineConfig({
  site: 'https://gauritheexplorer.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [mdx(), sitemap()],
  image: { responsiveStyles: true },
});
