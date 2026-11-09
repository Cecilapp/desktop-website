# Cecil Desktop website

One-page website of [Cecil Desktop](https://github.com/Cecilapp/Desktop), built with [Cecil](https://cecil.app) and [Tailwind CSS](https://tailwindcss.com) (compiled by [tailwind-builder](https://github.com/ArnaudLigny/tailwind-builder)).

## Content

- `data/home.yml` (English) and `data/home.fr.yml` (French): all the page content (hero, features, pricing, FAQ)
- `translations/messages.fr.yaml`: UI strings of the templates (navigation, buttons, footer)
- `cecil.yml`: site options, including the download URL and version (`download`)
- `assets/images/screenshots/`: app screenshots
- `pages/docs/`: the documentation (`/docs/`), rendered with the [Docs](https://github.com/Cecilapp/theme-docs) and [FlexSearch](https://github.com/Cecilapp/theme-flexsearch) themes, styled with the brand colors by `assets/tailwind-docs.css`

## Netlify

The site is built by Netlify with the [Cecil build script](https://cecil.app/build.sh) (see `netlify.toml`): it downloads Cecil, runs `composer install` (which compiles the CSS) then builds the site.

The [netlify](https://github.com/Cecilapp/theme-netlify) theme component (installed in `themes/` by `composer install`) generates the `_redirects` and `_headers` files; redirects are defined under `netlify.redirects` in `cecil.yml` (e.g. `/download/*` to the installers on Cloudflare R2).

### Feedback of the beta testers

`netlify/functions/feedback.mjs` (`POST /api/feedback`) receives the feedback sent from the app (Help › Send feedback) and creates an issue in the private repository of the app, labelled `beta` and `bug` / `enhancement` / `question`. Environment variables of the Netlify site:

- `GITHUB_TOKEN`: fine-grained token, repository `Cecilapp/Desktop` only, permission "Issues: Read and write" (it expires: renew it)
- `FEEDBACK_REPO` (optional): `Cecilapp/Desktop` by default

Requests are rate limited (5 per minute and IP, `config.rateLimit`); the app's User-Agent (`Cecil Desktop/…`) is required.

### Licenses of Cecil Desktop Pro

`netlify/functions/license.mjs` (`POST /api/license/{activate,validate,deactivate}`) activates, validates and deactivates the license keys sold with [Polar](https://polar.sh) (its public license API, no API token), and answers with a token signed with Ed25519, verified by the app (`App\Support\LicenseToken`). A key Polar does not know anymore (refunded, revoked, machine deactivated) gives a signed `invalid` token. Polar's keys do not expire: the updates a license covers are counted here from the purchase. See `docs/spikes/licensing.md` of the app. Environment variables of the Netlify site:

- `POLAR_ORGANIZATION_ID`: the organization selling the licenses
- `LICENSE_SIGNING_KEY`: the private key, its 32 bytes seed in base64 (`php artisan license:keygen` in the app, whose public key goes into its `config/license.php`): keep it secret
- `POLAR_API` (optional): `https://sandbox-api.polar.sh` to test with Polar's sandbox
- `POLAR_BENEFIT_IDS` (optional): the license key benefits accepted, separated by commas (default: any of the organization)
- `LICENSE_UPDATES_DAYS` (optional): how long the updates are covered after the purchase, 365 by default

Requests are rate limited (20 per minute and IP) and require the app's User-Agent.

## Development

Requirements: PHP 8.3+ and Composer.

```bash
composer install
curl -LO https://cecil.app/cecil.phar
```

Compile the CSS and preview the site (in two terminals):

```bash
composer css:watch        # assets/tailwind.css → assets/site.css (homepage)
composer css:watch:docs   # assets/tailwind-docs.css → assets/styles.css (documentation, Docs theme)
composer serve       # http://localhost:8000
```

## Build

```bash
composer build       # minified CSS + optimized site in _site/
```

## License

[EUPL-1.2](LICENSE)
