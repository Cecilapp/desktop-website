/**
 * The Pro sites of a license: the sites the Pro features apply to, chosen in the app.
 *
 * A license has a number of slots (its base Pro sites, plus those of its packs). Assigning a site
 * takes a free slot; releasing it frees the slot only 30 days later (LICENSE_RELEASE_DAYS), so that
 * the slots can't rotate between many sites. A released site can be assigned again during these
 * 30 days: it takes back its own slot.
 *
 * When a license has fewer slots than assigned sites (a pack ended), the sites assigned first stay
 * Pro, the others are `inactive` until a slot is freed or a pack is added: nothing is deleted.
 *
 * A site is identified by the app (an id stable across the computers of its manager, e.g. a UUID
 * in the site), with a label to show it. The state of a license is stored in Netlify Blobs, as
 * `{ sites: [{ id, label, assigned_at }], released: [{ id, label, released_at }] }`.
 */

import { getStore } from '@netlify/blobs';

const DAY = 86400000;

const releaseDays = () => Number(process.env.LICENSE_RELEASE_DAYS || 30);

const empty = () => ({ sites: [], released: [] });

let factory = () => getStore({ name: 'pro-sites', consistency: 'strong' });

/** Replaces the store (tests): an object with `getWithMetadata` and `setJSON`, like Netlify Blobs. */
export function useStore(store) {
  factory = () => store;
}

/** The stored state of a license, without the releases whose 30 days are over. */
export async function load(license, now = new Date()) {
  const entry = await factory().getWithMetadata(key(license), { type: 'json' });

  return prune(entry?.data ?? empty(), now);
}

/**
 * Changes the state of a license with `change(state)`, which returns the new state, or throws a
 * SlotError. Retries when another request changed it meanwhile (conditional writes).
 */
export async function update(license, change, now = new Date()) {
  const store = factory();
  for (let attempt = 0; attempt < 3; attempt++) {
    const entry = await store.getWithMetadata(key(license), { type: 'json' });
    const state = change(prune(entry?.data ?? empty(), now));
    const result = await store.setJSON(key(license), state, entry ? { onlyIfMatch: entry.etag } : { onlyIfNew: true });
    if (result?.modified !== false) {
      return state;
    }
  }
  throw new Error('The Pro sites of the license changed too often, try again');
}

export class SlotError extends Error {
  constructor(availableAt) {
    super('no_slot');
    this.availableAt = availableAt;
  }
}

/** Assigns a site, if it is already assigned, was just released, or a slot is free. */
export function assign(state, site, label, slots, now = new Date()) {
  const assigned = state.sites.find((s) => s.id === site);
  if (assigned) {
    return { ...state, sites: state.sites.map((s) => (s.id === site ? { ...s, label } : s)) };
  }
  const released = state.released.find((s) => s.id === site);
  if (released) {
    return {
      sites: [...state.sites, { id: site, label, assigned_at: now.toISOString() }],
      released: state.released.filter((s) => s.id !== site),
    };
  }
  if (state.sites.length + state.released.length >= slots) {
    throw new SlotError(nextSlot(state, slots));
  }

  return { ...state, sites: [...state.sites, { id: site, label, assigned_at: now.toISOString() }] };
}

/** Releases a site: its slot is free again 30 days later. */
export function release(state, site, now = new Date()) {
  const assigned = state.sites.find((s) => s.id === site);
  if (!assigned) {
    return state;
  }

  return {
    sites: state.sites.filter((s) => s.id !== site),
    released: [...state.released, { id: site, label: assigned.label, released_at: now.toISOString() }],
  };
}

/** What the token says about the Pro sites of a license with `slots` slots. */
export function view(state, slots) {
  const sites = [...state.sites].sort((a, b) => a.assigned_at.localeCompare(b.assigned_at));
  const site = ({ id, label }) => ({ id, label });

  return {
    pro_sites: sites.slice(0, slots).map(site),
    inactive_sites: sites.slice(slots).map(site),
    released_sites: state.released.map((s) => ({ ...site(s), available_at: availableAt(s).toISOString() })),
    free_slots: Math.max(0, slots - state.sites.length - state.released.length),
  };
}

/** When a slot is free again, if releases are what keeps them all taken. */
function nextSlot(state, slots) {
  if (state.sites.length >= slots || state.released.length === 0) {
    return null;
  }
  // the releases ending first free the slots first
  const ends = state.released.map(availableAt).sort((a, b) => a - b);

  return ends[state.sites.length + state.released.length - slots].toISOString();
}

function availableAt(released) {
  return new Date(new Date(released.released_at).getTime() + releaseDays() * DAY);
}

function prune(state, now) {
  return {
    sites: state.sites ?? [],
    released: (state.released ?? []).filter((s) => availableAt(s) > now),
  };
}

function key(license) {
  return `licenses/${license}`;
}
