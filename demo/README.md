# Demo video

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
