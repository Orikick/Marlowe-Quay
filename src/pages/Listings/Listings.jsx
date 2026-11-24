import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterBar from '../../components/filters/FilterBar/FilterBar.jsx';
import ResultsCount from '../../components/listings/ResultsCount/ResultsCount.jsx';
import SplitView from '../../components/listings/SplitView/SplitView.jsx';
import ViewToggle from '../../components/listings/ViewToggle/ViewToggle.jsx';
import MapFallback from '../../components/map/MapFallback/MapFallback.jsx';
import MapPreviewCard from '../../components/map/MapPreviewCard/MapPreviewCard.jsx';
import PropertyList, {
  PropertyListSkeleton,
} from '../../components/property/PropertyList/PropertyList.jsx';
import Button from '../../components/ui/Button/Button.jsx';
import EmptyState from '../../components/ui/EmptyState/EmptyState.jsx';
import ErrorBoundary from '../../components/ui/ErrorBoundary/ErrorBoundary.jsx';
import ErrorState from '../../components/ui/ErrorState/ErrorState.jsx';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.js';
import { useFilters } from '../../hooks/useFilters.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { useProperties } from '../../hooks/useProperties.js';
import { filterProperties, sortProperties } from '../../utils/filterProperties.js';
import styles from './Listings.module.scss';

// Leaflet is large, so it downloads in its own chunk, after the list is on screen.
const ListingsMap = lazy(() => import('../../components/map/ListingsMap/ListingsMap.jsx'));

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Listings() {
  useDocumentTitle('Homes for sale in Lisbon');

  const { data: properties, status, error, retry } = useProperties();
  const { filters, setFilters, clearFilters, activeCount } = useFilters();
  const [searchParams, setSearchParams] = useSearchParams();
  const isSplit = useMediaQuery('(min-width: 768px)');

  // hoveredId: card under the pointer or keyboard focus -> highlights its marker.
  // selection: marker the user chose -> scrolls to and highlights its card.
  const [hoveredId, setHoveredId] = useState(null);
  const [selection, setSelection] = useState(null); // { id, viaKeyboard, at }

  const view = searchParams.get('view') === 'map' ? 'map' : 'list';
  const mode = isSplit ? 'both' : view;

  const results = useMemo(() => {
    if (!properties) return [];
    return sortProperties(filterProperties(properties, filters), filters.sort);
  }, [properties, filters]);

  const resultIds = useMemo(() => new Set(results.map((property) => property.id)), [results]);
  const selectedId = selection && resultIds.has(selection.id) ? selection.id : null;
  const selectedProperty = selectedId ? results.find((property) => property.id === selectedId) : null;

  const handleMarkerSelect = useCallback((id, { viaKeyboard }) => {
    setSelection({ id, viaKeyboard, at: Date.now() });
  }, []);

  const clearSelection = useCallback(() => setSelection(null), []);

  // Split view: bring the chosen card into view. Keyboard users also get focus moved to it.
  useEffect(() => {
    if (!selection || !isSplit) return;
    const card = document.getElementById(`property-${selection.id}`);
    if (!card) return;
    card.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
    if (selection.viaKeyboard) card.querySelector('a')?.focus({ preventScroll: true });
  }, [selection, isSplit]);

  function changeView(nextView) {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (nextView === 'map') next.set('view', 'map');
        else next.delete('view');
        return next;
      },
      { replace: true },
    );
    setSelection(null);
  }

  const total = properties?.length ?? 0;

  const top = (
    <div className={styles.top}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Homes for sale in Lisbon</h1>
        <ResultsCount status={status} shown={results.length} total={total} />
      </div>
      <FilterBar
        filters={filters}
        activeCount={activeCount}
        resultCount={results.length}
        onChange={setFilters}
        onClear={clearFilters}
      />
    </div>
  );

  let list;
  if (status === 'loading') {
    list = <PropertyListSkeleton count={isSplit ? 4 : 3} />;
  } else if (status === 'error') {
    list = (
      <ErrorState
        title="The listings did not load"
        message={error?.message ?? 'Check your connection and try again.'}
        onRetry={retry}
      />
    );
  } else if (results.length === 0) {
    list = (
      <EmptyState
        icon="filter"
        title="No homes match these filters"
        message={`Try a wider price or area range, or fewer property types. We have ${total} homes for sale right now.`}
      >
        <Button onClick={clearFilters}>Clear filters</Button>
      </EmptyState>
    );
  } else {
    list = (
      <PropertyList
        properties={results}
        highlightedId={hoveredId}
        selectedId={selectedId}
        onHoverChange={setHoveredId}
        label="Search results"
      />
    );
  }

  let map;
  if (status === 'error') {
    map = <MapFallback status="error" note="The list shows the same homes as the map." />;
  } else if (status === 'loading') {
    map = <MapFallback />;
  } else {
    map = (
      <>
        <ErrorBoundary
          fallback={<MapFallback status="error" note="The list shows the same homes as the map." />}
        >
          <Suspense fallback={<MapFallback />}>
            <ListingsMap
              properties={results}
              activeId={hoveredId ?? selectedId}
              onSelect={handleMarkerSelect}
              onBackgroundClick={clearSelection}
            />
          </Suspense>
        </ErrorBoundary>
        {!isSplit && selectedProperty && (
          <MapPreviewCard
            property={selectedProperty}
            onClose={clearSelection}
            focusOnOpen={selection?.viaKeyboard}
          />
        )}
      </>
    );
  }

  return (
    <>
      <SplitView top={top} list={list} map={map} mode={mode} />
      {!isSplit && <ViewToggle view={view} onChange={changeView} />}
    </>
  );
}
