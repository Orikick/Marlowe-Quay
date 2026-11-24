import { TYPE_LABELS } from '../../../data/filterOptions.js';
import { formatArea, formatDate, formatPrice } from '../../../utils/format.js';
import styles from './PropertySpecs.module.scss';

// Key facts as a description list, followed by the feature list.
export default function PropertySpecs({ property }) {
  const specs = [
    ['Type', TYPE_LABELS[property.type] ?? property.type],
    ['Rooms', property.rooms],
    ['Bedrooms', property.bedrooms === 0 ? 'Open plan' : property.bedrooms],
    ['Bathrooms', property.bathrooms],
    ['Living area', formatArea(property.area)],
    ['Price per m²', formatPrice(Math.round(property.price / property.area))],
    ['Floor', property.floor ?? 'Whole house'],
    ['Year built', property.yearBuilt],
    ['Energy rating', property.energyRating],
    ['Listed on', formatDate(property.listedAt)],
  ];

  return (
    <div className={styles.specs}>
      <dl className={styles.grid}>
        {specs.map(([label, value]) => (
          <div key={label} className={styles.item}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      {property.features.length > 0 && (
        <>
          <h3 className={styles.subheading}>Features</h3>
          <ul className={styles.features}>
            {property.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
