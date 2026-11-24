import { Link, NavLink } from 'react-router-dom';
import { useFavorites } from '../../../hooks/useFavorites.js';
import { cx } from '../../../utils/cx.js';
import Icon from '../../ui/Icon/Icon.jsx';
import styles from './Header.module.scss';

// The agency mark: four tiles meeting in a circle, after Lisbon's azulejo patterns.
function Logo() {
  return (
    <svg className={styles.logo} viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <rect width="32" height="32" rx="6" fill="#1b49c2" />
      <path d="M16 4v24M4 16h24" stroke="#fff" strokeWidth="2.5" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="#fff" strokeWidth="2.5" />
      <circle cx="16" cy="16" r="3.5" fill="#ffc93c" />
    </svg>
  );
}

const navLinkClass = ({ isActive }) => cx(styles.link, isActive && styles.active);

export default function Header() {
  const { count } = useFavorites();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <Logo />
          <span className={styles.wordmark}>Marlowe &amp; Quay</span>
        </Link>

        <nav aria-label="Main">
          <ul className={styles.nav}>
            <li>
              <NavLink to="/" end className={navLinkClass}>
                <span>
                  Homes<span className={styles.wideOnly}> for sale</span>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites" className={navLinkClass}>
                <Icon name="heart" size={18} filled={count > 0} />
                Saved
                {count > 0 && (
                  <span className={styles.count}>
                    {count}
                    <span className="visually-hidden"> homes</span>
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
