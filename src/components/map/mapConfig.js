// Shared Leaflet settings. OpenStreetMap tiles are free for light use with attribution:
// https://operations.osmfoundation.org/policies/tiles/

export const LISBON_CENTER = [38.7223, -9.1393];

export const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

export const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export const toLatLng = ({ lat, lng }) => [lat, lng];

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

// Marker HTML is built as a string, so text from the data is escaped first.
export const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
