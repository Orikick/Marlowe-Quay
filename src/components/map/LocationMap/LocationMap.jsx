import 'leaflet/dist/leaflet.css';
import '../../../styles/leaflet-theme.scss';

import L from 'leaflet';
import { useMemo } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { TILE_ATTRIBUTION, TILE_URL, escapeHtml, toLatLng } from '../mapConfig.js';
import styles from './LocationMap.module.scss';

// Small map with one pin, for the details page. Scroll-wheel zoom is off so the page
// scrolls normally over it; the zoom buttons still work.
export default function LocationMap({ coordinates, label }) {
  const position = toLatLng(coordinates);

  const icon = useMemo(
    () =>
      L.divIcon({
        className: 'mq-pin',
        iconSize: [0, 0],
        html: `<span class="mq-pin__dot"></span><span class="visually-hidden">${escapeHtml(label)}</span>`,
      }),
    [label],
  );

  return (
    <MapContainer
      className={styles.map}
      center={position}
      zoom={15}
      minZoom={11}
      maxZoom={18}
      scrollWheelZoom={false}
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
      <Marker position={position} icon={icon} keyboard={false} interactive={false} />
    </MapContainer>
  );
}
