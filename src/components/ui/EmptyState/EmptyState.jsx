import { cx } from '../../../utils/cx.js';
import Icon from '../Icon/Icon.jsx';
import styles from './EmptyState.module.scss';

// Shown when a list has nothing in it. `children` holds the next action (a button or link).
export default function EmptyState({
  icon = 'home',
  title,
  headingLevel: Heading = 'h2',
  className,
  message,
  children,
}) {
  return (
    <div className={cx(styles.empty, className)}>
      <span className={styles.icon}>
        <Icon name={icon} size={28} />
      </span>
      <Heading className={styles.title}>{title}</Heading>
      {message && <p className={styles.message}>{message}</p>}
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  );
}
