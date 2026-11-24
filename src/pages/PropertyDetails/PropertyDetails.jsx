import { Suspense, lazy } from 'react';
import { Link, useParams } from 'react-router-dom';
import AgentCard from '../../components/contact/AgentCard/AgentCard.jsx';
import ContactAgentForm from '../../components/contact/ContactAgentForm/ContactAgentForm.jsx';
import MapFallback from '../../components/map/MapFallback/MapFallback.jsx';
import FavoriteButton from '../../components/property/FavoriteButton/FavoriteButton.jsx';
import PhotoGallery from '../../components/property/PhotoGallery/PhotoGallery.jsx';
import PriceTag from '../../components/property/PriceTag/PriceTag.jsx';
import PropertySpecs from '../../components/property/PropertySpecs/PropertySpecs.jsx';
import Button from '../../components/ui/Button/Button.jsx';
import Container from '../../components/ui/Container/Container.jsx';
import EmptyState from '../../components/ui/EmptyState/EmptyState.jsx';
import ErrorBoundary from '../../components/ui/ErrorBoundary/ErrorBoundary.jsx';
import ErrorState from '../../components/ui/ErrorState/ErrorState.jsx';
import Icon from '../../components/ui/Icon/Icon.jsx';
import Skeleton from '../../components/ui/Skeleton/Skeleton.jsx';
import { useBackLink } from '../../hooks/useBackLink.js';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.js';
import { useProperty } from '../../hooks/useProperty.js';
import { formatAddress } from '../../utils/format.js';
import styles from './PropertyDetails.module.scss';

const LocationMap = lazy(() => import('../../components/map/LocationMap/LocationMap.jsx'));

function DetailsSkeleton() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <Skeleton width="60%" height="2.25rem" />
      <Skeleton width="40%" height="1.1rem" />
      <Skeleton className={styles.skeletonPhoto} ratio="16 / 9" height="auto" />
      <Skeleton width="90%" height="1rem" />
      <Skeleton width="80%" height="1rem" />
    </div>
  );
}

export default function PropertyDetails() {
  const { id } = useParams();
  const { data, status, error, retry } = useProperty(id);
  const back = useBackLink();

  const property = data?.property;
  const agent = data?.agent;
  useDocumentTitle(
    property ? property.title : status === 'error' ? 'Home not available' : 'Loading home',
  );

  const backLink = (
    <Link to={back.to} className={styles.back}>
      <Icon name="arrowLeft" size={18} />
      {back.label}
    </Link>
  );

  if (status === 'loading') {
    return (
      <Container className={styles.page}>
        {backLink}
        <p className="visually-hidden" role="status">
          Loading home details
        </p>
        <DetailsSkeleton />
      </Container>
    );
  }

  if (status === 'error') {
    const notFound = error?.status === 404;
    return (
      <Container className={styles.page}>
        {backLink}
        {notFound ? (
          <EmptyState
            headingLevel="h1"
            title="This home is no longer listed"
            message="It may have been sold or taken off the market. There are more homes in the same neighbourhoods on our listings page."
          >
            <Button to="/">See homes for sale</Button>
          </EmptyState>
        ) : (
          <>
            <h1 className="visually-hidden">Home details</h1>
            <ErrorState
              title="This home did not load"
              message={error?.message ?? 'Check your connection and try again.'}
              onRetry={retry}
            />
          </>
        )}
      </Container>
    );
  }

  const { title, price, area, address, photos, description, coordinates } = property;
  const fullAddress = formatAddress(address);

  return (
    <Container className={styles.page}>
      {backLink}

      <header className={styles.header}>
        <div className={styles.headline}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.address}>
            <Icon name="pin" size={18} />
            {address.neighbourhood}, {fullAddress}
          </p>
        </div>
        <div className={styles.headerSide}>
          <PriceTag price={price} area={area} size="large" />
          <div className={styles.headerActions}>
            <FavoriteButton propertyId={property.id} title={title} variant="full" />
            <Button variant="secondary" href="#contact">
              Contact the agent
            </Button>
          </div>
        </div>
      </header>

      <PhotoGallery photos={photos} title={title} />

      <div className={styles.columns}>
        <div className={styles.main}>
          <section className={styles.section} aria-labelledby="about-heading">
            <h2 id="about-heading" className={styles.sectionTitle}>
              About this home
            </h2>
            <p className={styles.description}>{description}</p>
          </section>

          <section className={styles.section} aria-labelledby="facts-heading">
            <h2 id="facts-heading" className={styles.sectionTitle}>
              Key facts
            </h2>
            <PropertySpecs property={property} />
          </section>

          <section className={styles.section} aria-labelledby="location-heading">
            <h2 id="location-heading" className={styles.sectionTitle}>
              Location
            </h2>
            <p className={styles.locationNote}>
              {fullAddress}. The pin marks the street; the agent gives the exact address when
              you book a viewing.
            </p>
            <div className={styles.mapFrame}>
              <ErrorBoundary fallback={<MapFallback status="error" />}>
                <Suspense fallback={<MapFallback />}>
                  <LocationMap coordinates={coordinates} label={`${title}, ${address.neighbourhood}`} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </section>
        </div>

        <aside id="contact" className={styles.aside} aria-labelledby="contact-heading">
          <h2 id="contact-heading" className={styles.sectionTitle}>
            Ask about this home
          </h2>
          {agent && <AgentCard agent={agent} />}
          <ContactAgentForm property={property} agent={agent} />
        </aside>
      </div>
    </Container>
  );
}
