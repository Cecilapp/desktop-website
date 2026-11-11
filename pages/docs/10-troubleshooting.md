---
title: Troubleshooting
description: Common problems and their solutions, and how to send feedback to the team.
---
# Troubleshooting

## Common problems

### The system warns me when installing

Cecil Desktop is not signed yet. On Windows, click **More info**, then **Run anyway**. On macOS, open **System Settings › Privacy & Security**, and click **Open Anyway**.

### Folder not found

The folder of the site was moved or deleted. If it was moved, open it again from its new location (**File › Open folder…**), then remove the former entry: right-click it in the sidebar, then **Remove from list** (the files are not deleted).

### Invalid configuration

The configuration file of the site can't be loaded: the error is shown on the **Overview**. Open **Configuration › YAML**, fix the file, then click **Check**.

### A page is missing from the site

- It is a draft (`draft: true` or `published: false`, eye-slash icon in the tree): build with **Include drafts**, or publish it.
- Its front matter is invalid (red icon in the tree): with the `error` front matter check, Cecil skips it. Open it, and fix the variables shown in the **Front matter** tab.
- Run the **Front matter** diagnosis, from the **Overview**, to list the problems of all the pages.

### The build fails

Read the log in the **Build** tab of the **Output** panel (`Ctrl/⌘+J`): filter it with **Lines shown** to see only the errors. If the error comes from the app rather than from your site, click **Report** to send it to the team, with the log of the build.

### The preview doesn't start

If you set a **Port** in the [preview options](build-preview-diagnosis.md#preview-options), it may be used by another application: empty the field to choose a free port automatically.

### Publishing fails

See the [troubleshooting of the publication](publishing/index.md#troubleshooting).

### Changes made in another editor don't show up

A page open in Cecil Desktop is not reloaded when it is changed by another application: open it again.

## Data

- Your **sites** stay where they are, on your disk: Cecil Desktop works directly on their files, and they stay standard Cecil projects.
- The **list of sites**, the history of the builds and publications, and the preferences are stored by the app, in its data folder.
- **Tokens** and the **license key** are encrypted with the system keychain, for your user account on this computer.
- There is **no telemetry**: nothing is sent, except when you publish, check a license or send feedback.

## Send feedback

A bug, an idea, a criticism? Use **Help › Send feedback…**: choose its type (bug, idea or other), give it a title and a description and, optionally, your email to get an answer.

You can attach the **log of the last build** of the site and the **log of the app** (its recent errors): they are shown before sending, and your user folder is replaced by `~`. The versions of the app, of Cecil and of PHP, and your system, are always sent. Your feedback is read by the Cecil team only.
