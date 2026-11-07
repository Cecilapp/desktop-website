/**
 * Licenses of Cecil Desktop Pro, sold with Polar (App\Support\License in the app).
 *
 * The app never calls Polar itself: this function activates, validates and deactivates its key
 * with Polar's public license API, and answers with a token signed with Ed25519, which the app
 * verifies with the public key it embeds. So the provider can change without updating the apps,
 * and the app can trust the token offline (a modified database does not make a license).
 *
 * Polar's keys do not expire (their public API answers 404 for an expired key, like for a revoked
 * one): the updates a license covers are counted here, from the date of the purchase.
 *
 * Environment:
 * - POLAR_ORGANIZATION_ID: the organization selling the licenses;
 * - LICENSE_SIGNING_KEY: the Ed25519 private key, its 32 bytes seed in base64 (`php artisan license:keygen` in the app);
 * - POLAR_API (optional): https://sandbox-api.polar.sh for the sandbox;
 * - POLAR_BENEFIT_IDS (optional): the license key benefits accepted, separated by commas (default: any of the organization);
 * - LICENSE_UPDATES_DAYS (optional): how long the updates are covered after the purchase, 365 by default.
 */

import { createPrivateKey, sign } from 'node:crypto';

const API = process.env.POLAR_API || 'https://api.polar.sh';

const LIMITS = { key: 100, id: 64, label: 100 };

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

    return json({ token: token(activation.license_key, activation.id) });
  },

  /**
   * Validates the key of a machine: a new token, or a signed `invalid` one when Polar does
   * not know it anymore (refunded, revoked, disabled, or the activation was deleted).
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

    return json({ token: token(license, activation) });
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

/** The signed token of a key granted by Polar. */
export function token(license, activation, now = new Date()) {
  const days = Number(process.env.LICENSE_UPDATES_DAYS || 365);
  const purchased = new Date(license.created_at);

  return signed({
    v: 1,
    status: 'granted',
    license: license.id,
    activation,
    key: license.display_key,
    email: license.customer?.email ?? null,
    name: license.customer?.name ?? null,
    purchased_at: purchased.toISOString(),
    updates_until: new Date(purchased.getTime() + days * 86400000).toISOString().slice(0, 10),
    issued_at: now.toISOString(),
  });
}

export function invalidToken(activation, now = new Date()) {
  return signed({ v: 1, status: 'invalid', activation, issued_at: now.toISOString() });
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
