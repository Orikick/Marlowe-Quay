import Skeleton from '../../ui/Skeleton/Skeleton.jsx';
import styles from './PropertyCardSkeleton.module.scss';

// Same footprint as PropertyCard, so nothing shifts when the real cards arrive.
export default function PropertyCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <Skeleton ratio="3 / 2" radius="0" />
      <div className={styles.body}>
        <Skeleton width="45%" height="1.6rem" />
        <Skeleton width="85%" height="1.1rem" />
        <Skeleton width="60%" height="0.9rem" />
        <Skeleton width="75%" height="0.9rem" />
      </div>
    </div>
  );
}
