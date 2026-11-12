# Demo video and screenshots

Records `assets/videos/demo.mp4` and `demo.dark.mp4` (hero of the home page) from the real Cecil Desktop app, installed on Windows, driven with Playwright through the Chrome DevTools Protocol.

Scenario (`record.cjs`), in Writing mode: Sites → open `SITE` → Home → `PAGE` → type a line → Save → Publish, confirmed (**real deployment** on `TARGET`: the site is built, then sent to its hosting provider). `SITE`, `PAGE` and `TARGET` are set at the top of `record.cjs`.

## Requirements

- Cecil Desktop installed (`%LOCALAPPDATA%\Programs\cecil-desktop`), with the arnaudligny.fr site, opened in Writing mode, and its "Production" target
- Node.js, PHP (reads the app's SQLite database), ffmpeg (libx264)
- `npm install` in this folder

## Steps

```sh
php setprefs.php appearance=system language=en open_last_site=false  # English UI, starts on the Sites screen; "system" theme, for the emulated dark one
npm run launch        # restarts the app: 1280×800 window, DevTools port 9333
node record.cjs rec-light dry  # rehearsal: stops before Save, nothing is written or published
npm run record        # light; then revert the edited page: git -C <site> checkout -- pages/a-propos.md
npm run record:dark   # dark (emulated prefers-color-scheme); revert the page again
npm run make          # → ../assets/videos/demo.mp4
npm run make:dark     # → ../assets/videos/demo.dark.mp4
php setprefs.php appearance=system language=system open_last_site=true  # restores the preferences
```

The typed line stays online after the recordings: publish the site once more, with the page reverted, to remove it.

Notes:

- From a VS Code terminal, `ELECTRON_RUN_AS_NODE=1` is inherited and the app exits at once: `launch.ps1` removes it.
- The window must be at 125 % scaling (frames are 1600×1000, scaled down to 1280×800); adapt `launch.ps1` otherwise. `record.cjs` and `screenshots.cjs` force a 1280×800 viewport, should the window have been resized.
- The screencast has no window buttons (drawn by Electron): `make.cjs` adds those of `window-buttons[.dark].png`.
- `make.cjs` speeds up the publication (build and deployment, 3.5 s) and the rest (×1.3 to ×1.5, idle gaps capped); `node make.cjs rec-light light raw` renders the recording in real time, to check it.
- `record.cjs` sets the editor Side by side, without its pane, with the folders collapsed and the Output panel hidden; the layout of the app is restored at the end.
- The cursor is drawn in the page (`#demo-cursor`), the real mouse is not moved.

## Screenshots of the home page and the documentation

`screenshots.cjs` takes the screenshots of the home page and of the documentation (`pages/docs/`) in the same app, light and dark (emulated `prefers-color-scheme`): `assets/images/screenshots/<name>[.dark].png`. Nothing is created, saved or published in the app: the New site wizard and the New target form are filled in, but not submitted.

| Screenshot | Screen |
|------------|--------|
| `sites` | Sites screen |
| `build` | Overview of `CONTENT_SITE`, in Management mode |
| `content` | Content editor (`CONTENT_SITE`, `CONTENT_PAGE`), Side by side view, folders collapsed |
| `publish` | Publishing targets of `CONTENT_SITE`, with the history of the first one |
| `output` | Overview of `SITE`, with the Output panel (Build tab) |
| `diagnosis` | Results of the last diagnosis of `SITE` (run the SEO diagnosis once before) |
| `palette` | Command palette |
| `frontmatter` | Content editor (`CONTENT_SITE`, `CONTENT_PAGE`), Editor view, with the Front matter pane |
| `images` | Insert an image dialog |
| `writing` | Home of `CONTENT_SITE` in Writing mode |
| `new-site` | New site wizard, step 3 |
| `publish-target` | New target form (Netlify) of `SITE` |
| `themes` | Catalog of the themes of `SITE` |
| `config` | Configuration form of `SITE` |
| `preferences`, `accounts`, `license` | Preferences › General, Accounts and License, at the size of their window (860×560) |

`SITE`, `CONTENT_SITE` and `CONTENT_PAGE` are set at the top of `screenshots.cjs` (sites listed in the app).

```sh
php setprefs.php appearance=system language=en open_last_site=false  # English UI; "system" theme, for the emulated dark one
npm run launch
npm run screenshots                    # all of them; or: node screenshots.cjs palette themes
node screenshots.cjs --process         # only resizes the screenshots already taken (rec-shots/)
php setprefs.php appearance=system language=system open_last_site=true
```

Notes:

- The screenshots are taken at 1600×1000 (125 % scaling) and resized with ffmpeg to 1280×800, with the window buttons of `window-buttons[.dark].png` (170×45, resized to 136×36 like the frames). Under a modal backdrop (dialogs, palette), the buttons are darkened like the title bar (×0.9, ×0.7).
- `CONTENT_SITE` is switched to Management mode, then to Writing mode for `writing`. Its mode and the layout of the app (Output panel, views of the editor, opened folders) are restored at the end.
- In Management mode, the notices of a site prepared for writing (`.role-band`) are hidden.
