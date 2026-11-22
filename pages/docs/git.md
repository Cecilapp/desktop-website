---
title: Git sync
description: Open a site from its Git repository, fetch the changes of the others, send yours and resolve the conflicts, without Git on your computer.
weight: 8.5
---
# Git sync

When a site is a Git repository (GitHub, GitLab, Gitea, Codeberg…), Cecil Desktop keeps it in sync: **fetch** the changes of the others, **send** yours, and choose which version to keep when the same file was changed on both sides. Git doesn't need to be installed on the computer, and the app speaks of changes and versions, not of commits and branches.

The repository stays a standard Git repository: the manager of the site can keep using a terminal or a code editor on the same folder.

:::info
Git sync is free, in Management mode as in [Writing mode](writing-mode.md): opening a site from a repository, the state of the repository, **Fetch**, **Send** and the resolution of a merge.
:::

## Open a site from a Git repository

To work on a site that is in a repository, without it on your computer yet:

1. On the **Sites** screen, click **From a Git repository** (or **File › Open from a Git repository…**).
2. Enter the **Repository address**: an HTTPS address, or the SSH address of a repository on GitHub, GitLab, Bitbucket or Codeberg (the app uses its HTTPS equivalent).
3. Choose the **Account**: the account of the owner of the repository is suggested; **None (public repository)** for a public one. For a private repository, choose an account with write access to it, to send your changes later, or **Connect an account…** (see [Accounts](#accounts)).
4. Check the **Folder to put the site in** and the **Folder name** (the name of the repository by default).
5. Click **Download and open**.

The site is downloaded without its history, then opened like any other site: in [Writing mode](writing-mode.md) if its profile says so. A repository without a Cecil site at its root (no `cecil.yml`) is reported. If the download fails, what it wrote is deleted, so you can try again.

:::tip
To hand a site to a writer, send them the address of its repository: the profile of the site (`.cecil-desktop.yml`) comes with it.
:::

## State of the repository

The **status bar** shows the branch of the repository, the number of commits to send (↑) and to fetch (↓), and the number of changes made on this computer. The repository is read when you open a screen of the site and when the window gets the focus, and checked online every few minutes; a warning shows up when the site can't be synchronized, or when the check failed.

Click it to open the **Sync** tab of the **Output** panel: the files changed on this computer (added, modified or deleted), **Refresh**, the reason why the app doesn't synchronize the repository, if any, and the errors explained, with **Connect an account…** or **Replace token** when the account is the issue.

## Fetch the changes

To get the changes of the others, use the **Fetch** button of the toolbar, **Site › Fetch the changes** or the **Sync** tab. The button of the toolbar is **Send** when you have changes to send, and **Fetch** otherwise: the other action is in its menu.

- If your changes on this computer are on other files, they are kept as they are.
- If they are on the same files, they are saved first, then merged with the changes of the repository. If the same lines were changed on both sides, see [Conflicts](#conflicts).

If the page open in the editor has unsaved changes, the app asks you first. At the end, a message says how many files were updated (or that **The site is already up to date**), and the open page is reloaded if it was updated.

## Send my changes

To share your changes, use the **Send** button of the toolbar (with the number of changes to send), **Site › Send my changes…** or the **Sync** tab; in Writing mode, the home of the site also shows what is left to send.

The dialog lists the changed files, and suggests a **Description of the changes** from the titles of the pages, e.g. *Update “About”, add 2 media files*: the others will see it in the history of the site.

Click **Send**: your changes are saved, merged with what is waiting in the repository, then sent. If the repository changed while sending, send again.

:::info
The **Author of your changes** (a name and an email address) signs what you send. It comes from the repository if it sets one, otherwise from **Preferences › General**, otherwise from your Git configuration (`~/.gitconfig`). If none is found, the app asks for it once, and keeps it.
:::

## Conflicts

When a file was changed both on this computer and in the repository, a band says so, e.g. *Camille also changed 2 files you changed: choose which version to keep*. Nothing is lost: your changes are saved on this computer, and a **Merge in progress** is shown until you choose. The pages in conflict are marked in the tree of **Content**, and on the home of the site in Writing mode.

For each file, the dialog shows both versions side by side:

- **Keep my version**;
- **Take the one of Camille** (or **Take the one of the repository**);
- **Edit the page**: the editor shows the conflicting parts between `<<<<<<<` and `>>>>>>>` lines; keep the text you want, remove these lines, then click **Done**.

A file that is not text (an image…) can only keep one version or the other. When the last file is resolved, the merge is done and the **Send** dialog opens, so that the others get it.

**Cancel the merge** (after a confirmation) puts the files back to your version: the changes of the repository can be fetched later. Until the merge is done or cancelled, **Fetch** and **Send** wait, and it's better not to build or publish the site.

## Accounts

Sending changes needs an account with write access to the repository, and so does downloading a private repository. The token of the account is encrypted with the system keychain, and never written in the site.

- **GitHub**: the GitHub account used to [publish](publishing/github-pages.md) works too, with a token allowed to write the contents of the repository.
- **Other hosts** (GitLab, Gitea, Forgejo, Codeberg, Bitbucket…): add a **Git (HTTPS)** account in **Preferences › Accounts**, with the **Address of a repository**, your **Username** and a personal access token allowed to write to the repository (GitLab: `write_repository`; Bitbucket: an app password). The address of the repository checks the access, and gives the host of the account.

The account of a site is chosen among the accounts of the host of its repository, the one of the owner of the repository first. **Check** and **Replace token** work like for the [publishing accounts](publishing/index.md#accounts).

## Limits

Cecil Desktop is not a Git client: there are no branches to switch, no history to browse, no rebase. A repository in a state the app doesn't handle is reported, and left to Git:

- no remote repository (`origin`), or an address that is neither HTTPS nor SSH on a known host;
- not on a branch, or a Git operation in progress (rebase, cherry-pick…);
- a folder that is part of another repository (worktree or submodule);
- a repository that uses Git LFS.

The site must be at the root of its repository.
