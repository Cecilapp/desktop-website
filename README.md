# Cecil Desktop website

One-page website of [Cecil Desktop](https://github.com/Cecilapp/Desktop), built with [Cecil](https://cecil.app) and [Tailwind CSS](https://tailwindcss.com) (compiled by [tailwind-builder](https://github.com/ArnaudLigny/tailwind-builder)).

## Content

- `data/home.yml` (English) and `data/home.fr.yml` (French): all the page content (hero, features, pricing, FAQ)
- `translations/messages.fr.yaml`: UI strings of the templates (navigation, buttons, footer)
- `cecil.yml`: site options, including the download URL and version (`download`)
- `assets/images/screenshots/`: app screenshots

## Netlify

The site is built by Netlify with the [Cecil build script](https://cecil.app/build.sh) (see `netlify.toml`): it downloads Cecil, runs `composer install` (which compiles the CSS) then builds the site.

The [netlify](https://github.com/Cecilapp/theme-netlify) theme component (installed in `themes/` by `composer install`) generates the `_redirects` and `_headers` files; redirects are defined under `netlify.redirects` in `cecil.yml` (e.g. `/download/*` to the installers on Cloudflare R2).

### Feedback of the beta testers

`netlify/functions/feedback.mjs` (`POST /api/feedback`) receives the feedback sent from the app (Help › Send feedback) and creates an issue in the private repository of the app, labelled `beta` and `bug` / `enhancement` / `question`. Environment variables of the Netlify site:

- `GITHUB_TOKEN`: fine-grained token, repository `Cecilapp/Desktop` only, permission "Issues: Read and write" (it expires: renew it)
- `FEEDBACK_REPO` (optional): `Cecilapp/Desktop` by default

Requests are rate limited (5 per minute and IP, `config.rateLimit`); the app's User-Agent (`Cecil Desktop/…`) is required.

## Development

Requirements: PHP 8.3+ and Composer.

```bash
composer install
curl -LO https://cecil.app/cecil.phar
```

Compile the CSS and preview the site (in two terminals):

```bash
composer css:watch   # assets/tailwind.css → assets/styles.css
composer serve       # http://localhost:8000
```

## Build

```bash
composer build       # minified CSS + optimized site in _site/
```

## License

[EUPL-1.2](LICENSE)
