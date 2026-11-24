import { useEffect, useRef, useState } from 'react';
import { sendEnquiry } from '../../../services/api.js';
import Button from '../../ui/Button/Button.jsx';
import ErrorState from '../../ui/ErrorState/ErrorState.jsx';
import Icon from '../../ui/Icon/Icon.jsx';
import Input from '../../ui/Input/Input.jsx';
import Spinner from '../../ui/Spinner/Spinner.jsx';
import Textarea from '../../ui/Textarea/Textarea.jsx';
import styles from './ContactAgentForm.module.scss';
import { validateEnquiry } from './validate.js';

const FIELD_ORDER = ['name', 'email', 'phone', 'message'];

function initialValues(property) {
  return {
    name: '',
    email: '',
    phone: '',
    message: `I'd like to arrange a viewing of "${property.title}" at ${property.address.street}. Which days are free next week?`,
  };
}

// Enquiry form for one listing.
// status: 'idle' | 'submitting' | 'success' | 'error'
export default function ContactAgentForm({ property, agent }) {
  const [values, setValues] = useState(() => initialValues(property));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');
  const [reference, setReference] = useState('');
  const fieldRefs = useRef({});
  const successRef = useRef(null);
  const firstName = agent?.name.split(' ')[0] ?? 'our team';

  // A different listing gets a fresh form.
  useEffect(() => {
    setValues(initialValues(property));
    setErrors({});
    setStatus('idle');
  }, [property]);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // Clear a field's error as soon as it is edited.
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setStatus('submitting');
    setSubmitError('');
    try {
      const result = await sendEnquiry({ propertyId: property.id, ...values });
      setReference(result.reference);
      setStatus('success');
    } catch (error) {
      setSubmitError(error.message);
      setStatus('error');
    }
  }

  function startOver() {
    setValues(initialValues(property));
    setErrors({});
    setStatus('idle');
  }

  if (status === 'success') {
    return (
      <div className={styles.success} ref={successRef} tabIndex={-1} role="status">
        <Icon name="check" size={28} className={styles.successIcon} />
        <h3 className={styles.successTitle}>Message sent to {firstName}</h3>
        <p>
          {firstName} usually replies within one working day, by email to{' '}
          <strong>{values.email}</strong>. Your reference is <strong>{reference}</strong>.
        </p>
        <Button variant="secondary" size="small" onClick={startOver}>
          Write another message
        </Button>
      </div>
    );
  }

  const register = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    error: errors[name],
    ref: (element) => {
      fieldRefs.current[name] = element;
    },
  });

  const submitting = status === 'submitting';

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-busy={submitting}>
      {status === 'error' && (
        <ErrorState title="Your message was not sent" message={submitError}>
          {agent && (
            <a href={`tel:${agent.phone.replace(/\s/g, '')}`}>Call {firstName} on {agent.phone}</a>
          )}
        </ErrorState>
      )}

      <Input label="Your name" autoComplete="name" required {...register('name')} />
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        inputMode="email"
        required
        {...register('email')}
      />
      <Input
        label="Phone"
        type="tel"
        autoComplete="tel"
        optional
        hint="Add it if you would rather be called."
        {...register('phone')}
      />
      <Textarea label="Message" required {...register('message')} />

      <Button type="submit" block disabled={submitting}>
        {submitting ? (
          <>
            <Spinner size={18} />
            Sending message
          </>
        ) : (
          'Send message'
        )}
      </Button>
      <p className={styles.privacy}>
        We only use your details to answer this enquiry and never pass them to anyone else.
      </p>
    </form>
  );
}
