import { useEffect, useId, useRef, useState } from 'react';
import { cx } from '../../../utils/cx.js';
import Button from '../../ui/Button/Button.jsx';
import Icon from '../../ui/Icon/Icon.jsx';
import ActiveFilters from '../ActiveFilters/ActiveFilters.jsx';
import AreaFilter from '../AreaFilter/AreaFilter.jsx';
import PriceFilter from '../PriceFilter/PriceFilter.jsx';
import RoomsFilter from '../RoomsFilter/RoomsFilter.jsx';
import SortSelect from '../SortSelect/SortSelect.jsx';
import TypeFilter from '../TypeFilter/TypeFilter.jsx';
import styles from './FilterBar.module.scss';

// Toolbar with a "Filters" disclosure, the sort control and the chips for active filters.
// Every change goes straight to the URL through `onChange`, so results update as you go.
export default function FilterBar({ filters, activeCount, resultCount, onChange, onClear }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  function close() {
    setOpen(false);
    toggleRef.current?.focus();
  }

  // Move focus into the panel when it opens, so keyboard users land on the first filter.
  useEffect(() => {
    if (open) panelRef.current?.querySelector('input')?.focus();
  }, [open]);

  function handleKeyDown(event) {
    if (event.key === 'Escape' && open) {
      event.stopPropagation();
      close();
    }
  }

  const showLabel =
    resultCount === 1 ? 'Show 1 home' : resultCount === 0 ? 'No homes match' : `Show ${resultCount} homes`;

  return (
    <section className={styles.bar} aria-label="Search filters" onKeyDown={handleKeyDown}>
      <div className={styles.toolbar}>
        <button
          ref={toggleRef}
          type="button"
          className={cx(styles.toggle, open && styles.toggleOpen)}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name="filter" size={18} />
          <span>Filters</span>
          {activeCount > 0 && (
            <span className={styles.count}>
              {activeCount}
              <span className="visually-hidden"> active</span>
            </span>
          )}
        </button>
        <SortSelect value={filters.sort} onChange={(sort) => onChange({ sort })} />
      </div>

      <div id={panelId} ref={panelRef} className={styles.panel} hidden={!open}>
        <div className={styles.groups}>
          <TypeFilter value={filters.types} onChange={(types) => onChange({ types })} />
          <RoomsFilter value={filters.rooms} onChange={(rooms) => onChange({ rooms })} />
          <PriceFilter min={filters.minPrice} max={filters.maxPrice} onChange={onChange} />
          <AreaFilter min={filters.minArea} max={filters.maxArea} onChange={onChange} />
        </div>
        <div className={styles.actions}>
          <Button variant="ghost" size="small" onClick={onClear} disabled={activeCount === 0}>
            Clear filters
          </Button>
          <Button size="small" onClick={close}>
            {showLabel}
          </Button>
        </div>
      </div>

      <ActiveFilters filters={filters} onChange={onChange} onClear={onClear} />
    </section>
  );
}
