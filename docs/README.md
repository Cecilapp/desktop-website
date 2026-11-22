# Netlify functions

Serverless functions of the website, deployed by Netlify (see the [README](../README.md#netlify)).

## Feedback of the beta testers

`netlify/functions/feedback.mjs` (`POST /api/feedback`) receives the feedback sent from the app (Help › Send feedback) and creates an issue in the private repository of the app, labelled `beta` and `bug` / `enhancement` / `question`. Environment variables of the Netlify site:

- `GITHUB_TOKEN`: fine-grained token, repository `Cecilapp/Desktop` only, permission "Issues: Read and write" (it expires: renew it)
- `FEEDBACK_REPO` (optional): `Cecilapp/Desktop` by default

Requests are rate limited (5 per minute and IP, `config.rateLimit`); the app's User-Agent (`Cecil Desktop/…`) is required.

## Licenses of Cecil Desktop Pro

`netlify/functions/license.mjs` (`POST /api/license/{activate,validate,deactivate,assign,release}`) activates, validates and deactivates the license keys sold with [Polar](https://polar.sh) (its public license API, and optionally its subscriptions API), and answers with a token signed with Ed25519, verified by the app (`App\Support\LicenseToken`). Pro is a yearly subscription: Polar grants its key while the subscription is active and revokes it when it ends, so a key Polar does not know anymore (subscription ended, refunded, revoked, machine deactivated) gives a signed `invalid` token. A valid token (`v: 2`) says until when the app can trust it offline (`valid_until`, never after the end of a canceled subscription), when the subscription renews or ends (`renews_at`, `ends_at`, with an access token) and the number of Pro sites (`sites`): the base ones, plus those of the live packs (`packs`). A pack of Pro sites is a yearly subscription to a pack product (without license key) of the same customer, one subscription per pack; counting them needs the access token.

The app chooses the Pro sites of a license with `assign` (`{key, activation, site, label}`) and `release` (`{key, activation, site}`), `site` being an id stable across the computers of the manager. A released site frees its slot 30 days later (it can take it back meanwhile), and `assign` answers `no_slot` (with `available_at` when a release frees one) when every slot is taken. Every token lists `pro_sites`, `inactive_sites` (assigned beyond the slots, e.g. after a pack ended: the first assigned stay Pro), `released_sites` (with `available_at`) and `free_slots`. They are stored per license in the `pro-sites` store of [Netlify Blobs](https://docs.netlify.com/build/data-and-storage/netlify-blobs/) (`netlify/lib/pro-sites.mjs`, dependency in `package.json`). See `docs/spikes/licensing.md` of the app. Environment variables of the Netlify site:

- `POLAR_ORGANIZATION_ID`: the organization selling the licenses
- `LICENSE_SIGNING_KEY`: the private key, its 32 bytes seed in base64 (`php artisan license:keygen` in the app, whose public key goes into its `config/license.php`): keep it secret
- `POLAR_ACCESS_TOKEN` (optional): an organization access token with the `subscriptions:read` scope, for the renewal and end dates of the subscription: keep it secret
- `POLAR_API` (optional): `https://sandbox-api.polar.sh` to test with Polar's sandbox
- `POLAR_BENEFIT_IDS` (optional): the license key benefits accepted, separated by commas (default: any of the organization)
- `LICENSE_OFFLINE_DAYS` (optional): how long a token can be trusted without checking the key again, 30 by default
- `LICENSE_PRO_SITES` (optional): the number of Pro sites of a license, 5 by default
- `POLAR_PACK_PRODUCT_IDS` (optional): the products of the packs of Pro sites, separated by commas
- `LICENSE_PACK_SITES` (optional): the number of Pro sites a pack adds, 5 by default
- `LICENSE_RELEASE_DAYS` (optional): how long a released Pro site keeps its slot, 30 by default

Requests are rate limited (20 per minute and IP) and require the app's User-Agent.
