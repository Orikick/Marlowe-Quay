import { formatPrice, formatPricePerSquareMetre } from '../../../utils/format.js';
import { cx } from '../../../utils/cx.js';
import styles from './PriceTag.module.scss';

// Asking price, optionally with the price per square metre underneath.
// size: 'medium' (cards) | 'large' (details page)
export default function PriceTag({ price, area, size = 'medium', className }) {
  return (
    <p className={cx(styles.price, styles[size], className)}>
      <span className={styles.amount}>{formatPrice(price)}</span>
      {area && <span className={styles.perArea}>{formatPricePerSquareMetre(price, area)}</span>}
    </p>
  );
}
