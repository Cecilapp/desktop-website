---
title: Writing mode
description: Hand a site to a writer: the Writing and Management modes, and the profile of the site (.cecil-desktop.yml).
---
# Writing mode

A site can be shown in 2 modes:

- **Management**, the default: everything Cecil Desktop does, for whoever creates and sets up the site (configuration, theme, structure of the pages, publishing targets, builds and diagnoses);
- **Writing**, for whoever writes its content: the pages, the images and files, the preview, and publishing. Everything technical is left out of the interface.

The same person can switch from one to the other, e.g. to see the site as a writer will. And the manager of a site can **open it in Writing mode for everyone**, to hand it to a client or to a team, with a profile saved in the site.

:::warning
The Writing mode is a mode of the interface, **not a security feature**: the files of the site belong to whoever has them on their disk, and anyone can switch to the Management mode on their computer, or edit the files with another tool. Use it to make writing simpler, not to protect a site.
:::

## Switch mode

Use **View › Switch to Writing mode** (or **Switch to Management mode**), or the command palette (`Ctrl/⌘+K`). The choice only applies to this site, on this computer: nothing is written in the site.

In Writing mode, a **Writing** badge is shown next to the name of the site, in the title bar: click it to go back to the Management mode.

## What the writer sees

In Writing mode, the sidebar of the site has 4 sections:

- **Home**, instead of the Overview: the latest pages, filtered by **All**, **Drafts** or **To publish** (the pages changed since your last publication from this computer), with **New page**, **Check my pages** (the front matter of every page, checked like Cecil does), **View the site** and **Publish**;
- **Content**: the [editor](content.md), with the pages of the sections the writer can edit only. A new page is created from a title, in one of these sections, from the model of the section (`models/`). The front matter is a form, the [pages schema](content.md#pages-schema) of the site included; the other variables (YAML) are shown folded, and kept as they are;
- **Media**: the images and the files of the site (see [Media](content.md#media)); imports go into the folders of the profile;
- **Publishing**: the targets shared by the profile of the site (see [below](#shared-targets)).

The **Themes** and **Configuration** sections, the builds, the diagnoses and the logs of the builds are not shown. The toolbar keeps **Preview** and **Publish**, the **Output** panel the logs of the preview and of the publications, and the status bar shows the number of pages to publish.

## Hand a site to a writer

The manager describes what the writers can do in **Configuration › Writing**, then versions the site with them (Git, a synchronized folder…):

1. Open the site in Management mode, then **Configuration** (`Ctrl/⌘+6`) › **Writing**.
2. Check **Open this site in Writing mode**: it applies to anyone who opens the folder; you stay in Management mode on this computer.
3. Fill in the **Manager**: your name, shown to the writers for what stays out of their reach (“managed by …”).
4. Choose the **Editable sections**, whether writers can **Create and duplicate pages** and **Rename, move and delete pages**, the folders of the **Media**, whether to **Allow publishing**, and the **Shared targets** <span class="tag">Pro</span>.
5. Click **Save**: the profile is written in `.cecil-desktop.yml`, at the root of the site.

**Try the Writing mode** shows the site as a writer will see it, with this profile.

When a writer opens the site, it opens in Writing mode, introduced once by a window that says what they can do and who manages the site. If they switch to the Management mode, Cecil Desktop asks for a confirmation first (the configuration and the theme change the whole site), and a band reminds them that they are not in the mode of the site, with **Back to Writing**.

## The profile of the site

`.cecil-desktop.yml` is a YAML file at the root of the site, next to `cecil.yml`. Cecil doesn't publish the files of the root of a site: the profile has no effect on the generated site. It is written by **Configuration › Writing**, and can be written by hand too.

```yaml
mode: writing          # opens the site in Writing mode (default: Management)
contact: Camille Roux  # the manager of the site, shown to the writers
writing:
  sections: [blog, events]  # sections the writers can edit (/ for the pages at the root of pages/); default: all of them
  pages:
    create: true       # create and duplicate pages, from the model of their section (default: true)
    delete: false      # rename, move and delete pages (default: false)
  images: assets/images     # folder of the imported images, in assets/ or static/ (default: assets/images)
  files: static/documents   # folder of the imported files, in static/ (default: static)
  publish: true        # allow publishing (default: true)
targets:               # publishing targets shared with the writers, without any token
  - name: Production
    provider: netlify  # netlify, vercel, github or s3
    site: my-site      # the settings of the provider
```

Every key is optional: `mode: writing` alone opens the site in Writing mode, with all its sections. An invalid value (unknown section, folder outside of the site, unknown provider, incomplete target…) is ignored with a warning: shown in **Configuration › Writing** and above the screens in Management mode. A file that can't be read leaves the site in Management mode, with the error.

**Configuration › Writing** only rewrites the entries you changed: the comments and the rest of the file are kept.

:::tip
Version `.cecil-desktop.yml` with the site, so that your writers get it. It never contains a token: a target describes the provider and its settings, and each writer connects their own account.
:::

## Shared targets

The targets of the profile are listed in the **Publishing** section of the writers, with a **Shared** badge: they can publish to them, but not add, edit or delete a target.

The first time, a writer clicks **Connect my account…** on the target: they choose one of their accounts of the provider, or add one (see [Accounts](publishing/index.md#accounts)). It must have access to the site at the provider: it is checked, then encrypted with the system keychain, like any account.

To share a target, the manager adds it in **Publishing**, then checks it in the **Shared targets** of **Configuration › Writing**. A shared target is changed there, not in **Publishing**.

## Free version and Pro

- The **Writing mode is free**, including the form of the [pages schema](content.md#pages-schema) for the writer.
- A site opened in Writing mode by its profile **doesn't count** in the 1 site of the free version: a freelance writer working for several clients stays free. Switching such a site to the Management mode applies the limit.
- Opening a site in Writing mode (`mode`), the manager and the folders of the media are free. Choosing the **editable sections**, the **rights on the pages** and the **shared targets** in **Configuration › Writing** is part of [Cecil Desktop Pro](pro.md), for the manager. A writer always applies the profile, whatever their license.

:::info
During the beta, every feature is available without a license.
:::
