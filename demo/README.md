# Demo video and screenshots

Records `assets/videos/demo.mp4` and `demo.dark.mp4` (hero of the home page) from the real Cecil Desktop app, installed on Windows, driven with Playwright through the Chrome DevTools Protocol.

Scenario (`record.cjs`): Sites → open arnaudligny.fr → Content → `a-propos.md` → type a line → Save → Build → Publish this build (**real deployment** on its Netlify target).

## Requirements

- Cecil Desktop installed (`%LOCALAPPDATA%\Programs\cecil-desktop`), with the arnaudligny.fr site and its "Production" target
- Node.js, PHP (reads the app's SQLite database), ffmpeg (libx264)
- `npm install` in this folder

## Steps

```sh
php setprefs.php appearance=light language=en open_last_site=false  # English UI, starts on the Sites screen
npm run launch        # restarts the app: 1280×800 window, DevTools port 9333
npm run record        # light; then revert the edited page: git -C <site> checkout -- pages/a-propos.md
npm run record:dark   # dark (emulated prefers-color-scheme); revert the page again
npm run make          # → ../assets/videos/demo.mp4
npm run make:dark     # → ../assets/videos/demo.dark.mp4
php setprefs.php appearance=system language=system open_last_site=true  # restores the preferences
```

Notes:

- From a VS Code terminal, `ELECTRON_RUN_AS_NODE=1` is inherited and the app exits at once: `launch.ps1` removes it.
- The window must be at 125 % scaling (frames are 1600×1000, scaled down to 1280×800); adapt `launch.ps1` otherwise.
- The screencast has no window buttons (drawn by Electron): `make.cjs` crops them from `assets/images/screenshots/sites[.dark].png`.
- `make.cjs` speeds up the build and the deployment (2.2 s each) and the rest (×1.3 to ×1.8, idle gaps capped); `node make.cjs rec-light light raw` renders the recording in real time, to check it.
- The cursor is drawn in the page (`#demo-cursor`), the real mouse is not moved.

## Screenshots of the documentation

`screenshots.cjs` takes the screenshots of the documentation (`pages/docs/`) in the same app, light and dark (emulated `prefers-color-scheme`): `assets/images/screenshots/<name>[.dark].png`. Nothing is created, saved or published in the app: the New site wizard and the New target form are filled in, but not submitted.

| Screenshot | Screen |
|------------|--------|
| `output` | Overview of `SITE`, with the Output panel (Build tab) |
| `diagnosis` | Results of the last diagnosis of `SITE` (run the SEO diagnosis once before) |
| `palette` | Command palette |
| `frontmatter` | Content editor (`CONTENT_SITE`, `CONTENT_PAGE`), Editor view, with the Front matter pane |
| `images` | Insert an image dialog |
| `new-site` | New site wizard, step 3 |
| `publish-target` | New target form (Netlify) of `SITE` |
| `themes` | Catalog of the themes of `SITE` |
| `config` | Configuration form of `SITE` |
| `preferences`, `license` | Preferences › General and License, at the size of their window (860×560) |

`SITE`, `CONTENT_SITE` and `CONTENT_PAGE` are set at the top of `screenshots.cjs` (sites listed in the app).

```sh
php setprefs.php appearance=system language=en open_last_site=false  # English UI; "system" theme, for the emulated dark one
npm run launch
npm run screenshots                    # all of them; or: node screenshots.cjs palette themes
node screenshots.cjs --process         # only resizes the screenshots already taken (rec-shots/)
php setprefs.php appearance=system language=system open_last_site=true
```

Notes:

- The screenshots are taken at 1600×1000 (125 % scaling) and resized with ffmpeg to 1280×800, with the window buttons cropped from `sites[.dark].png`. Under a modal backdrop (dialogs, palette), the buttons are darkened like the title bar (×0.9, ×0.7).
- The Content editor is left in the Editor view, with its pane shown: switch back to your own layout afterwards.
