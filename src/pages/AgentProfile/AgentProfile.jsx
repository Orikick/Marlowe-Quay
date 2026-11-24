import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import AgentAvatar from '../../components/contact/AgentAvatar/AgentAvatar.jsx';
import PropertyList, {
  PropertyListSkeleton,
} from '../../components/property/PropertyList/PropertyList.jsx';
import Button from '../../components/ui/Button/Button.jsx';
import Container from '../../components/ui/Container/Container.jsx';
import EmptyState from '../../components/ui/EmptyState/EmptyState.jsx';
import ErrorState from '../../components/ui/ErrorState/ErrorState.jsx';
import Icon from '../../components/ui/Icon/Icon.jsx';
import Skeleton from '../../components/ui/Skeleton/Skeleton.jsx';
import { useAgent } from '../../hooks/useAgent.js';
import { useBackLink } from '../../hooks/useBackLink.js';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.js';
import { sortProperties } from '../../utils/filterProperties.js';
import { formatPrice } from '../../utils/format.js';
import styles from './AgentProfile.module.scss';

function ProfileSkeleton() {
  return (
    <div aria-hidden="true">
      <div className={styles.skeletonHeader}>
        <Skeleton width="112px" height="112px" radius="50%" />
        <div className={styles.skeletonText}>
          <Skeleton width="60%" height="2.25rem" />
          <Skeleton width="45%" height="1rem" />
          <Skeleton width="85%" height="1rem" />
        </div>
      </div>
      <PropertyListSkeleton count={3} layout="wide" />
    </div>
  );
}

// Summary figures shown under the agent's details.
function summarise(properties) {
  if (properties.length === 0) return null;
  const prices = properties.map((property) => property.price);
  const neighbourhoods = [...new Set(properties.map((property) => property.address.neighbourhood))];
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return {
    count: properties.length,
    priceRange: min === max ? formatPrice(min) : `${formatPrice(min)} to ${formatPrice(max)}`,
    neighbourhoods: neighbourhoods.join(', '),
  };
}

export default function AgentProfile() {
  const { id } = useParams();
  const { data, status, error, retry } = useAgent(id);
  const back = useBackLink();

  const agent = data?.agent;
  const properties = useMemo(
    () => (data ? sortProperties(data.properties, 'newest') : []),
    [data],
  );
  const summary = useMemo(() => summarise(properties), [properties]);

  useDocumentTitle(
    agent ? `${agent.name}, ${agent.role}` : status === 'error' ? 'Agent not found' : 'Loading agent',
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
          Loading agent profile
        </p>
        <ProfileSkeleton />
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
            icon="home"
            headingLevel="h1"
            title="This agent is not part of our team"
            message="The link may be out of date. Every home we sell lists the agent who handles it."
          >
            <Button to="/">See homes for sale</Button>
          </EmptyState>
        ) : (
          <>
            <h1 className="visually-hidden">Agent profile</h1>
            <ErrorState
              title="This profile did not load"
              message={error?.message ?? 'Check your connection and try again.'}
              onRetry={retry}
            />
          </>
        )}
      </Container>
    );
  }

  const firstName = agent.name.split(' ')[0];
  const phoneHref = `tel:${agent.phone.replace(/\s/g, '')}`;

  return (
    <Container className={styles.page}>
      {backLink}

      <header className={styles.header}>
        <AgentAvatar name={agent.name} size="large" />
        <div className={styles.intro}>
          <h1 className={styles.name}>{agent.name}</h1>
          <p className={styles.role}>{agent.role}</p>
          <p className={styles.bio}>{agent.bio}</p>
          <p className={styles.languages}>Speaks {agent.languages.join(', ')}</p>
          <div className={styles.actions}>
            <Button href={phoneHref}>
              <Icon name="phone" size={18} />
              Call {agent.phone}
            </Button>
            <Button href={`mailto:${agent.email}`} variant="secondary">
              <Icon name="mail" size={18} />
              Email {firstName}
            </Button>
          </div>
        </div>
      </header>

      {summary && (
        <dl className={styles.summary}>
          <div>
            <dt>Homes for sale</dt>
            <dd>{summary.count}</dd>
          </div>
          <div>
            <dt>Price range</dt>
            <dd>{summary.priceRange}</dd>
          </div>
          <div>
            <dt>Neighbourhoods</dt>
            <dd>{summary.neighbourhoods}</dd>
          </div>
        </dl>
      )}

      <section className={styles.listings} aria-labelledby="agent-homes-heading">
        <h2 id="agent-homes-heading" className={styles.sectionTitle}>
          Homes {firstName} is selling
        </h2>
        {properties.length > 0 ? (
          <PropertyList properties={properties} layout="wide" label={`Homes ${firstName} is selling`} />
        ) : (
          <EmptyState
            headingLevel="h3"
            title={`${firstName} has no homes for sale right now`}
            message={`New listings appear here as soon as they are photographed. You can still call ${firstName} to ask about homes coming soon.`}
          >
            <Button to="/">See all homes for sale</Button>
          </EmptyState>
        )}
      </section>
    </Container>
  );
}
