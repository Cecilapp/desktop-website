---
title: SFTP
description: Publish a site to your own server (shared hosting, VPS) over SFTP, with a password or a private key.
---
# SFTP

Publish to a server of your own, a shared hosting or a VPS, over **SFTP** (SSH). No SSH client or other tool is required on your computer.

## Account

Use the SFTP (or SSH) access given by your hosting provider:

| Field | Description |
|-------|-------------|
| **Host** | The address of the server, e.g. `sftp.example.com` (`host:port` and `sftp://` are accepted). |
| **Port** | Optional: `22` by default. |
| **Username** | Your SFTP username. |
| **Password** | The password, or leave it empty and use a private key. |
| **Private key** | A private key in OpenSSH or PuTTY format, pasted in full (`-----BEGIN OPENSSH PRIVATE KEY-----`…). |
| **Key passphrase** | Optional: the passphrase of the private key. |
| **Server key fingerprint** | Optional: the fingerprint given by your hosting provider (`SHA256:…`). |

The account is shown as `username@host`. A password or a private key is required; with both, the key is tried first.

**The key of the server is checked**, like `ssh` does: its fingerprint is kept when the account is added (or the one you typed is checked), then checked at each connection. If the server presents another key, the publication is refused: if the change is expected (server reinstalled, new hosting provider), click **Replace token…** and enter the account again to accept the new key.

## Target settings

| Field | Description |
|-------|-------------|
| **Folder** | The folder of the site on the server, from the login folder of the account (e.g. `public_html`) or as an absolute path; empty: the login folder. It is created if it is missing. |
| **Site URL** | Optional: the public URL of the site, shown after each publication. |

## Publication

SFTP doesn't tell whether a file has changed: Cecil Desktop keeps the list of the published files, with their SHA-1, in a `.cecil-desktop-deploy.json` file at the root of the folder.

- Only the new and changed files are sent; the files that are no longer in the site are **deleted**, with the folders they leave empty.
- The first publication sends every file and deletes nothing, as the files already in the folder may not come from the site.
- The files are sent first, then the pages, so that a page never shows without its styles; the list is written last. An interrupted publication is completed by the next one.
- The list is on the server: it is the same for every computer and for the writers publishing to a [shared target](../writing-mode.md#shared-targets). It only holds the paths and the SHA-1 of files that are public anyway.

:::warning
Publish to a folder dedicated to the site: the files that the list names and that the site no longer has are deleted.
:::

## Limits

- The files are written in place: during a publication, a visitor may get a file being written.
- The keys of an SSH agent (Pageant, ssh-agent) and `~/.ssh/config` are not used: paste the key in the form.
- FTP and FTPS are not supported.
