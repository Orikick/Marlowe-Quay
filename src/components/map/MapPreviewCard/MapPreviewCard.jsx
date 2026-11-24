import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { formatArea, formatPrice, formatRooms } from '../../../utils/format.js';
import Icon from '../../ui/Icon/Icon.jsx';
import ResponsiveImage from '../../ui/ResponsiveImage/ResponsiveImage.jsx';
import styles from './MapPreviewCard.module.scss';

// Compact card that floats over the map in mobile map view, after a marker is chosen.
// focusOnOpen: move focus to the link (when the marker was chosen with the keyboard).
export default function MapPreviewCard({ property, onClose, focusOnOpen = false }) {
  const location = useLocation();
  const linkRef = useRef(null);
  const { id, title, price, rooms, area, address, photos } = property;

  useEffect(() => {
    if (focusOnOpen) linkRef.current?.focus();
  }, [id, focusOnOpen]);

  return (
    <aside className={styles.preview} aria-label="Selected home">
      <ResponsiveImage
        className={styles.photo}
        src={photos[0]?.src}
        alt=""
        widths={[200, 300]}
        sizes="120px"
        ratio={null}
      />
      <div className={styles.body}>
        <p className={styles.price}>{formatPrice(price)}</p>
        <h2 className={styles.title}>
          <Link
            ref={linkRef}
            to={`/property/${id}`}
            state={{ from: `${location.pathname}${location.search}` }}
            className={styles.link}
          >
            {title}
          </Link>
        </h2>
        <p className={styles.meta}>
          {address.neighbourhood}, {formatRooms(rooms)}, {formatArea(area)}
        </p>
      </div>
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close preview">
        <Icon name="close" size={20} />
      </button>
    </aside>
  );
}
