/**
 * Feedback of the beta testers, sent by the app (Help › Send feedback, App\Support\Feedback):
 * creates an issue in the private repository of the app.
 *
 * The GitHub token stays here (a token in the app would be readable): a fine-grained token
 * with "Issues: Read and write" on the repository, in the GITHUB_TOKEN environment variable.
 */

const REPO = process.env.FEEDBACK_REPO || 'Cecilapp/Desktop';

const LABELS = { bug: 'bug', idea: 'enhancement', other: 'question' };

const TITLES = { bug: 'Bug', idea: 'Idea', other: 'Other' };

const DIAGNOSTICS = { app: 'Cecil Desktop', cecil: 'Cecil', php: 'PHP', os: 'OS', arch: 'Architecture', locale: 'Language' };

const LOGS = { build: 'Build log', app: 'App log' };

// the app cuts its logs to 15,000 characters; an issue body holds 65,536 at most
const LIMITS = { title: 120, description: 10000, email: 254, log: 16000, diagnostic: 100, body: 100000 };

export const config = {
  path: '/api/feedback',
  rateLimit: {
    windowLimit: 5,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
};

export default async (request) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }
  // not a protection, keeps the bots of the web away
  if (!(request.headers.get('user-agent') ?? '').startsWith('Cecil Desktop/')) {
    return json({ error: 'Forbidden' }, 403);
  }

  const text = await request.text();
  if (text.length > LIMITS.body) {
    return json({ error: 'Payload too large' }, 413);
  }
  let report;
  try {
    report = validate(JSON.parse(text));
  } catch (error) {
    return json({ error: error instanceof SyntaxError ? 'Invalid JSON' : error.message }, 400);
  }

  const response = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'desktop.cecil.app',
    },
    body: JSON.stringify({
      title: neutralize(report.title),
      body: issueBody(report),
      labels: ['beta', LABELS[report.type]],
    }),
  });
  if (!response.ok) {
    console.error(`GitHub: ${response.status} ${await response.text()}`);

    return json({ error: 'The feedback could not be filed' }, 502);
  }

  return json({ number: (await response.json()).number }, 201);
};

/** The report, as the app validates it (App\Livewire\Feedback). */
export function validate(input) {
  const string = (value, name, max, required = true) => {
    if (value === undefined || value === null || value === '') {
      if (required) {
        throw new Error(`The ${name} is required`);
      }

      return '';
    }
    if (typeof value !== 'string' || value.trim().length > max) {
      throw new Error(`The ${name} is invalid`);
    }

    return value.trim();
  };

  if (!input || typeof input !== 'object' || !(input.type in LABELS)) {
    throw new Error('The type is invalid');
  }
  const email = string(input.email, 'email', LIMITS.email, false);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('The email is invalid');
  }

  const pick = (object, keys, max) => Object.fromEntries(
    Object.keys(keys)
      .filter((key) => typeof object?.[key] === 'string' && object[key].trim() !== '')
      .map((key) => [key, object[key].trim().slice(-max)]),
  );

  return {
    type: input.type,
    title: string(input.title, 'title', LIMITS.title),
    description: string(input.description, 'description', LIMITS.description),
    email,
    diagnostics: pick(input.diagnostics, DIAGNOSTICS, LIMITS.diagnostic),
    logs: pick(input.logs, LOGS, LIMITS.log),
  };
}

export function issueBody(report) {
  const parts = [
    `**${TITLES[report.type]}**, reported from the app.`,
    '',
    neutralize(report.description),
  ];

  if (Object.keys(report.diagnostics).length) {
    parts.push('', '### Diagnostics', '', '| | |', '|---|---|');
    for (const [key, value] of Object.entries(report.diagnostics)) {
      parts.push(`| ${DIAGNOSTICS[key]} | ${neutralize(value).replaceAll('|', '\\|')} |`);
    }
  }

  for (const [key, log] of Object.entries(report.logs)) {
    const fence = '`'.repeat(Math.max(3, ...[...log.matchAll(/`+/g)].map(([run]) => run.length + 1)));
    parts.push('', `<details><summary>${LOGS[key]}</summary>`, '', `${fence}text`, log, fence, '', '</details>');
  }

  // the repository is private: only the team reads it
  if (report.email) {
    parts.push('', '### Contact', '', report.email);
  }

  return parts.join('\n');
}

/** No notification for the GitHub users named in a report (`@name`), nor links to other issues (`#12`). */
export function neutralize(text) {
  return text.replace(/([@#])(?=[\w-])/g, '$1​');
}

function json(data, status) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
