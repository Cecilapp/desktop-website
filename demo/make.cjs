// Edits a recording (see record.cjs) into the demo video of the home page.
// usage: node make.cjs <recdir> [light|dark] [raw]
// - output: ../assets/videos/demo.mp4 (light) or demo.dark.mp4 (dark); `raw`: real time, in <recdir>/raw.mp4
// - the window buttons (drawn by Electron, missing from the screencast) are those of window-buttons[.dark].png
const fs = require('fs'), path = require('path'); const { execFileSync } = require('child_process');
const [dir, scheme = 'light', raw] = process.argv.slice(2);
const suffix = scheme === 'dark' ? '.dark' : '';
const root = path.resolve(__dirname, '..');
const out = raw ? path.join(dir, 'raw.mp4') : path.join(root, 'assets', 'videos', `demo${suffix}.mp4`);
const { frames, marks } = JSON.parse(fs.readFileSync(path.join(dir, 'timeline.json')));
const M = Object.fromEntries(marks.map(m => [m.name, m.t]));

// segments [from, to, mode]: mode > 0 = target duration (s), mode < 0 = speed factor (idle gaps capped), null = real time
const go = M.confirm ?? M.deploy; // the publication starts once confirmed, if the app asks
const segs = raw ? [[M.start, M.end, null]] : [
  [M.start, go + 1.8, -1.5],
  [go + 1.8, M.deployed - 0.4, 3.5], // publication: build, then deployment
  [M.deployed - 0.4, M.end + 1, -1.3],
];
const CAP = raw ? Infinity : 0.7, HOLD_END = 1.5;
const segOf = t => segs.find(([a, b]) => t >= a && t < b) || segs.at(-1);
const fr = frames.filter(f => f.t >= M.start);
let list = 'ffconcat version 1.0\n', total = 0;
fr.forEach((f, i) => {
  const last = i + 1 === fr.length;
  const nt = last ? M.end : fr[i + 1].t;
  const [a, b, d] = segOf(f.t);
  let dur = nt - f.t;
  if (d != null && d > 0) dur = dur * d / (b - a);
  else { if (!last && f.t > M.start + 1.6) dur = Math.min(dur, CAP); if (d < 0) dur /= -d; }
  if (last && !raw) dur = HOLD_END;
  dur = Math.max(dur, 0); total += dur;
  list += `file 'frames/${f.file}'\nduration ${dur.toFixed(4)}\n`;
});
list += `file 'frames/${fr.at(-1).file}'\n`;
fs.writeFileSync(path.join(dir, 'list.txt'), list);
console.log('duration', total.toFixed(2), 's');

const ff = args => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
const buttons = path.join(__dirname, `window-buttons${suffix}.png`);
const vf = '[0:v]fps=30,scale=1280:800:flags=lanczos,format=rgb24[v];[1:v]scale=136:36:flags=lanczos[b];[v][b]overlay=1280-overlay_w:0,format=yuv420p';
ff(['-f', 'concat', '-safe', '0', '-i', path.join(dir, 'list.txt'), '-i', buttons, '-filter_complex', vf, '-an',
  '-c:v', 'libx264', '-preset', 'veryslow', '-crf', '24', '-profile:v', 'high', '-movflags', '+faststart', out]);
console.log(out);
