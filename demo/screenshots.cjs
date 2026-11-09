// Takes the screenshots of the documentation (pages/docs/) in the running app (see launch.ps1), light and dark,
// into ../assets/images/screenshots/<name>[.dark].png. Nothing is created, saved or published in the app.
// usage: node screenshots.cjs [--process] [name…]   (all the screenshots by default)
// - --process: only resizes the screenshots already taken (rec-shots/), without the app
// - SITE: a site with a build and a diagnosis (Overview, Output panel, Publishing, Themes, Configuration)
// - CONTENT_SITE / CONTENT_PAGE: the page opened in the Content editor
const SITE = 'ligny.fr';
const CONTENT_SITE = 'arnaudligny.fr', CONTENT_PAGE = 'a-propos.md';

const { chromium } = require('playwright-core');
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const root = path.resolve(__dirname, '..');
const dest = path.join(root, 'assets', 'images', 'screenshots');
const raw = path.join(__dirname, 'rec-shots'); fs.mkdirSync(raw, { recursive: true });
const args = process.argv.slice(2);
const processOnly = args.includes('--process');
const only = args.filter(a => !a.startsWith('--'));
const APP = 'http://127.0.0.1:8100';

// ID of a site of the app, by its name (the app's SQLite database)
const siteId = name => execFileSync('php', ['-r', `$p = new PDO('sqlite:'.getenv('APPDATA').'/cecil-desktop/database/database.sqlite'); $s = $p->prepare('select id from projects where name = ?'); $s->execute([$argv[1]]); echo $s->fetchColumn();`, name]).toString().trim();

// [name, kind, darkening of the window buttons under a modal backdrop]: main = 1280×800 window, prefs = 860×560 window
const SHOTS = [
  ['output', 'main', 1], ['diagnosis', 'main', 0.9], ['palette', 'main', 0.7],
  ['frontmatter', 'main', 1], ['images', 'main', 0.9], ['new-site', 'main', 1],
  ['publish-target', 'main', 0.9], ['themes', 'main', 1], ['config', 'main', 1],
  ['preferences', 'prefs', 1], ['license', 'prefs', 1],
];
const wanted = name => !only.length || only.includes(name);

(async () => {
  if (!processOnly) await capture();
  postProcess();
})();

async function capture() {
  const site = siteId(SITE), contentSite = siteId(CONTENT_SITE);
  if (!site || !contentSite) throw new Error(`site not found in the app: ${!site ? SITE : CONTENT_SITE}`);
  const b = await chromium.connectOverCDP('http://127.0.0.1:9333');
  const page = b.contexts()[0].pages().find(p => p.url().startsWith('http'));
  const cdp = await page.context().newCDPSession(page);
  const go = async (u, ms = 2500) => { await page.goto(APP + u); await sleep(ms); };
  const field = l => page.getByLabel(l, { exact: true }).locator('visible=true').first();
  const button = t => page.locator('button:visible', { hasText: t }).first();
  const labelled = l => page.locator(`button[aria-label="${l}"]:visible, button[title="${l}"]:visible`).first();
  // a button, link or tab by its exact text (`last`: the last one, e.g. the tab of the Output panel)
  const byText = (t, last) => page.evaluate(({ t, last }) => {
    const els = [...document.querySelectorAll('button, a, [role=tab]')].filter(e => e.offsetParent && e.innerText.trim() === t);
    (last ? els.at(-1) : els[0]).click();
  }, { t, last });
  const menuItem = t => page.evaluate(t => [...document.querySelectorAll('button')]
    .find(e => e.offsetParent && e.closest('[role=menu], [popover], ui-menu') && e.innerText.trim() === t).click(), t);

  for (const scheme of ['light', 'dark']) {
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }] });
    const sfx = scheme === 'dark' ? '.dark' : '';
    const shot = async name => { if (!wanted(name)) return; await page.screenshot({ path: path.join(raw, name + sfx + '.png') }); console.log(scheme, name); };

    // Overview: Output panel (Build tab), then the results of the last diagnosis
    await go(`/projects/${site}`);
    await byText('Build', true); await sleep(1500);
    await shot('output');
    await button('Results').click(); await sleep(1500);
    await shot('diagnosis');
    await page.keyboard.press('Escape'); await sleep(400);
    await labelled('Show or hide the output').click(); await sleep(400);

    // command palette
    await page.keyboard.press('Control+k'); await sleep(1200);
    await shot('palette');
    await page.keyboard.press('Escape'); await sleep(400);

    // Content: Editor view with the front matter pane, then the image picker
    await go(`/projects/${contentSite}/pages?path=${encodeURIComponent(CONTENT_PAGE)}`, 3500);
    await labelled('Editor').click(); await sleep(300);
    if (await labelled('Show the front matter and the outline').count()) { await labelled('Show the front matter and the outline').click(); await sleep(1000); }
    await shot('frontmatter');
    if (await labelled('Insert an image').count()) await labelled('Insert an image').click();
    else { await labelled('More actions').click(); await sleep(600); await menuItem('Insert an image'); }
    await sleep(3500);
    await shot('images');
    await page.keyboard.press('Escape'); await sleep(400);

    // New site wizard, step 3 (the site is not created)
    await go('/projects/create');
    await field('Parent folder').fill(path.dirname(root)); await field('Site folder name').fill('my-site'); await sleep(600);
    await button('Next').click(); await sleep(1500);
    await field('Title').fill('My site'); await field('Baseline').fill('A new Cecil site'); await sleep(400);
    await button('Next').click(); await sleep(1500);
    await shot('new-site');

    // Publishing: New target form (not saved)
    await go(`/projects/${site}/publish`);
    await button('New target').click(); await sleep(1500);
    await field('Target name').fill('Production'); await field('Site').fill('my-site'); await sleep(600);
    await shot('publish-target');
    await page.keyboard.press('Escape'); await sleep(500);

    // Themes, scrolled to the catalog
    await go(`/projects/${site}/themes`, 6000);
    await page.getByText('Catalog', { exact: true }).first().evaluate(e => e.scrollIntoView({ block: 'start' })); await sleep(1500);
    await shot('themes');

    // Configuration
    await go(`/projects/${site}/config`);
    await shot('config');

    // Preferences, at the size of their window
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 860, height: 560, deviceScaleFactor: 1.25, mobile: false });
    await go('/preferences', 2000); await shot('preferences');
    await go('/preferences/license', 2000); await shot('license');
    await cdp.send('Emulation.clearDeviceMetricsOverride');
  }
  await cdp.send('Emulation.setEmulatedMedia', { features: [] });
  await go('/', 1000);
  await b.close().catch(() => {});
}

function postProcess() {
  // 1600×1000 frames (125 % scaling) → 1280×800, with the window buttons (drawn by Electron, missing from the
  // frames) cropped from sites[.dark].png, darkened like the title bar under a modal backdrop
  const ff = args => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  for (const [name, kind, k] of SHOTS.filter(([n]) => wanted(n))) {
    for (const sfx of ['', '.dark']) {
      const src = path.join(raw, name + sfx + '.png'), out = path.join(dest, name + sfx + '.png');
      if (kind === 'prefs') { ff(['-i', src, '-vf', 'scale=860:560:flags=lanczos', out]); continue; }
      const btn = path.join(dest, `sites${sfx}.png`);
      ff(['-i', src, '-i', btn, '-filter_complex',
        `[0:v]scale=1280:800:flags=lanczos,format=rgb24[s];[1:v]crop=170:45:1110:0,colorchannelmixer=rr=${k}:gg=${k}:bb=${k},format=rgb24[b];[s][b]overlay=W-w:0:format=rgb`,
        '-frames:v', '1', out]);
      console.log(out);
    }
  }
}
