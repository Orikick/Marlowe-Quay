import { Link, useLocation } from 'react-router-dom';
import Icon from '../../ui/Icon/Icon.jsx';
import AgentAvatar from '../AgentAvatar/AgentAvatar.jsx';
import styles from './AgentCard.module.scss';

// The agent handling a listing. The name links to the agent's profile with all their homes;
// the phone and email are direct links.
export default function AgentCard({ agent }) {
  const location = useLocation();
  const firstName = agent.name.split(' ')[0];

  return (
    <div className={styles.agent}>
      <Link
        to={`/agents/${agent.id}`}
        state={{ from: `${location.pathname}${location.search}` }}
        className={styles.profile}
      >
        <AgentAvatar name={agent.name} />
        <span className={styles.identity}>
          <span className={styles.name}>{agent.name}</span>
          <span className={styles.role}>{agent.role}</span>
          <span className={styles.more}>
            See all homes {firstName} is{' '}
            <span className={styles.nowrap}>
              selling
              <Icon name="chevronRight" size={16} />
            </span>
          </span>
        </span>
      </Link>
      <p className={styles.bio}>{agent.bio}</p>
      <p className={styles.languages}>Speaks {agent.languages.join(', ')}</p>
      <ul className={styles.links}>
        <li>
          <a href={`tel:${agent.phone.replace(/\s/g, '')}`}>
            <Icon name="phone" size={18} />
            {agent.phone}
          </a>
        </li>
        <li>
          <a href={`mailto:${agent.email}`}>
            <Icon name="mail" size={18} />
            {agent.email}
          </a>
        </li>
      </ul>
    </div>
  );
}
