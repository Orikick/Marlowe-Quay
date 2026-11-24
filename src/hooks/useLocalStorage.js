import { useEffect, useState } from 'react';

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    // Storage blocked (private mode) or corrupt JSON: start from the fallback.
    return fallback;
  }
}

// useState that persists to localStorage and stays in sync across browser tabs.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => read(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked: the value still works for this visit.
    }
  }, [key, value]);

  useEffect(() => {
    function handleStorage(event) {
      if (event.key === key) setValue(read(key, initialValue));
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue];
}
