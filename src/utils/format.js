const priceFormatter = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('en-IE');

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

// 545000 -> "€545,000"
export function formatPrice(value) {
  return priceFormatter.format(value);
}

// Compact price for map markers: 545000 -> "€545k", 1680000 -> "€1.68M"
export function formatPriceShort(value) {
  if (value >= 1_000_000) {
    const millions = (value / 1_000_000).toFixed(2).replace(/\.?0+$/, '');
    return `€${millions}M`;
  }
  return `€${Math.round(value / 1000)}k`;
}

// 78 -> "78 m²"
export function formatArea(value) {
  return `${numberFormatter.format(value)} m²`;
}

export function formatRooms(count) {
  return `${count} ${count === 1 ? 'room' : 'rooms'}`;
}

export function formatBathrooms(count) {
  return `${count} ${count === 1 ? 'bathroom' : 'bathrooms'}`;
}

export function formatPricePerSquareMetre(price, area) {
  return `${formatPrice(Math.round(price / area))} per m²`;
}

// "2026-11-04" -> "4 November 2026"
export function formatDate(isoDate) {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00`));
}

export function formatAddress({ street, postcode, city }) {
  return `${street}, ${postcode} ${city}`;
}
