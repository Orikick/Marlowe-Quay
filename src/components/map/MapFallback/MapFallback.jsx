import Button from '../../ui/Button/Button.jsx';
import Icon from '../../ui/Icon/Icon.jsx';
import Spinner from '../../ui/Spinner/Spinner.jsx';
import styles from './MapFallback.module.scss';

// Fills the map area while the map code downloads, or when it could not load.
// status: 'loading' | 'error'
export default function MapFallback({ status = 'loading', note }) {
  if (status === 'error') {
    return (
      <div className={styles.fallback} role="alert">
        <Icon name="map" size={32} />
        <p className={styles.title}>The map could not be loaded</p>
        {note && <p className={styles.note}>{note}</p>}
        <Button variant="secondary" size="small" onClick={() => window.location.reload()}>
          Reload the page
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.fallback}>
      <Spinner label="Loading map" size={24} />
    </div>
  );
}
