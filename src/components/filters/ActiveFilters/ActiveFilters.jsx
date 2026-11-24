import { TYPE_LABELS } from '../../../data/filterOptions.js';
import { formatArea, formatPrice } from '../../../utils/format.js';
import Icon from '../../ui/Icon/Icon.jsx';
import styles from './ActiveFilters.module.scss';

function rangeLabel(min, max, format) {
  if (min && max) return `${format(min)} to ${format(max)}`;
  if (min) return `From ${format(min)}`;
  return `Up to ${format(max)}`;
}

// Builds one removable chip per active filter.
function buildChips(filters) {
  const chips = filters.types.map((type) => ({
    key: `type-${type}`,
    label: TYPE_LABELS[type] ?? type,
    remove: { types: filters.types.filter((item) => item !== type) },
  }));

  if (filters.minPrice || filters.maxPrice) {
    chips.push({
      key: 'price',
      label: rangeLabel(filters.minPrice, filters.maxPrice, formatPrice),
      remove: { minPrice: null, maxPrice: null },
    });
  }
  if (filters.rooms) {
    chips.push({ key: 'rooms', label: `${filters.rooms}+ rooms`, remove: { rooms: null } });
  }
  if (filters.minArea || filters.maxArea) {
    chips.push({
      key: 'area',
      label: rangeLabel(filters.minArea, filters.maxArea, formatArea),
      remove: { minArea: null, maxArea: null },
    });
  }
  return chips;
}

// Shows the filters in use as chips, each with its own remove button.
export default function ActiveFilters({ filters, onChange, onClear }) {
  const chips = buildChips(filters);
  if (chips.length === 0) return null;

  return (
    <div className={styles.active}>
      <h2 className="visually-hidden">Filters in use</h2>
      <ul className={styles.chips}>
        {chips.map((chip) => (
          <li key={chip.key}>
            <button
              type="button"
              className={styles.chip}
              onClick={() => onChange(chip.remove)}
              aria-label={`Remove filter: ${chip.label}`}
            >
              <span>{chip.label}</span>
              <Icon name="close" size={16} />
            </button>
          </li>
        ))}
        {chips.length > 1 && (
          <li>
            <button type="button" className={styles.clear} onClick={onClear}>
              Clear all
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
