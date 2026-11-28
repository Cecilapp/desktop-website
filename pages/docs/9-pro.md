---
title: Cecil Desktop Pro
description: What Cecil Desktop Pro adds, how to choose your Pro sites, and how to activate, check, move and renew your license.
---
# Cecil Desktop Pro

Cecil Desktop is free, for all your sites. **Cecil Desktop Pro** adds features for the freelancers and agencies managing the sites of their clients, and supports the development of Cecil.

:::info
During the beta, every feature is available without a license.
:::

## Free version and Pro

| | Free | Pro |
|-|------|-----|
| Sites | Unlimited | Unlimited, including 5 [Pro sites](#pro-sites) (+5 per pack) |
| Publishing targets per site | 1 | Several on the Pro sites (production, staging…) |
| Build, preview, content editing, media, themes | ✓ | ✓ |
| Diagnoses: configuration, front matter, cache | ✓ | ✓ |
| [Diagnoses: SEO and links](build-preview-diagnosis.md#diagnosis) | | Pro sites |
| [Form of the pages schema](content.md#pages-schema) | In Writing mode | Pro sites |
| [Git sync](git.md): opening a site from its repository, state, Fetch and Send, resolution of conflicts | ✓ | ✓ |
| [Writing mode](writing-mode.md), opening a site in Writing mode for everyone | ✓ | ✓ |
| [Writing profile](writing-mode.md#hand-a-site-to-a-writer): editable sections, rights on the pages, shared targets | | Pro sites |

The Pro features are shown in the app with a **Pro** badge. Without a license, or on a site that is not a Pro site, nothing you already have is taken away: your sites and targets stay usable, only adding more is limited.

## Pro sites

A Pro license gives **5 Pro sites**: the Pro features apply to them, and your other sites keep the features of the free version. You choose your Pro sites in the app, and can change them: a freed slot can be given to another site **30 days** later.

- **Make a site a Pro site**: open the site, then **Site › Pro site…** (in Management mode, also in the command palette) and click **Make this site a Pro site**. When a Pro feature is asked on a site that is not Pro, its dialog offers it too. The Pro sites have a **Pro** badge on the Sites screen.
- **Release a site**: **Site › Pro site…**, or **Release** next to the site in **Preferences › License**, which lists the Pro sites of the license on all your computers, with the free slots. The slot is free again 30 days later; meanwhile, the released site can **take back its slot**.
- **Without a free slot**, the app tells when the next one is free, or offers to add a pack.
- If a pack ends, the sites chosen first stay Pro and the next ones become **inactive** (the features of the free version), until a slot is freed or a pack is added: nothing is deleted.

:::info
A site is identified by an `id` written in its profile, `.cecil-desktop.yml`, the first time it is made a Pro site (the file is created if needed). Commit this file with the site: the site is then the same Pro site on your other computers and in its clones.
:::

To manage more client sites with the Pro features, add **packs of 5 Pro sites**.

The writers of a Pro site benefit from its writing profile without a license: only the manager of the site needs Pro.

## Price

**59 € per year**, per user: a yearly subscription, with **all updates**, on **3 computers**. Each pack of 5 additional Pro sites costs **29 € per year**. Subscribe from the [pricing section](/#pricing) of the website, or from **Help › Cecil Desktop Pro…** in the app.

The subscription renews automatically every year, and can be cancelled anytime from the **Customer portal**. The payment is handled by [Polar](https://polar.sh), which sends the license key by email.

## Activate the license

1. Open **Preferences › License** (`Ctrl/⌘+,`).
2. Paste your **License key**, received by email after the purchase (it is also in the customer portal).
3. Click **Activate**: the key is checked online, then stored encrypted with the system keychain.

![The License preferences, to enter the license key](/images/screenshots/license.png "License preferences")

The license card then shows your name, the renewal date of the subscription, your Pro sites and this computer.

## Check and move the license

- The license is checked again in the background every week. Offline, it keeps working for **30 days**: after that, connect to the Internet and click **Check**.
- To move the license to another computer, click **Deactivate this computer** (it requires an Internet connection), then activate it on the other one.
- A copy installed from the [Microsoft Store](getting-started.md#from-the-microsoft-store) has its own data: activating the license there counts as another computer, even next to a copy installed with the installer.
- If the license is already active on 3 computers, deactivate one from the **Customer portal**, which also gives access to your keys, your subscription and your invoices.
- **Change the key** replaces the key, e.g. to use another license.

## End of the subscription

If you cancel the subscription, or if it is not renewed, the Pro features stay available until the end of the paid period.

After that, Cecil Desktop works like the free version, without taking anything away: your sites, your targets and your writing profiles stay usable, only adding more is limited. Subscribe again to get the Pro features back.

## Troubleshooting

| Message | What to do |
|---------|------------|
| *This license key is not valid.* | Check the key, as received by email. |
| *…maximum number of computers.* | Deactivate a computer from the customer portal. |
| *Cannot reach desktop.cecil.app.* | Check your Internet connection, then try again. |
| *License to be checked* | The license could not be checked for more than 30 days: connect to the Internet, then click **Check**. |
| *Invalid license* | The subscription ended, the license was refunded or revoked, or this computer was deactivated from the portal: subscribe again, enter another key, or activate it again. |
