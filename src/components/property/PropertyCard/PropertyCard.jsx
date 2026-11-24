import { Link, useLocation } from 'react-router-dom';
import { TYPE_LABELS } from '../../../data/filterOptions.js';
import { cx } from '../../../utils/cx.js';
import { formatArea, formatBathrooms, formatRooms } from '../../../utils/format.js';
import Badge from '../../ui/Badge/Badge.jsx';
import Icon from '../../ui/Icon/Icon.jsx';
import ResponsiveImage from '../../ui/ResponsiveImage/ResponsiveImage.jsx';
import FavoriteButton from '../FavoriteButton/FavoriteButton.jsx';
import PriceTag from '../PriceTag/PriceTag.jsx';
import styles from './PropertyCard.module.scss';

const IMAGE_SIZES = '(min-width: 1280px) 330px, (min-width: 768px) 45vw, 100vw';

// One home in a list. The whole card is clickable through the title link;
// the save button sits above that link so it stays separately clickable.
//   highlighted: the matching map marker is hovered    selected: its marker was clicked
//   onHoverChange(id | null): fires on mouse enter/leave and focus in/out
export default function PropertyCard({
  property,
  highlighted = false,
  selected = false,
  onHoverChange,
  headingLevel: Heading = 'h3',
  priority = false,
}) {
  const location = useLocation();
  const { id, title, type, price, rooms, bathrooms, area, address, photos } = property;
  const cover = photos[0];

  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) onHoverChange?.(null);
  }

  return (
    <article
      id={`property-${id}`}
      className={cx(styles.card, highlighted && styles.highlighted, selected && styles.selected)}
      onMouseEnter={() => onHoverChange?.(id)}
      onMouseLeave={() => onHoverChange?.(null)}
      onFocus={() => onHoverChange?.(id)}
      onBlur={handleBlur}
    >
      <div className={styles.body}>
        <Heading className={styles.title}>
          <Link
            to={`/property/${id}`}
            state={{ from: `${location.pathname}${location.search}` }}
            className={styles.link}
          >
            {title}
          </Link>
        </Heading>
        <PriceTag price={price} className={styles.price} />
        <p className={styles.address}>
          <Icon name="pin" size={16} />
          <span>
            {address.neighbourhood}, {address.street}
          </span>
        </p>
        <ul className={styles.facts} aria-label="Key facts">
          <li>
            <Icon name="rooms" size={18} />
            {formatRooms(rooms)}
          </li>
          <li>
            <Icon name="bath" size={18} />
            {formatBathrooms(bathrooms)}
          </li>
          <li>
            <Icon name="area" size={18} />
            {formatArea(area)}
          </li>
        </ul>
      </div>

      <div className={styles.media}>
        <ResponsiveImage
          src={cover?.src}
          alt={cover?.alt ?? ''}
          widths={[360, 540, 720]}
          sizes={IMAGE_SIZES}
          ratio="3 / 2"
          priority={priority}
        />
        <Badge className={styles.type}>{TYPE_LABELS[type] ?? type}</Badge>
        <FavoriteButton propertyId={id} title={title} className={styles.favorite} />
      </div>
    </article>
  );
}
