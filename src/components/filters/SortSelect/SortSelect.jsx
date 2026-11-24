import { useId } from 'react';
import { SORT_OPTIONS } from '../../../data/filterOptions.js';
import styles from './SortSelect.module.scss';

// Compact "Sort by" control with its label beside the select.
export default function SortSelect({ value, onChange }) {
  const id = useId();

  return (
    <div className={styles.sort}>
      <label htmlFor={id} className={styles.label}>
        Sort by
      </label>
      <select
        id={id}
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
