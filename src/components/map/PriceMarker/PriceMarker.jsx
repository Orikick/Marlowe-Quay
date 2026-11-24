import L from 'leaflet';
import { useEffect, useMemo, useRef } from 'react';
import { Marker } from 'react-leaflet';
import { formatPrice, formatPriceShort } from '../../../utils/format.js';
import { escapeHtml, toLatLng } from '../mapConfig.js';

// A price pill on the map. Leaflet makes it focusable with role="button" and turns
// Enter into a click; Space is added here so it behaves like any other button.
//   active: highlighted because its card is hovered or it was selected
//   onSelect(id, { viaKeyboard }): fires on click, Enter or Space
export default function PriceMarker({ property, active, onSelect }) {
  const markerRef = useRef(null);
  const { id, title, price, coordinates } = property;

  // Built once per property. The active state is toggled on the existing element
  // instead of swapping the icon, so keyboard focus is never lost.
  const icon = useMemo(
    () =>
      L.divIcon({
        className: 'mq-marker',
        iconSize: [0, 0],
        html:
          `<span class="mq-marker__pill" aria-hidden="true">${formatPriceShort(price)}</span>` +
          `<span class="visually-hidden">${escapeHtml(title)}, ${formatPrice(price)}</span>`,
      }),
    [title, price],
  );

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;
    marker.getElement()?.classList.toggle('mq-marker--active', active);
    marker.setZIndexOffset(active ? 1000 : 0);
  }, [active, icon]);

  useEffect(() => {
    const element = markerRef.current?.getElement();
    if (!element) return undefined;

    function handleKeyDown(event) {
      if (event.key === ' ') {
        event.preventDefault();
        onSelect(id, { viaKeyboard: true });
      }
    }
    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [id, onSelect, icon]);

  const eventHandlers = useMemo(
    () => ({
      click: (event) => {
        // Leaflet reports Enter on a focused marker as a click from a "keypress" event.
        const viaKeyboard = event.originalEvent?.type === 'keypress';
        onSelect(id, { viaKeyboard });
      },
    }),
    [id, onSelect],
  );

  return (
    <Marker
      ref={markerRef}
      position={toLatLng(coordinates)}
      icon={icon}
      keyboard
      riseOnHover
      eventHandlers={eventHandlers}
    />
  );
}
