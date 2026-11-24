import { createContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const STORAGE_KEY = 'marlowe-quay:favorites';

export const FavoritesContext = createContext(null);

// Saved property ids, newest first, persisted in localStorage.
export function FavoritesProvider({ children }) {
  const [stored, setStored] = useLocalStorage(STORAGE_KEY, []);

  // Guard against anything unexpected already sitting in storage.
  const ids = useMemo(
    () => (Array.isArray(stored) ? stored.filter((id) => typeof id === 'string') : []),
    [stored],
  );

  const toggleFavorite = useCallback(
    (id) => {
      setStored((current) => {
        const list = Array.isArray(current) ? current : [];
        return list.includes(id) ? list.filter((item) => item !== id) : [id, ...list];
      });
    },
    [setStored],
  );

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      isFavorite: (id) => ids.includes(id),
      toggleFavorite,
    }),
    [ids, toggleFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
