import { useFavorites } from '../../../hooks/useFavorites.js';
import { cx } from '../../../utils/cx.js';
import Icon from '../../ui/Icon/Icon.jsx';
import styles from './FavoriteButton.module.scss';

// Saves or removes a home from the saved list (kept in localStorage).
//   variant="icon": round heart button for photos; a toggle button with a fixed label
//   variant="full": heart with visible text that names the action
export default function FavoriteButton({ propertyId, title, variant = 'icon', className }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(propertyId);

  if (variant === 'full') {
    return (
      <button
        type="button"
        className={cx(styles.full, saved && styles.saved, className)}
        onClick={() => toggleFavorite(propertyId)}
      >
        <Icon name="heart" size={20} filled={saved} />
        <span>{saved ? 'Remove from saved' : 'Save this home'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cx(styles.icon, saved && styles.saved, className)}
      aria-pressed={saved}
      aria-label={`Save ${title}`}
      onClick={() => toggleFavorite(propertyId)}
    >
      <Icon name="heart" size={22} filled={saved} />
    </button>
  );
}
