import styles from './ResultsCount.module.scss';

// "12 of 30 homes". A polite live region, so screen readers hear the new count
// after each filter change without losing their place.
export default function ResultsCount({ status, shown, total }) {
  let text = '';
  if (status === 'loading') text = 'Loading homes';
  if (status === 'success') {
    const noun = total === 1 ? 'home' : 'homes';
    text = shown === total ? `${total} ${noun} for sale` : `${shown} of ${total} ${noun} match your filters`;
  }

  return (
    <p className={styles.count} role="status">
      {text}
    </p>
  );
}
