// One place to edit site-wide details.
export const site = {
  name: 'Gauri The Explorer',
  domain: 'gauritheexplorer.com',
  tagline: 'Travel stories from Incredible Bharat.',
  description:
    "Travel stories, itineraries and photography by Gauri — temples, holy cities, wildlife sanctuaries and heritage across India and Asia.",
  bio: "Hi, I'm Gauri, an MBA student of Travel and Tourism with a love for photography and exploring Asia's spiritual and natural wonders. On this blog, I share my journeys through Indian and Asian temples, holy sites, animal sanctuaries, and unique places, capturing their beauty and stories through words and images.",
  showSampleBanner: false,
  // Copied from the old WordPress site so analytics and verification keep working.
  analytics: { ga4: 'G-D3PWNVXWT9', googleTag: 'GT-WB2RMS5', googleAds: 'AW-608758891' },
  pinterestVerify: 'e196ef314a721973022595936170ff4b',
  social: {
    instagram: '', // confirm with owner: posts link to instagram.com/mi.tourist
    youtube: '',
    facebook: '',
  },
  email: '',
  nav: [
    { label: 'Stories', href: '/blog/' },
    { label: 'Destinations', href: '/destinations/' },
    { label: 'Gallery', href: '/gallery/' },
    { label: 'About', href: '/about-us/' },
    { label: 'Contact', href: '/contact/' },
  ],
  categories: [
    { name: 'Explore India', slug: 'explore-india' },
    { name: 'Heritage', slug: 'heritage' },
    { name: 'Spiritual Journeys', slug: 'spiritual-journeys' },
    { name: 'Wildlife', slug: 'wildlife' },
    { name: 'Explore Asia', slug: 'explore-asia' },
    { name: 'Uncategorised', slug: 'uncategorised' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms and Conditions', href: '/terms-and-conditions/' },
    { label: 'Disclaimer', href: '/disclaimer/' },
    { label: 'Affiliate Disclosure', href: '/affiliate-discloser-disclaimer/' },
  ],
};
export const categorySlug = (name: string) => site.categories.find((c) => c.name === name)?.slug ?? name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
