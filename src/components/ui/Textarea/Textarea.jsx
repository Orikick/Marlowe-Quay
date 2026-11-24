import Field from '../Field/Field.jsx';

// Labelled multi-line text input.
export default function Textarea({ id, label, hint, error, optional, className, ref, ...rest }) {
  return (
    <Field
      id={id}
      label={label}
      hint={hint}
      error={error}
      optional={optional}
      className={className}
    >
      {(control) => <textarea ref={ref} rows={5} {...control} {...rest} />}
    </Field>
  );
}
