import { cx } from '../../../utils/cx.js';
import styles from './Container.module.scss';

// Centres content and applies the page gutters. `as` picks the HTML element.
export default function Container({ as: Element = 'div', className, children, ...rest }) {
  return (
    <Element className={cx(styles.container, className)} {...rest}>
      {children}
    </Element>
  );
}
