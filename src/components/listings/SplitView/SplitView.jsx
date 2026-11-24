import styles from './SplitView.module.scss';

// Two-pane layout for the listings page.
//   From 768px: `top` and `list` on the left, `map` sticky on the right.
//   Below 768px: `top`, then either `list` or `map`, picked by `mode`.
// Panes are only rendered when visible, so phones in list view never load the map.
export default function SplitView({ top, list, map, mode = 'both' }) {
  const showList = mode !== 'map';
  const showMap = mode !== 'list';

  return (
    <div className={styles.split}>
      <div className={styles.top}>{top}</div>
      {showList && <div className={styles.list}>{list}</div>}
      {showMap && (
        <section className={styles.map} aria-label="Map of the homes in the list">
          {map}
        </section>
      )}
    </div>
  );
}
