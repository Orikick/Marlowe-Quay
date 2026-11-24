// Pure functions: no React, no URL access. Easy to test.

export function filterProperties(properties, filters) {
  const { types, minPrice, maxPrice, rooms, minArea, maxArea } = filters;

  return properties.filter((property) => {
    if (types.length > 0 && !types.includes(property.type)) return false;
    if (minPrice && property.price < minPrice) return false;
    if (maxPrice && property.price > maxPrice) return false;
    if (rooms && property.rooms < rooms) return false;
    if (minArea && property.area < minArea) return false;
    if (maxArea && property.area > maxArea) return false;
    return true;
  });
}

const comparators = {
  newest: (a, b) => b.listedAt.localeCompare(a.listedAt),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'area-desc': (a, b) => b.area - a.area,
};

export function sortProperties(properties, sort) {
  const compare = comparators[sort] ?? comparators.newest;
  return [...properties].sort(compare);
}
