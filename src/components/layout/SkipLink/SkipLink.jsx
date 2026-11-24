import styles from './SkipLink.module.scss';

// First focusable element on every page: lets keyboard users jump past the header.
export default function SkipLink({ targetId = 'main' }) {
  return (
    <a className={styles.skip} href={`#${targetId}`}>
      Skip to main content
    </a>
  );
}
