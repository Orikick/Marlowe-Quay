import { PROPERTY_TYPES } from '../../../data/filterOptions.js';
import ChoiceGroup from '../../ui/ChoiceGroup/ChoiceGroup.jsx';

// Multi-select of property types. An empty selection means "any type".
export default function TypeFilter({ value, onChange }) {
  return (
    <ChoiceGroup
      legend="Property type"
      type="checkbox"
      options={PROPERTY_TYPES}
      value={value}
      onChange={onChange}
    />
  );
}
