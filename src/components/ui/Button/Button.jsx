import { Link } from 'react-router-dom';
import { cx } from '../../../utils/cx.js';
import styles from './Button.module.scss';

// Renders a <button>, or a router <Link> when `to` is given, or an <a> when `href` is given.
// variant: 'primary' | 'secondary' | 'ghost'   size: 'medium' | 'small'
export default function Button({
  variant = 'primary',
  size = 'medium',
  block = false,
  to,
  href,
  className,
  children,
  ...rest
}) {
  const classes = cx(
    styles.button,
    styles[variant],
    size === 'small' && styles.small,
    block && styles.block,
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
