import { getProperties } from '../services/api.js';
import { useFetch } from './useFetch.js';

// All properties. Returns { data, status, error, retry }.
export function useProperties() {
  return useFetch(({ attempt }) => getProperties({ attempt }), []);
}
