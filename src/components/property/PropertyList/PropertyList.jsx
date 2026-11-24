import { cx } from '../../../utils/cx.js';
import PropertyCard from '../PropertyCard/PropertyCard.jsx';
import PropertyCardSkeleton from '../PropertyCardSkeleton/PropertyCardSkeleton.jsx';
import styles from './PropertyList.module.scss';

// Grid of property cards.
//   layout="split": one column, two from 1280px (used beside the map)
//   layout="wide":  up to three columns (full-width pages)
export default function PropertyList({
  properties,
  highlightedId,
  selectedId,
  onHoverChange,
  layout = 'split',
  label,
  className,
}) {
  return (
    <ul className={cx(styles.list, styles[layout], className)} aria-label={label}>
      {properties.map((property, index) => (
        <li key={property.id}>
          <PropertyCard
            property={property}
            highlighted={property.id === highlightedId}
            selected={property.id === selectedId}
            onHoverChange={onHoverChange}
            priority={index < 2}
          />
        </li>
      ))}
    </ul>
  );
}

// Placeholder grid shown while the listings load.
export function PropertyListSkeleton({ count = 6, layout = 'split', className }) {
  return (
    <ul className={cx(styles.list, styles[layout], className)} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <li key={index}>
          <PropertyCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
