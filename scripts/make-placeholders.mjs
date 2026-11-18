// Generates soft illustrated landscape placeholders (JPG) until Gauri's real photos are added.
// Replace any file in src/assets/photos/ with a real photo of the same name — nothing else changes.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const out = new URL('../src/assets/photos/', import.meta.url);
mkdirSync(out, { recursive: true });

const scenes = [
  ['hero-mountains', 2400, 1500, ['#F6C79B', '#E98A63', '#3B4A6B', '#22304A', '#141E33']],
  ['lake-dawn', 2400, 1600, ['#FDE3C0', '#F4A88A', '#5B7FA3', '#38597A', '#1E3550']],
  ['desert-dunes', 2400, 1600, ['#FFE2A8', '#F6B45E', '#D9813B', '#B65E2A', '#7E3D1E']],
  ['backwaters', 2400, 1600, ['#D8EFD9', '#9BCFA8', '#3F8F75', '#2A6B5A', '#16443B']],
  ['old-city', 1600, 2000, ['#FBE0C8', '#F0A07A', '#C8644A', '#8E3F35', '#4E2328']],
  ['forest-trail', 1600, 2000, ['#E3F0D2', '#A9CB8B', '#5E9460', '#356B45', '#1A3D2B']],
  ['coast-sunset', 2400, 1600, ['#FFD6A0', '#FF9E7A', '#C8607A', '#5E4A7E', '#2C2A52']],
  ['snow-peaks', 2400, 1600, ['#EAF2FA', '#BBD3EA', '#7EA1C8', '#4C6E9A', '#23395E']],
  ['tea-hills', 1600, 2000, ['#EFF6D8', '#C3DD8E', '#7FB25B', '#4E8A45', '#24532F']],
  ['monsoon-falls', 1600, 2000, ['#DDE9EE', '#A6C3CF', '#6A93A3', '#3F6877', '#1F3D49']],
  ['night-sky', 2400, 1600, ['#3A3F7A', '#2A2E63', '#1D2150', '#14173D', '#0B0D27']],
  ['market-colours', 2400, 1600, ['#FFE7B0', '#FFB35C', '#F06A4A', '#B83C5C', '#5C2A57']],
  ['gauri-portrait', 1600, 2000, ['#FDE8D3', '#F7C3A0', '#E8956E', '#B86A52', '#6E3E35']],
  ['island-blue', 2400, 1600, ['#E3F6F8', '#A8E0E6', '#4FB3C2', '#2B7F97', '#174A66']],
  ['valley-flowers', 2400, 1600, ['#FCE6EE', '#F5B5C8', '#C487B5', '#6E8F6A', '#2E5640']],
  ['fort-walls', 1600, 2000, ['#FFF0D6', '#F5CD8F', '#D9A05B', '#A86E3A', '#5E3B22']],
];

function ridge(w, h, base, amp, seed, freq) {
  let d = `M0 ${h}`;
  for (let x = 0; x <= w; x += w / 60) {
    const y = base + Math.sin(x / (w / freq) + seed) * amp + Math.sin(x / (w / (freq * 2.7)) + seed * 2) * amp * 0.45;
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d + ` L${w} ${h} Z`;
}

for (const [name, w, h, c] of scenes) {
  const seed = name.length;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/>
    </linearGradient>
    <radialGradient id="sun" cx="0.68" cy="0.36" r="0.35">
      <stop offset="0" stop-color="#fff" stop-opacity="0.85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sky)"/>
  <rect width="${w}" height="${h}" fill="url(#sun)"/>
  <circle cx="${w * 0.68}" cy="${h * 0.36}" r="${Math.min(w, h) * 0.06}" fill="#fff" opacity="0.75"/>
  <path d="${ridge(w, h, h * 0.55, h * 0.07, seed, 3)}" fill="${c[2]}" opacity="0.85"/>
  <path d="${ridge(w, h, h * 0.68, h * 0.06, seed + 1.7, 4)}" fill="${c[3]}" opacity="0.92"/>
  <path d="${ridge(w, h, h * 0.82, h * 0.045, seed + 3.1, 5)}" fill="${c[4]}"/>
  <text x="${w / 2}" y="${h - h * 0.05}" text-anchor="middle" font-family="sans-serif" font-size="${Math.round(w / 60)}"
    fill="#fff" opacity="0.55" letter-spacing="4">PLACEHOLDER · GAURI'S PHOTO GOES HERE · ${name}.jpg</text>
</svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(new URL(`${name}.jpg`, out).pathname);
  console.log('made', name);
}
