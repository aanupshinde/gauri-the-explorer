import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export type Pin = { lat: number; lng: number; name: string; href?: string; tagline?: string };

const icon = L.divIcon({
  className: 'gx-pin',
  html: '<span></span>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -26],
});

export function mountMap(el: HTMLElement, pins: Pin[], zoom?: number) {
  const map = L.map(el, { scrollWheelZoom: false, attributionControl: true });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 18,
  }).addTo(map);
  const markers = pins.map((p) => {
    const m = L.marker([p.lat, p.lng], { icon, title: p.name }).addTo(map);
    const body = `<strong>${p.name}</strong>${p.tagline ? `<br>${p.tagline}` : ''}${p.href ? `<br><a href="${p.href}">Explore →</a>` : ''}`;
    m.bindPopup(body);
    return m;
  });
  if (pins.length === 1) map.setView([pins[0].lat, pins[0].lng], zoom ?? 7);
  else map.fitBounds(L.featureGroup(markers).getBounds().pad(0.2));
  el.addEventListener('click', () => map.scrollWheelZoom.enable(), { once: true });
  return map;
}
