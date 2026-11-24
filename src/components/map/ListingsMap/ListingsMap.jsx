import 'leaflet/dist/leaflet.css';
import '../../../styles/leaflet-theme.scss';

import L from 'leaflet';
import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { LISBON_CENTER, TILE_ATTRIBUTION, TILE_URL, toLatLng } from '../mapConfig.js';
import PriceMarker from '../PriceMarker/PriceMarker.jsx';
import styles from './ListingsMap.module.scss';

// Zooms the map to fit the homes currently shown. Runs only when the set of homes
// changes, not when a card is hovered.
function FitToProperties({ properties }) {
  const map = useMap();
  const key = properties.map((property) => property.id).join('|');

  useEffect(() => {
    if (properties.length === 0) return;
    const bounds = L.latLngBounds(properties.map((property) => toLatLng(property.coordinates)));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 15, animate: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, map]);

  return null;
}

// The map container is sized by CSS; tell Leaflet when that size changes.
function KeepSizeInSync() {
  const map = useMap();

  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);

  return null;
}

function BackgroundClick({ onClick }) {
  useMapEvents({ click: () => onClick?.() });
  return null;
}

// Map of all listed homes with a price marker for each.
//   activeId: marker to highlight      onSelect(id, { viaKeyboard }): a marker was chosen
//   onBackgroundClick: the map itself was clicked (used to close the mobile preview)
export default function ListingsMap({ properties, activeId, onSelect, onBackgroundClick }) {
  return (
    <MapContainer
      className={styles.map}
      center={LISBON_CENTER}
      zoom={12}
      minZoom={11}
      maxZoom={18}
      scrollWheelZoom
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
      <FitToProperties properties={properties} />
      <KeepSizeInSync />
      <BackgroundClick onClick={onBackgroundClick} />
      {properties.map((property) => (
        <PriceMarker
          key={property.id}
          property={property}
          active={property.id === activeId}
          onSelect={onSelect}
        />
      ))}
    </MapContainer>
  );
}
