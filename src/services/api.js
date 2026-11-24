// Mock API over the local JSON files.
// Every call is asynchronous and can fail, so the UI has real loading and error states.
//
// Demo switches:
//   ?fail=1 in the URL            -> loading fails until you press "Try again"
//   email ending @example.invalid -> the contact form request fails
//
// `attempt` counts retries (0 = first load), so forced failures stay predictable
// even when React runs effects twice in development.

const LATENCY_MS = 250;
const SUBMIT_LATENCY_MS = 900;

export class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function shouldFail(attempt) {
  return attempt === 0 && new URLSearchParams(window.location.search).get('fail') === '1';
}

let propertiesPromise;
let agentsPromise;

function loadProperties() {
  propertiesPromise ??= import('../data/properties.json').then((module) => module.default);
  return propertiesPromise;
}

function loadAgents() {
  agentsPromise ??= import('../data/agents.json').then((module) => module.default);
  return agentsPromise;
}

export async function getProperties({ attempt = 0 } = {}) {
  await wait(LATENCY_MS);
  if (shouldFail(attempt)) {
    throw new ApiError('The listings could not be loaded. Check your connection and try again.');
  }
  return loadProperties();
}

export async function getProperty(id, { attempt = 0 } = {}) {
  await wait(LATENCY_MS);
  if (shouldFail(attempt)) {
    throw new ApiError('This home could not be loaded. Check your connection and try again.');
  }

  const [properties, agents] = await Promise.all([loadProperties(), loadAgents()]);
  const property = properties.find((item) => item.id === id);
  if (!property) {
    throw new ApiError('This home is no longer listed.', 404);
  }

  const agent = agents.find((item) => item.id === property.agentId) ?? null;
  return { property, agent };
}

// One agent and every home they are selling: data is { agent, properties }.
export async function getAgent(id, { attempt = 0 } = {}) {
  await wait(LATENCY_MS);
  if (shouldFail(attempt)) {
    throw new ApiError("This agent's profile could not be loaded. Check your connection and try again.");
  }

  const [properties, agents] = await Promise.all([loadProperties(), loadAgents()]);
  const agent = agents.find((item) => item.id === id);
  if (!agent) {
    throw new ApiError('This agent is not part of our team.', 404);
  }

  return { agent, properties: properties.filter((item) => item.agentId === id) };
}

export async function sendEnquiry({ propertyId, name, email, phone, message }) {
  await wait(SUBMIT_LATENCY_MS);

  if (!propertyId || !name || !email || !message) {
    throw new ApiError('The enquiry is missing required details.', 400);
  }
  if (email.trim().toLowerCase().endsWith('@example.invalid')) {
    throw new ApiError('The enquiry could not be sent. Try again in a moment, or call the agent.');
  }

  // A real backend would store the enquiry (including the optional phone number) here.
  void phone;
  const reference = `MQ-${Date.now().toString().slice(-6)}`;
  return { ok: true, reference };
}
