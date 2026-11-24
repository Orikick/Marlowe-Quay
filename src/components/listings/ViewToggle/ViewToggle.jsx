import { cx } from '../../../utils/cx.js';
import Icon from '../../ui/Icon/Icon.jsx';
import styles from './ViewToggle.module.scss';

const VIEWS = [
  { value: 'list', label: 'List', icon: 'list' },
  { value: 'map', label: 'Map', icon: 'map' },
];

// Floating List / Map switch for small screens. Each option is a toggle button.
export default function ViewToggle({ view, onChange, className }) {
  return (
    <div className={cx(styles.toggle, className)} role="group" aria-label="Show results as">
      {VIEWS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cx(styles.option, view === option.value && styles.current)}
          aria-pressed={view === option.value}
          onClick={() => onChange(option.value)}
        >
          <Icon name={option.icon} size={18} />
          {option.label}
        </button>
      ))}
    </div>
  );
}
