import { getProperty } from '../services/api.js';
import { useFetch } from './useFetch.js';

// One property and its agent: data is { property, agent }.
// A missing property rejects with error.status === 404.
export function useProperty(id) {
  return useFetch(({ attempt }) => getProperty(id, { attempt }), [id]);
}
