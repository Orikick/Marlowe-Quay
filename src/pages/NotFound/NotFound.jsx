import Button from '../../components/ui/Button/Button.jsx';
import Container from '../../components/ui/Container/Container.jsx';
import EmptyState from '../../components/ui/EmptyState/EmptyState.jsx';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.js';
import styles from './NotFound.module.scss';

export default function NotFound() {
  useDocumentTitle('Page not found');

  return (
    <Container className={styles.page}>
      <EmptyState
        icon="pin"
        headingLevel="h1"
        title="This page does not exist"
        message="The link may be mistyped, or the page may have moved. Every home we sell is on the listings page."
      >
        <Button to="/">See homes for sale</Button>
        <Button to="/favorites" variant="secondary">
          Open saved homes
        </Button>
      </EmptyState>
    </Container>
  );
}
