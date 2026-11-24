import { cx } from '../../../utils/cx.js';
import styles from './Skeleton.module.scss';

// Grey placeholder block shown while content loads. Purely visual: the parent
// announces the loading state to screen readers.
export default function Skeleton({ width, height, ratio, radius, className }) {
  return (
    <span
      className={cx(styles.skeleton, className)}
      style={{ width, height, aspectRatio: ratio, borderRadius: radius }}
      aria-hidden="true"
    />
  );
}
