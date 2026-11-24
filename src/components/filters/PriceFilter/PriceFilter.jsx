import RangeField from '../../ui/RangeField/RangeField.jsx';

// Asking-price range in euros.
export default function PriceFilter({ min, max, onChange }) {
  return (
    <RangeField
      legend="Price"
      unit="€"
      unitLabel="price in euros"
      min={min}
      max={max}
      onCommit={({ min: minPrice, max: maxPrice }) => onChange({ minPrice, maxPrice })}
    />
  );
}
