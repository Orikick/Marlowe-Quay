import { useId } from 'react';
import { cx } from '../../../utils/cx.js';
import styles from './ChoiceGroup.module.scss';

// A row of pill-shaped checkboxes or radio buttons inside a <fieldset>.
// Native inputs are kept (visually hidden) so keyboard and screen-reader behaviour is standard.
//   type="checkbox": value is an array, onChange receives the new array
//   type="radio":    value is a single option value, onChange receives it
export default function ChoiceGroup({ legend, type = 'checkbox', options, value, onChange, className }) {
  const name = useId();

  function isChecked(optionValue) {
    return type === 'checkbox' ? value.includes(optionValue) : value === optionValue;
  }

  function handleChange(optionValue, checked) {
    if (type === 'radio') {
      onChange(optionValue);
      return;
    }
    onChange(checked ? [...value, optionValue] : value.filter((item) => item !== optionValue));
  }

  return (
    <fieldset className={cx(styles.group, className)}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.options}>
        {options.map((option) => (
          <label key={String(option.value)} className={styles.option}>
            <input
              className={styles.input}
              type={type}
              name={name}
              checked={isChecked(option.value)}
              onChange={(event) => handleChange(option.value, event.target.checked)}
            />
            <span className={styles.pill}>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
