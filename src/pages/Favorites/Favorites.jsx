import { useMemo } from 'react';
import PropertyList, {
  PropertyListSkeleton,
} from '../../components/property/PropertyList/PropertyList.jsx';
import Button from '../../components/ui/Button/Button.jsx';
import Container from '../../components/ui/Container/Container.jsx';
import EmptyState from '../../components/ui/EmptyState/EmptyState.jsx';
import ErrorState from '../../components/ui/ErrorState/ErrorState.jsx';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.js';
import { useFavorites } from '../../hooks/useFavorites.js';
import { useProperties } from '../../hooks/useProperties.js';
import styles from './Favorites.module.scss';

export default function Favorites() {
  useDocumentTitle('Saved homes');
  const { ids } = useFavorites();
  const { data: properties, status, error, retry } = useProperties();

  // Most recently saved first. Ids of homes that are no longer listed are skipped.
  const saved = useMemo(() => {
    if (!properties) return [];
    const byId = new Map(properties.map((property) => [property.id, property]));
    return ids.map((id) => byId.get(id)).filter(Boolean);
  }, [ids, properties]);

  let content;
  if (status === 'loading') {
    content = (
      <>
        <p className="visually-hidden" role="status">
          Loading saved homes
        </p>
        <PropertyListSkeleton count={3} layout="wide" />
      </>
    );
  } else if (status === 'error') {
    content = (
      <ErrorState
        title="Your saved homes did not load"
        message={error?.message ?? 'Check your connection and try again.'}
        onRetry={retry}
      />
    );
  } else if (saved.length === 0) {
    content = (
      <EmptyState
        icon="heart"
        title="No saved homes yet"
        message="Select the heart on any home to keep it here, so you can compare your shortlist later."
      >
        <Button to="/">Browse homes for sale</Button>
      </EmptyState>
    );
  } else {
    content = <PropertyList properties={saved} layout="wide" label="Saved homes" />;
  }

  return (
    <Container className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Saved homes</h1>
        <p className={styles.intro}>
          {status === 'success' && saved.length > 0
            ? `${saved.length} ${saved.length === 1 ? 'home' : 'homes'} saved. `
            : ''}
          Your shortlist is stored in this browser only, so it will not appear on other devices.
        </p>
      </header>
      {content}
    </Container>
  );
}
