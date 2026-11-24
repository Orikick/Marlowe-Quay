import { getAgent } from '../services/api.js';
import { useFetch } from './useFetch.js';

// One agent and their listings: data is { agent, properties }.
// An unknown agent rejects with error.status === 404.
export function useAgent(id) {
  return useFetch(({ attempt }) => getAgent(id, { attempt }), [id]);
}
