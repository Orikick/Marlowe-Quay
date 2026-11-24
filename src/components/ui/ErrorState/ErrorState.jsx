import { cx } from '../../../utils/cx.js';
import Button from '../Button/Button.jsx';
import Icon from '../Icon/Icon.jsx';
import styles from './ErrorState.module.scss';

// Shown when data could not be loaded. Announced immediately (role="alert").
export default function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try again',
  className,
  children,
}) {
  return (
    <div className={cx(styles.error, className)} role="alert">
      <span className={styles.icon}>
        <Icon name="alert" size={24} />
      </span>
      <div>
        <p className={styles.title}>{title}</p>
        {message && <p className={styles.message}>{message}</p>}
        {(onRetry || children) && (
          <div className={styles.actions}>
            {onRetry && (
              <Button variant="secondary" size="small" onClick={onRetry}>
                {retryLabel}
              </Button>
            )}
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
