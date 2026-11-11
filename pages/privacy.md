---
title: Privacy policy
description: What Cecil Desktop sends, to whom, and what stays on your computer.
---
# Privacy policy

<!-- TODO: date of the last update, once the text is final -->
_Last updated: TODO_

Cecil Desktop works on your computer: no account, no analytics, no tracking. This page lists everything the app sends over the Internet, and why.

Data controller: Aperture Lab, Arnaud Ligny. <!-- TODO: address, contact e-mail address -->

## What stays on your computer

- Your sites and their files.
- The data of the app (list of sites, history of builds and publications, settings), in a local database.
- The tokens of your publication accounts, encrypted with the keychain of the system.

## What the app sends

| When | What | To |
|------|------|----|
| You publish a site | The files of the site and the token of the account | The provider you chose (Netlify, Vercel, GitHub, Amazon S3…) |
| You install a theme | Requests for the theme | [Packagist](https://packagist.org) and the host of the theme (e.g. GitHub) |
| The app checks for updates | The requested files, your IP address | desktop.cecil.app ([Netlify](https://www.netlify.com), [Cloudflare R2](https://www.cloudflare.com)) |
| You activate, check or deactivate a license (Pro) | The license key, its activation id, the name of the computer and its system | desktop.cecil.app, then [Polar](https://polar.sh) |
| You send feedback (_Help › Send feedback_) | The title and the description, your e-mail address if you give it, the versions (app, Cecil, PHP), the system and the language; the logs only if you check them, shown before sending, with your home folder hidden | desktop.cecil.app, which files it in a private GitHub repository |

desktop.cecil.app keeps your IP address for a short time to limit the number of requests (protection against abuse); it keeps nothing else.

When you buy a license, Polar collects the data needed for the purchase (name, e-mail address, payment): see its [privacy policy](https://polar.sh/legal/privacy).

## This website

This website uses no cookies and no analytics. Its host, Netlify, keeps technical logs (IP address, pages requested).

## Processors

- [Netlify](https://www.netlify.com): hosting of this website and of its functions (license, feedback).
- [Cloudflare](https://www.cloudflare.com): storage of the installers and updates.
- [Polar](https://polar.sh): sale of the licenses.
- [GitHub](https://github.com): feedback.

## Retention

<!-- TODO: how long the feedback (GitHub issues) and the license data are kept -->
TODO

## Your rights

Under the GDPR, you can access, correct or delete your data, and object to its processing: write to <!-- TODO: contact e-mail address -->. You can also lodge a complaint with the [CNIL](https://www.cnil.fr).
