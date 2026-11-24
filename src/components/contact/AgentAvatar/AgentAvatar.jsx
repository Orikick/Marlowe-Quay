import { cx } from '../../../utils/cx.js';
import styles from './AgentAvatar.module.scss';

const initials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

// Initials in a circle. Decorative: the agent's name is always shown next to it.
// size: 'medium' | 'large'
export default function AgentAvatar({ name, size = 'medium', className }) {
  return (
    <span className={cx(styles.avatar, styles[size], className)} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
