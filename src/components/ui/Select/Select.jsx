import Field from '../Field/Field.jsx';

// Labelled native select. options: [{ value, label }]
export default function Select({ id, label, hint, error, options, className, ref, ...rest }) {
  return (
    <Field id={id} label={label} hint={hint} error={error} className={className}>
      {(control) => (
        <select ref={ref} {...control} {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}
