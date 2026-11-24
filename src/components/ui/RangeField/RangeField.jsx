import { useEffect, useId, useRef, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce.js';
import { cx } from '../../../utils/cx.js';
import styles from './RangeField.module.scss';

const toText = (value) => (value ? String(value) : '');
const toNumber = (text) => (text === '' ? null : Number.parseInt(text, 10) || null);
const digitsOnly = (text) => text.replace(/\D/g, '').slice(0, 9);

// A "from / to" pair of whole-number inputs, for example a price or area range.
// The user types freely; onCommit({ min, max }) fires once typing pauses, and only
// when the range is valid. `min` and `max` are numbers or null.
export default function RangeField({ legend, unit, unitLabel, min, max, onCommit, className }) {
  const baseId = useId();
  const [draft, setDraft] = useState({ min: toText(min), max: toText(max) });
  const debounced = useDebounce(draft, 400);
  // True between a keystroke and the commit that follows it. Outside changes reset it,
  // so a pending debounce can never write an old value back over a cleared filter.
  const edited = useRef(false);

  // Follow outside changes: a cleared filter, a shared link, back and forward.
  useEffect(() => {
    edited.current = false;
    setDraft({ min: toText(min), max: toText(max) });
  }, [min, max]);

  const draftMin = toNumber(draft.min);
  const draftMax = toNumber(draft.max);
  const isInverted = draftMin !== null && draftMax !== null && draftMin > draftMax;

  useEffect(() => {
    // Only commit what the user typed, and only its latest version.
    if (!edited.current || debounced !== draft) return;
    const next = { min: toNumber(debounced.min), max: toNumber(debounced.max) };
    const inverted = next.min !== null && next.max !== null && next.min > next.max;
    if (inverted) return;
    edited.current = false;
    if (next.min !== min || next.max !== max) onCommit(next);
    // Runs only when the debounced text settles, not when props catch up.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const errorId = `${baseId}-error`;

  function handleChange(side, event) {
    const value = digitsOnly(event.target.value);
    edited.current = true;
    setDraft((current) => ({ ...current, [side]: value }));
  }

  return (
    <fieldset className={cx(styles.range, className)}>
      <legend className={styles.legend}>
        {legend}
        <span className={styles.unit}> ({unit})</span>
      </legend>
      <div className={styles.inputs}>
        <label className={styles.side} htmlFor={`${baseId}-min`}>
          <span className={styles.sideLabel}>
            From<span className="visually-hidden">, minimum {unitLabel}</span>
          </span>
          <input
            id={`${baseId}-min`}
            className={cx(styles.input, isInverted && styles.invalid)}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Any"
            value={draft.min}
            onChange={(event) => handleChange('min', event)}
            aria-invalid={isInverted || undefined}
            aria-describedby={isInverted ? errorId : undefined}
          />
        </label>
        <label className={styles.side} htmlFor={`${baseId}-max`}>
          <span className={styles.sideLabel}>
            To<span className="visually-hidden">, maximum {unitLabel}</span>
          </span>
          <input
            id={`${baseId}-max`}
            className={cx(styles.input, isInverted && styles.invalid)}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Any"
            value={draft.max}
            onChange={(event) => handleChange('max', event)}
            aria-invalid={isInverted || undefined}
            aria-describedby={isInverted ? errorId : undefined}
          />
        </label>
      </div>
      <p id={errorId} className={styles.error} role="alert">
        {isInverted ? '"From" is higher than "To". Swap the two values.' : ''}
      </p>
    </fieldset>
  );
}
