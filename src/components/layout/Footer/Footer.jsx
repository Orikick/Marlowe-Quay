import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.about}>
          <p className={styles.name}>Marlowe &amp; Quay</p>
          <p>
            Independent estate agents in Lisbon since 2009. Every home on this site has been
            visited, measured and photographed by one of our four agents.
          </p>
        </div>

        <address className={styles.contact}>
          <p className={styles.heading}>Visit or call</p>
          <p>Rua do Alecrim 70, 1200-018 Lisboa</p>
          <p>Monday to Saturday, 9:30 to 19:00</p>
          <p>
            <a href="tel:+351215550100">+351 21 555 0100</a>
          </p>
          <p>
            <a href="mailto:hello@marloweandquay.example">hello@marloweandquay.example</a>
          </p>
        </address>

        <nav className={styles.links} aria-label="Footer">
          <p className={styles.heading}>Browse</p>
          <ul>
            <li>
              <Link to="/">Homes for sale</Link>
            </li>
            <li>
              <Link to="/favorites">Saved homes</Link>
            </li>
          </ul>
        </nav>
      </div>

      <p className={styles.note}>
        Marlowe &amp; Quay is a fictional agency built as a portfolio project. The listings,
        prices and agents are invented. Map data from OpenStreetMap contributors; photos from
        Unsplash.
      </p>
      <p className={styles.credit}>Designed and developed by Orest Labiak</p>
    </footer>
  );
}
