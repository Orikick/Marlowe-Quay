import {
  DEFAULT_SORT,
  EMPTY_FILTERS,
  PROPERTY_TYPES,
  ROOM_OPTIONS,
  SORT_OPTIONS,
} from '../data/filterOptions.js';

// Query-string keys owned by the filters. Other params (for example "view") are left alone.
export const FILTER_KEYS = ['type', 'minPrice', 'maxPrice', 'rooms', 'minArea', 'maxArea', 'sort'];

const VALID_TYPES = new Set(PROPERTY_TYPES.map((type) => type.value));
const VALID_SORTS = new Set(SORT_OPTIONS.map((option) => option.value));

function readPositiveInt(params, key) {
  const raw = params.get(key);
  if (raw === null || !/^\d+$/.test(raw)) return null;
  const value = Number.parseInt(raw, 10);
  return value > 0 ? value : null;
}

// URLSearchParams -> filters object. Unknown or malformed values are ignored.
export function parseFilters(params) {
  const types = (params.get('type') ?? '')
    .split(',')
    .filter((value, index, all) => VALID_TYPES.has(value) && all.indexOf(value) === index);

  const rooms = readPositiveInt(params, 'rooms');
  const sort = params.get('sort');

  return {
    types,
    minPrice: readPositiveInt(params, 'minPrice'),
    maxPrice: readPositiveInt(params, 'maxPrice'),
    rooms: ROOM_OPTIONS.includes(rooms) ? rooms : null,
    minArea: readPositiveInt(params, 'minArea'),
    maxArea: readPositiveInt(params, 'maxArea'),
    sort: VALID_SORTS.has(sort) ? sort : DEFAULT_SORT,
  };
}

// Filters object -> plain { key: string } map with defaults left out, to keep URLs short.
export function serializeFilters(filters) {
  const entries = {};
  if (filters.types.length > 0) entries.type = filters.types.join(',');
  if (filters.minPrice) entries.minPrice = String(filters.minPrice);
  if (filters.maxPrice) entries.maxPrice = String(filters.maxPrice);
  if (filters.rooms) entries.rooms = String(filters.rooms);
  if (filters.minArea) entries.minArea = String(filters.minArea);
  if (filters.maxArea) entries.maxArea = String(filters.maxArea);
  if (filters.sort && filters.sort !== DEFAULT_SORT) entries.sort = filters.sort;
  return entries;
}

// Returns a new URLSearchParams with the filter keys replaced and everything else kept.
export function applyFiltersToParams(params, filters) {
  const next = new URLSearchParams(params);
  FILTER_KEYS.forEach((key) => next.delete(key));
  Object.entries(serializeFilters(filters)).forEach(([key, value]) => next.set(key, value));
  return next;
}

// Sorting is not counted: it changes the order, not which homes are shown.
export function countActiveFilters(filters) {
  return (
    filters.types.length +
    [filters.minPrice, filters.maxPrice, filters.rooms, filters.minArea, filters.maxArea].filter(
      Boolean,
    ).length
  );
}

export { EMPTY_FILTERS };
