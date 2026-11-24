import { useId } from 'react';
import { cx } from '../../../utils/cx.js';
import Icon from '../Icon/Icon.jsx';
import styles from './Field.module.scss';

// Label, optional hint and error message around one form control.
// `children` is a function that receives the props the control needs for accessibility:
//   <Field label="Email" error={error}>{(control) => <input {...control} />}</Field>
export default function Field({ id, label, hint, error, optional = false, className, children }) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cx(styles.field, className)}>
      <label htmlFor={controlId} className={styles.label}>
        {label}
        {optional && <span className={styles.optional}> (optional)</span>}
      </label>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {children({
        id: controlId,
        className: cx(styles.control, error && styles.invalid),
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy,
      })}
      {error && (
        <p id={errorId} className={styles.error}>
          <Icon name="alert" size={16} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
