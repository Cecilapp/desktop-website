# Cecil Desktop website

Website and documentation of [Cecil Desktop](https://github.com/Cecilapp/Desktop), built with [Cecil](https://cecil.app) and [Tailwind CSS](https://tailwindcss.com) (compiled by [tailwind-builder](https://github.com/ArnaudLigny/tailwind-builder)).

## Content

- `pages/index.md` (English) and `pages/index.fr.md` (French): all the homepage content, in the front matter of the page, in the order of its sections (`layouts/index.html.twig`, which reads it with `page.<section>`), so it can be edited with the front matter form of Cecil Desktop
- `schemas/index.yml`: the schema of this front matter (types, required variables, labels, icon names…), checked at build time and shown as a form by Cecil Desktop
- `translations/messages.fr.yaml`: UI strings of the templates (navigation, buttons, footer)
- `cecil.yml`: site options, including the download URL and version (`download`)
- `assets/images/screenshots/`: app screenshots
- `pages/docs/`: the documentation (`/docs/`), rendered with the [Docs](https://github.com/Cecilapp/theme-docs) and [FlexSearch](https://github.com/Cecilapp/theme-flexsearch) themes, styled with the brand colors by `assets/tailwind-docs.css`; a feature of the homepage links to its page with `docs` (a page ID, e.g. `docs/content`)
- `pages/docs/12-changelog.md`: the changelog (`/docs/changelog/`, layout `layouts/changelog.html.twig`), from the notes of the published releases of the app: its `release.yml` workflow exports them as `releases.json` next to the update files (`download.manifests`), then builds the site again. Each version has an anchor (`#v1.2.3`), opened by **Help › What's New** in the app

To test the changelog locally, serve a `releases.json` (`[{version, date, body}]`, newest first) and point the build at it: `CECIL_DOWNLOAD_MANIFESTS=http://127.0.0.1:8099/ php cecil.phar build`.

## Netlify

The site is built by Netlify with the [Cecil build script](https://cecil.app/build.sh) (see `netlify.toml`): it downloads Cecil, runs `composer install` (which compiles the CSS) then builds the site.

The [netlify](https://github.com/Cecilapp/theme-netlify) theme component (installed in `themes/` by `composer install`) generates the `_redirects` and `_headers` files; redirects are defined under `netlify.redirects` in `cecil.yml` (e.g. `/download/*` to the installers on Cloudflare R2).

### Functions

The Netlify functions (`netlify/functions/`) are documented in [docs/README.md](docs/README.md):

- [Feedback of the beta testers](docs/README.md#feedback-of-the-beta-testers) (`POST /api/feedback`)
- [Licenses of Cecil Desktop Pro](docs/README.md#licenses-of-cecil-desktop-pro) (`POST /api/license/…`)

## Development

Requirements: PHP 8.3+ and Composer.

```bash
composer install
curl -LO https://cecil.app/cecil.phar
```

Compile the CSS and preview the site (in two terminals):

```bash
composer css:watch       # assets/tailwind.css → assets/site.css (homepage)
composer css:watch:docs  # assets/tailwind-docs.css → assets/styles.css (documentation, Docs theme)
composer serve           # http://localhost:8000
```

## Build

```bash
composer build  # minified CSS + optimized site in _site/
```

## License

[EUPL-1.2](LICENSE)
