import RangeField from '../../ui/RangeField/RangeField.jsx';

// Living-area range in square metres.
export default function AreaFilter({ min, max, onChange }) {
  return (
    <RangeField
      legend="Living area"
      unit="m²"
      unitLabel="square metres"
      min={min}
      max={max}
      onCommit={({ min: minArea, max: maxArea }) => onChange({ minArea, maxArea })}
    />
  );
}
