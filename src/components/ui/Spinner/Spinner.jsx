import { cx } from '../../../utils/cx.js';
import styles from './Spinner.module.scss';

// Loading indicator. With a `label` it is announced to screen readers;
// without one it is decorative (for example inside a button that has its own text).
export default function Spinner({ label, size = 20, className }) {
  return (
    <span
      className={cx(styles.wrapper, className)}
      role={label ? 'status' : undefined}
      aria-hidden={label ? undefined : 'true'}
    >
      <span className={styles.spinner} style={{ width: size, height: size }} />
      {label && <span className={styles.label}>{label}</span>}
    </span>
  );
}
