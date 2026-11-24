import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  EMPTY_FILTERS,
  applyFiltersToParams,
  countActiveFilters,
  parseFilters,
} from '../utils/filterParams.js';

// Listing filters, with the URL query string as the single source of truth.
// Reading parses the query string; writing updates it, so filtered views can be
// shared as links and the browser's back and forward buttons step through them.
export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);
  const activeCount = useMemo(() => countActiveFilters(filters), [filters]);

  // patch: partial filters object. Pass { replace: true } for rapid changes such as
  // typing, so each keystroke does not add a history entry.
  const setFilters = useCallback(
    (patch, { replace = false } = {}) => {
      setSearchParams(
        (current) => applyFiltersToParams(current, { ...parseFilters(current), ...patch }),
        { replace },
      );
    },
    [setSearchParams],
  );

  const clearFilters = useCallback(() => {
    setSearchParams((current) =>
      applyFiltersToParams(current, { ...EMPTY_FILTERS, sort: parseFilters(current).sort }),
    );
  }, [setSearchParams]);

  return { filters, setFilters, clearFilters, activeCount };
}
