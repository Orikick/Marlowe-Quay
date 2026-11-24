import { useLocation } from 'react-router-dom';

// Where a "Back" link should go: the page the visitor came from (passed as link state),
// or the listings page when they arrived directly.
export function useBackLink() {
  const { state } = useLocation();
  const from = typeof state?.from === 'string' && state.from.startsWith('/') ? state.from : null;

  if (!from) return { to: '/', label: 'All homes for sale' };
  if (from.startsWith('/favorites')) return { to: from, label: 'Back to saved homes' };
  if (from.startsWith('/property/')) return { to: from, label: 'Back to the home' };
  if (from.startsWith('/agents/')) return { to: from, label: "Back to the agent's homes" };
  return { to: from, label: 'Back to results' };
}
