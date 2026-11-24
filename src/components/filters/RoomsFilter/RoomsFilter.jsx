import { ROOM_OPTIONS } from '../../../data/filterOptions.js';
import ChoiceGroup from '../../ui/ChoiceGroup/ChoiceGroup.jsx';

const OPTIONS = [
  { value: null, label: 'Any' },
  ...ROOM_OPTIONS.map((count) => ({ value: count, label: `${count}+` })),
];

// Minimum number of rooms (living rooms plus bedrooms).
export default function RoomsFilter({ value, onChange }) {
  return (
    <ChoiceGroup
      legend="Rooms, at least"
      type="radio"
      options={OPTIONS}
      value={value}
      onChange={onChange}
    />
  );
}
