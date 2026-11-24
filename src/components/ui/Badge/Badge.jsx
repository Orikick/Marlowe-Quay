import { cx } from '../../../utils/cx.js';
import styles from './Badge.module.scss';

// Short label, for example the property type on a photo.
export default function Badge({ className, children }) {
  return <span className={cx(styles.badge, className)}>{children}</span>;
}
