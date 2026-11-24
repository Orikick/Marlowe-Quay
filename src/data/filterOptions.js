// Static options for the listing filters.

export const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'studio', label: 'Studio' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'house', label: 'House' },
  { value: 'penthouse', label: 'Penthouse' },
];

export const TYPE_LABELS = Object.fromEntries(
  PROPERTY_TYPES.map(({ value, label }) => [value, label]),
);

// "Rooms" counts living rooms and bedrooms, not kitchens or bathrooms.
export const ROOM_OPTIONS = [1, 2, 3, 4, 5];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'area-desc', label: 'Largest first' },
];

export const DEFAULT_SORT = 'newest';

export const EMPTY_FILTERS = Object.freeze({
  types: [],
  minPrice: null,
  maxPrice: null,
  rooms: null,
  minArea: null,
  maxArea: null,
  sort: DEFAULT_SORT,
});
