---
title: Crédits
description: Les personnes et les projets open source derrière Cecil Desktop.
---
# Crédits

Cecil Desktop est conçu et développé par [Arnaud Ligny](https://arnaudligny.fr) ([Aperture Lab](https://aperturelab.fr)), le créateur de [Cecil](https://cecil.app), avec l'aide de [Claude Code](https://claude.com/product/claude-code).

L'application repose sur de nombreux projets open source : merci à leurs auteurs et contributeurs.

## L'application

| Projet | Rôle |
|--------|------|
| [Cecil](https://cecil.app) | Le générateur de sites statiques au cœur de l'application : build, aperçu, diagnostic et thèmes. |
| [PHP](https://www.php.net) | Le langage de l'application, embarqué : il n'y a rien à installer. |
| [NativePHP](https://nativephp.com) | Transforme l'application PHP en application desktop native (fenêtres, menus, notifications, mises à jour). |
| [Electron](https://www.electronjs.org) | Le moteur desktop utilisé par NativePHP, avec [electron-builder](https://www.electron.build) pour les installeurs et les mises à jour. |
| [Laravel](https://laravel.com) | Le framework PHP de l'application. |
| [Livewire](https://livewire.laravel.com) | L'interface réactive, écrite en PHP. |
| [Flux](https://fluxui.dev) | Les composants de l'interface. |
| [Tailwind CSS](https://tailwindcss.com) | Les styles de l'interface. |
| [Heroicons](https://heroicons.com) | Les icônes. |
| [CodeMirror](https://codemirror.net) | L'éditeur Markdown et YAML. |
| [Vite](https://vite.dev) | L'outil de build du front-end. |
| [SQLite](https://sqlite.org) | La base de données locale (sites, historique). |
| [AWS SDK for PHP](https://aws.amazon.com/sdk-for-php/) | La publication sur Amazon S3. |
| [Composer](https://getcomposer.org) | Les dépendances PHP, et les thèmes depuis [Packagist](https://packagist.org). |

## Ce site

| Projet | Rôle |
|--------|------|
| [Cecil](https://cecil.app) | Bien sûr, ce site est généré avec Cecil, et son thème [Docs](https://github.com/Cecilapp/theme-docs) pour la documentation. |
| [Tailwind CSS](https://tailwindcss.com) | Les styles. |
| [FlexSearch](https://github.com/nextapps-de/flexsearch) | La recherche dans la documentation. |
| [Netlify](https://www.netlify.com) | L'hébergement. |
| [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/) | Le téléchargement des installeurs. |

## Licences

Chaque projet est distribué sous sa propre licence : consultez leur site pour plus d'informations. Cecil est distribué sous [licence publique de l'Union européenne (EUPL) v1.2](https://github.com/Cecilapp/Cecil/blob/main/LICENSE).
