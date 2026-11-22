/**
 * Licenses of Cecil Desktop Pro, sold with Polar (App\Support\License in the app).
 *
 * The app never calls Polar itself: this function activates, validates and deactivates its key
 * with Polar's public license API, and answers with a token signed with Ed25519, which the app
 * verifies with the public key it embeds. So the provider can change without updating the apps,
 * and the app can trust the token offline (a modified database does not make a license).
 *
 * Pro is a yearly subscription: Polar grants its key while the subscription is active, and revokes
 * it when the subscription ends (its public API then answers 404, like for a refunded key). So a
 * key Polar validates is a valid license, and the token says until when the app can trust it
 * offline: `valid_until`, never after the end of a subscription that will not renew.
 *
 * The public license API does not say which subscription a key belongs to: with an access token,
 * the subscription of the customer whose product grants the key's benefit gives its renewal date
 * (`renews_at`) or its end (`ends_at`). Without it, or if Polar cannot be reached, the token has no
 * dates, and the license stays valid: Polar's answer on the key is what makes it valid.
 *
 * More Pro sites are sold as packs: a yearly subscription to a pack product, without a license key,
 * which adds LICENSE_PACK_SITES sites to the license of the same customer while it is live. A
 * customer can hold several packs (one subscription each). Counting them needs the access token:
 * without it, a license has its base number of Pro sites. A token is not trusted offline after the
 * end of a canceled pack, so that its sites are counted again.
 *
 * Environment:
 * - POLAR_ORGANIZATION_ID: the organization selling the licenses;
 * - LICENSE_SIGNING_KEY: the Ed25519 private key, its 32 bytes seed in base64 (`php artisan license:keygen` in the app);
 * - POLAR_ACCESS_TOKEN (optional): an organization access token with the `subscriptions:read` scope, for the dates of the subscription;
 * - POLAR_API (optional): https://sandbox-api.polar.sh for the sandbox;
 * - POLAR_BENEFIT_IDS (optional): the license key benefits accepted, separated by commas (default: any of the organization);
 * - LICENSE_OFFLINE_DAYS (optional): how long a token can be trusted without checking the key again, 30 by default;
 * - LICENSE_PRO_SITES (optional): the number of Pro sites of a license, 5 by default;
 * - POLAR_PACK_PRODUCT_IDS (optional): the products of the packs of Pro sites, separated by commas;
 * - LICENSE_PACK_SITES (optional): the number of Pro sites a pack adds, 5 by default.
 */

import { createPrivateKey, sign } from 'node:crypto';

const API = process.env.POLAR_API || 'https://api.polar.sh';

const LIMITS = { key: 100, id: 64, label: 100 };

/** The statuses of a subscription whose benefits are still granted. */
const LIVE = ['active', 'trialing', 'past_due'];

const DAY = 86400000;

export const config = {
  path: '/api/license/:action',
  rateLimit: {
    windowLimit: 20,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
};

export default async (request, context) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }
  // not a protection, keeps the bots of the web away
  if (!(request.headers.get('user-agent') ?? '').startsWith('Cecil Desktop/')) {
    return json({ error: 'Forbidden' }, 403);
  }
  const action = context.params?.action;
  if (!['activate', 'validate', 'deactivate'].includes(action)) {
    return json({ error: 'Not found' }, 404);
  }

  let input;
  try {
    input = validate(action, JSON.parse(await request.text()));
  } catch (error) {
    return json({ error: error instanceof SyntaxError ? 'Invalid JSON' : error.message }, 400);
  }

  try {
    return await ACTIONS[action](input);
  } catch (error) {
    console.error(error);

    return json({ error: 'The license server could not be reached' }, 502);
  }
};

const ACTIONS = {
  /** Activates the key on a machine: the token, or why Polar refused it. */
  async activate({ key, label }) {
    const response = await polar('activate', { key, label, meta: { app: 'Cecil Desktop' } });
    if (response.status === 404) {
      return json({ error: 'not_found' }, 422);
    }
    // revoked, disabled, or every activation used: Polar says which in `detail`
    if (response.status === 403) {
      const { detail } = await response.json().catch(() => ({}));
      const limit = /limit/i.test(String(detail ?? ''));

      return json({ error: limit ? 'activation_limit' : 'not_permitted' }, 422);
    }
    if (!response.ok) {
      throw new Error(`Polar activate: ${response.status} ${await response.text()}`);
    }
    const activation = await response.json();
    if (!benefitAccepted(activation.license_key.benefit_id)) {
      return json({ error: 'not_found' }, 422);
    }

    return json({ token: token(activation.license_key, activation.id, await account(activation.license_key)) });
  },

  /**
   * Validates the key of a machine: a new token, or a signed `invalid` one when Polar does
   * not know it anymore (subscription ended, refunded, revoked, disabled, or the activation was deleted).
   */
  async validate({ key, activation }) {
    const response = await polar('validate', { key, activation_id: activation });
    if (response.status === 404) {
      return json({ token: invalidToken(activation) });
    }
    if (!response.ok) {
      throw new Error(`Polar validate: ${response.status} ${await response.text()}`);
    }
    const license = await response.json();
    if (!benefitAccepted(license.benefit_id)) {
      return json({ token: invalidToken(activation) });
    }

    return json({ token: token(license, activation, await account(license)) });
  },

  /** Frees the activation of a machine. */
  async deactivate({ key, activation }) {
    const response = await polar('deactivate', { key, activation_id: activation });
    if (!response.ok && response.status !== 404) {
      throw new Error(`Polar deactivate: ${response.status} ${await response.text()}`);
    }

    return new Response(null, { status: 204 });
  },
};

/** The body sent by the app (App\Support\License). */
export function validate(action, input) {
  const string = (value, name, max) => {
    if (typeof value !== 'string' || value.trim() === '' || value.trim().length > max) {
      throw new Error(`The ${name} is invalid`);
    }

    return value.trim();
  };
  if (!input || typeof input !== 'object') {
    throw new Error('The request is invalid');
  }

  const key = string(input.key, 'key', LIMITS.key);

  return action === 'activate'
    ? { key, label: string(input.label, 'label', LIMITS.label) }
    : { key, activation: string(input.activation, 'activation', LIMITS.id) };
}

/**
 * The signed token of a key granted by Polar, with the dates of its subscription when known:
 * `renews_at` while it renews, `ends_at` once it is canceled (it stays granted until then), and
 * its Pro sites: the base ones, plus those of its live packs.
 */
export function token(license, activation, { subscription = null, packs = [] } = {}, now = new Date()) {
  const offline = Number(process.env.LICENSE_OFFLINE_DAYS || 30);
  const { renews, ends } = periods(subscription);
  // trusted offline for a while, but not after the end of a subscription or a pack that won't renew
  let until = new Date(now.getTime() + offline * DAY);
  for (const end of [ends, ...packs.map((pack) => periods(pack).ends)]) {
    if (end && end > now && end < until) {
      until = end;
    }
  }
  const sites = Number(process.env.LICENSE_PRO_SITES || 5) + packs.length * Number(process.env.LICENSE_PACK_SITES || 5);

  return signed({
    v: 2,
    status: 'granted',
    license: license.id,
    activation,
    key: license.display_key,
    email: license.customer?.email ?? null,
    name: license.customer?.name ?? null,
    subscribed_at: new Date(license.created_at).toISOString(),
    renews_at: renews?.toISOString() ?? null,
    ends_at: ends?.toISOString() ?? null,
    sites,
    packs: packs.length,
    valid_until: until.toISOString(),
    issued_at: now.toISOString(),
  });
}

export function invalidToken(activation, now = new Date()) {
  return signed({ v: 2, status: 'invalid', activation, issued_at: now.toISOString() });
}

/** When a subscription renews, or ends if it was canceled. */
export function periods(subscription) {
  if (!subscription) {
    return { renews: null, ends: null };
  }
  const date = (value) => (value ? new Date(value) : null);
  const end = date(subscription.ends_at) ?? (subscription.cancel_at_period_end ? date(subscription.current_period_end) : null);

  return end ? { renews: null, ends: end } : { renews: date(subscription.current_period_end), ends: null };
}

/**
 * The live subscriptions of the key's customer: the one of the license, preferably the one whose
 * product grants the key's benefit, and the packs of Pro sites. Nothing without an access token,
 * or when Polar cannot say.
 */
export async function account(license) {
  const token = process.env.POLAR_ACCESS_TOKEN;
  if (!token || !license?.customer_id) {
    return {};
  }
  try {
    const url = new URL(`${API}/v1/subscriptions/`);
    url.search = new URLSearchParams({
      organization_id: process.env.POLAR_ORGANIZATION_ID ?? '',
      customer_id: license.customer_id,
      limit: '100',
    });
    const response = await fetch(url, {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}`, 'User-Agent': 'desktop.cecil.app' },
    });
    if (!response.ok) {
      throw new Error(`Polar subscriptions: ${response.status} ${await response.text()}`);
    }
    const { items = [] } = await response.json();

    return split(items, license.benefit_id);
  } catch (error) {
    // a bonus: the key validated by Polar is what makes the license, with its base Pro sites
    console.error(error);

    return {};
  }
}

/**
 * Splits the subscriptions of a customer: the live one granting the benefit (the latest first,
 * else any live one that is not a pack), and the live packs.
 */
export function split(subscriptions, benefit) {
  const products = (process.env.POLAR_PACK_PRODUCT_IDS ?? '').split(',').map((id) => id.trim()).filter(Boolean);
  const isPack = (s) => products.includes(s.product_id ?? s.product?.id);
  const live = subscriptions.filter((s) => LIVE.includes(s.status));
  const licenses = live.filter((s) => !isPack(s));
  const granting = licenses.filter((s) => (s.product?.benefits ?? []).some((b) => b.id === benefit));
  const latest = (a, b) => new Date(b.current_period_end ?? 0) - new Date(a.current_period_end ?? 0);

  return {
    subscription: (granting.length > 0 ? granting : licenses).sort(latest)[0] ?? null,
    packs: live.filter(isPack),
  };
}

/** base64url(JSON) + '.' + base64url(Ed25519 signature of the first part). */
export function signed(payload, seed = process.env.LICENSE_SIGNING_KEY) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = sign(null, Buffer.from(body), privateKey(seed));

  return `${body}.${signature.toString('base64url')}`;
}

/** The private key from its seed: PKCS#8 header of an Ed25519 key, then the 32 bytes. */
function privateKey(seed) {
  const bytes = Buffer.from(seed ?? '', 'base64');
  if (bytes.length !== 32) {
    throw new Error('LICENSE_SIGNING_KEY must be a 32 bytes seed, in base64');
  }

  return createPrivateKey({
    key: Buffer.concat([Buffer.from('302e020100300506032b657004220420', 'hex'), bytes]),
    format: 'der',
    type: 'pkcs8',
  });
}

function benefitAccepted(benefit) {
  const accepted = (process.env.POLAR_BENEFIT_IDS ?? '').split(',').map((id) => id.trim()).filter(Boolean);

  return accepted.length === 0 || accepted.includes(benefit);
}

/** Polar's public license API: no token, the organization identifies the keys. */
function polar(action, body) {
  return fetch(`${API}/v1/customer-portal/license-keys/${action}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'User-Agent': 'desktop.cecil.app' },
    body: JSON.stringify({ ...body, organization_id: process.env.POLAR_ORGANIZATION_ID }),
  });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
