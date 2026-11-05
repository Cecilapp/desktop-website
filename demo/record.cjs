// Records the demo scenario in the running app (see launch.ps1): screencast frames + timeline.json.
// usage: node record.cjs <outdir> [dark]
const { chromium } = require('playwright-core');
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path');
const out = process.argv[2]; fs.mkdirSync(path.join(out, 'frames'), { recursive: true });
const status = () => JSON.parse(execFileSync('php', [path.join(__dirname, 'status.php')]).toString());
const sleep = ms => new Promise(r => setTimeout(r, ms));
const marks = [];
const mark = name => { marks.push({ name, t: Date.now() / 1000 }); console.log('mark', name); };

const CURSOR = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M5 2.5v17.2l4.3-4.1 2.8 6.4 3.1-1.4-2.8-6.3h6z" fill="#fff" stroke="#000" stroke-width="1.3" stroke-linejoin="round"/></svg>`;

(async () => {
  const b = await chromium.connectOverCDP('http://127.0.0.1:9333');
  const page = b.contexts()[0].pages().find(p => p.url().startsWith('http'));
  let cur = { x: 640, y: 560 };
  const ensureCursor = () => page.evaluate(({ svg, cur }) => {
    let c = document.getElementById('demo-cursor');
    if (!c) {
      c = document.createElement('div'); c.id = 'demo-cursor'; c.innerHTML = svg;
      Object.assign(c.style, { position: 'fixed', left: '0', top: '0', zIndex: 2147483647, pointerEvents: 'none', transform: `translate(${cur.x - 5}px, ${cur.y - 2}px)`, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.35))' });
      document.documentElement.appendChild(c);
      const r = document.createElement('div'); r.id = 'demo-ripple';
      Object.assign(r.style, { position: 'fixed', left: '0', top: '0', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(240,190,60,.45)', zIndex: 2147483646, pointerEvents: 'none', opacity: 0 });
      document.documentElement.appendChild(r);
    }
  }, { svg: CURSOR, cur });
  const moveTo = async (x, y, ms = 650) => {
    await ensureCursor();
    await page.evaluate(({ x, y, ms }) => {
      const c = document.getElementById('demo-cursor');
      c.style.transition = `transform ${ms}ms cubic-bezier(.45,.05,.25,1)`;
      c.style.transform = `translate(${x - 5}px, ${y - 2}px)`;
    }, { x, y, ms });
    await sleep(ms + 60); cur = { x, y };
    await page.mouse.move(x, y);
  };
  const ripple = () => page.evaluate(({ x, y }) => {
    const r = document.getElementById('demo-ripple'); if (!r) return;
    r.animate([{ transform: `translate(${x - 14}px, ${y - 14}px) scale(.3)`, opacity: .9 }, { transform: `translate(${x - 14}px, ${y - 14}px) scale(1.4)`, opacity: 0 }], { duration: 450, easing: 'ease-out' });
  }, cur);
  const rectOf = async (sel, text, pick) => {
    for (let i = 0; i < 60; i++) {
      try {
        const r = await page.evaluate(({ sel, text, pick }) => {
          let els = [...document.querySelectorAll(sel)].filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && getComputedStyle(e).visibility !== 'hidden'; });
          if (text) els = els.filter(e => e.innerText.trim() === text);
          const e = pick === 'last' ? els.at(-1) : els[0]; if (!e) return null;
          const b = e.getBoundingClientRect(); return { x: b.x, y: b.y, width: b.width, height: b.height };
        }, { sel, text, pick });
        if (r) return r;
      } catch (e) {}
      await sleep(250);
    }
    throw new Error('not found: ' + sel + ' ' + (text || ''));
  };
  const clickOn = async (q, opts = {}) => {
    const bb = await rectOf(q.sel, q.text, q.pick);
    const x = Math.round(bb.x + (opts.dx ?? bb.width / 2)), y = Math.round(bb.y + (opts.dy ?? bb.height / 2));
    await moveTo(x, y, opts.ms);
    await sleep(120); await ripple(); await page.mouse.click(x, y); await sleep(opts.after ?? 600);
  };

  // start on the Sites screen
  if (process.argv[3] === 'dark') { const e = await page.context().newCDPSession(page); await e.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'dark' }] }); }
  await page.goto('http://127.0.0.1:8100/?_windowId=main'); await sleep(2500);
  await ensureCursor(); await sleep(300);
  const before = status(); console.log('before', before);

  // screencast
  const s = await page.context().newCDPSession(page);
  let n = 0; const frames = [];
  s.on('Page.screencastFrame', async f => {
    const file = `f${String(n++).padStart(5, '0')}.jpg`;
    fs.writeFileSync(path.join(out, 'frames', file), Buffer.from(f.data, 'base64'));
    frames.push({ file, t: f.metadata.timestamp });
    s.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
  });
  await s.send('Page.startScreencast', { format: 'jpeg', quality: 95, everyNthFrame: 1 });
  mark('start');
  await sleep(1500);

  // 1. open the site
  await clickOn({ sel: '.site-card[data-id="2"] a' }, { ms: 900, after: 1400 });
  // 2. content > page
  await clickOn({ sel: 'a[data-action="section:projects.pages"]' }, { after: 1200 });
  await clickOn({ sel: '[data-path="a-propos.md"]' }, { after: 1500 });
  // 3. edit: last (empty) line
  await clickOn({ sel: '.cm-content .cm-line', pick: 'last' }, { dx: 20, after: 300 });
  mark('type');
  await page.keyboard.type('* les pages sont éditées avec [Cecil Desktop](https://desktop.cecil.app)', { delay: 28 });
  await sleep(1200);
  mark('typed');
  // 4. save
  await clickOn({ sel: 'button[data-action="save"]' }, { after: 1300 });
  // 5. build
  await clickOn({ sel: 'button[data-action="build"]' }, { after: 800 });
  mark('build');
  let st; do { await sleep(500); st = status(); } while (!(st.build.id > before.build.id && ['done','failed','interrupted','cancelled'].includes(st.build.status)));
  mark('built'); console.log('build', st.build);
  await sleep(1800);
  // 6. publish
  await clickOn({ sel: 'button[data-action="publish"]' }, { after: 1500 });
  await clickOn({ sel: 'button', text: 'Publish this build' }, { after: 800 });
  mark('deploy');
  do { await sleep(500); st = status(); } while (!(st.deploy.id > before.deploy.id && ['done','failed'].includes(st.deploy.status)));
  mark('deployed'); console.log('deploy', st.deploy);
  await moveTo(cur.x + 60, cur.y + 140, 800);
  await sleep(3000);
  mark('end');
  await s.send('Page.stopScreencast');
  await sleep(300);
  fs.writeFileSync(path.join(out, 'timeline.json'), JSON.stringify({ frames, marks }, null, 1));
  console.log('frames', frames.length);
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
