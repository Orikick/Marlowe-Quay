import Field from '../Field/Field.jsx';

// Labelled text input. Extra props (type, value, onChange, autoComplete...) go to <input>.
export default function Input({ id, label, hint, error, optional, className, ref, ...rest }) {
  return (
    <Field
      id={id}
      label={label}
      hint={hint}
      error={error}
      optional={optional}
      className={className}
    >
      {(control) => <input ref={ref} {...control} {...rest} />}
    </Field>
  );
}
