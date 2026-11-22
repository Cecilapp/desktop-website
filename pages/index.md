---
title: Cecil Desktop
# content of the homepage, in the order of its sections (layout: layouts/index.html.twig)
announce: # thin bar above the navigation (optional)
  text: "New in 0.17: Git sync, without Git to install."
  link: Read the changelog
  page: docs/changelog
  anchor: v0.17.0

hero:
  badge: Beta
  pill: Everything is included during the beta
  pill_url: '#pricing'
  title: From Markdown to live site, <span class="text-gold-400">in one click</span>.
  text: "A native desktop app to manage and build your static sites. Cecil is embedded: nothing else to install."
  note: Windows 10+ · macOS 12+ (Intel and Apple Silicon) · PHP and Cecil embedded
  screenshot:
    image: images/screenshots/sites.png
    video: videos/demo.mp4 # the screenshot stays the fallback (loading, reduced motion)
    alt: Cecil Desktop listing the sites, with the state of their last build and publication

# what the app works with: hosts and Git forges (names only, no brand logos)
proof:
  title: Publish where your sites already live.
  text: Directly through the hosts' APIs, without any CLI to install.
  items:
    - name: Netlify
      kind: Host
    - name: Vercel
      kind: Host
    - name: GitHub Pages
      kind: Host
    - name: AWS S3
      kind: Host
    - name: GitHub
      kind: Git forge
    - name: GitLab
      kind: Git forge
    - name: Codeberg
      kind: Git forge

intro:
  eyebrow: One app, the whole cycle
  title: Everything Cecil does, at your fingertips.
  text: Build logs, live preview, Markdown editor and deployments in one window. Raw configuration and detailed logs stay visible.

# stacked: title and text above, full width screenshot below (optional)
features:
  - kicker: Write
    title: Write content, see it live
    docs: docs/content
    text: Browse the `pages/` tree, edit Markdown with syntax highlighting and fill the front matter through a form. Save, and the preview reloads in your browser.
    points:
      - Formatting toolbar and shortcuts, outline and word count
      - Rendered page next to the editor, or focus mode for the text alone
      - Images dropped, pasted or picked, copied into the site
      - Front matter form checked like Cecil does, raw YAML for the rest
      - Open any page in your external editor
    screenshot:
      image: images/screenshots/content.png
      alt: Markdown editor with the pages tree and the live preview
  - kicker: Build
    title: Build, check, fix
    docs: docs/build-preview-diagnosis
    text: One click builds the site with Cecil. Logs stream into the output panel, and problems are grouped by message, so a warning repeated fifty times shows up once, with its count.
    points:
      - Build options (drafts, dry run, optimization, base URL)
      - Diagnostics of the configuration, front matter, SEO and links
      - History of the builds, with their duration and problems
    screenshot:
      image: images/screenshots/build.png
      alt: Overview of a site, with the state of its preview, build, publishing and diagnostics, and the history of its builds
  - kicker: Publish
    title: Publish anywhere, your tokens stay safe
    docs: docs/publishing
    text: Deploy to Netlify, Vercel, GitHub Pages or AWS S3 directly through their APIs. Only the changed files are sent, and every deployment is kept in the history. Tokens are encrypted with the system keychain and never written to your projects.
    points:
      - Several targets per site (production, staging…)
      - Differential uploads, no git, Netlify or AWS CLI required
      - Windows Credential Manager and macOS Keychain
      - No telemetry
    screenshot:
      image: images/screenshots/publish.png
      alt: Netlify publishing target, with the deployments history
  - kicker: Sync
    title: Git built in, no Git to install
    docs: docs/git
    text: Open a site from its repository, fetch the changes of the others and send yours, conflicts included. GitHub, GitLab, Gitea, Codeberg…
    points:
      - Open, fetch and send in the free version
      - Your repository stays a standard Git repository
    # screenshot: to add (images/screenshots/git.png and git.dark.png)

# spotlight of the Writing mode
writing:
  eyebrow: Writing mode
  title: Hand the site to those who write it.
  text: "Open a site in Writing mode for a client, a writer or a team: they get their pages, the media, the preview and publishing. The configuration, the theme and the builds leave the interface."
  docs: docs/writing-mode
  screenshot:
    image: images/screenshots/writing.png
    alt: Home of a site in Writing mode, with the latest pages, the pages to publish and the sidebar reduced to content, media and publishing
  items:
    - icon: home
      title: A home made for writing
      text: The latest pages, the drafts and the pages to publish, as soon as the site opens.
    - icon: sections
      title: Chosen sections
      text: The site manager decides which sections of the site can be edited.
    - icon: lock
      title: Rights on the pages
      text: The site manager sets what writers can do with the pages.
    - icon: document
      title: Versioned profile
      text: A small `.cecil-desktop.yml` file follows the site, without any token.
    - icon: upload
      title: Everyone publishes
      text: Each writer publishes with their own hosting account.
    - icon: user
      title: Free for writers
      text: "No license for the writers: only the site manager needs Pro."

# teaser of Pro, before the pricing
pro:
  eyebrow: Cecil Desktop Pro
  title: Made for your clients' sites.
  text: "Choose 5 Pro sites: they get several publishing targets, the SEO and links diagnostics and the full writing profile. Your other sites stay free, without limit."
  link: See the pricing
  items:
    - title: 5 Pro sites
      text: Of your choice, reassignable
    - title: Several targets
      text: Production, staging…
    - title: SEO and links
      text: Full diagnostics
    - title: Pages schema
      text: Form of the front matter
    - title: Writing profile
      text: Sections, rights, shared targets
    - title: 3 computers
      text: All updates included

more:
  title: And everything you expect.
  items:
    - icon: preview
      docs: docs/build-preview-diagnosis
      title: Live preview
      text: A local server with live reload, opened in your browser. One per site.
    - icon: sites
      docs: docs/getting-started
      title: All your sites
      text: Open a project, or drop its folder on the window. Create a new one with a wizard, and switch between them.
    - icon: config
      docs: docs/configuration
      title: Configuration
      text: A form for every option, or the raw YAML. Checked like Cecil loads it, and only what you changed is rewritten.
    - icon: themes
      docs: docs/themes
      title: Themes
      text: Browse, install and update the Cecil themes published on Packagist, without Composer.
    - icon: doctor
      docs: docs/build-preview-diagnosis
      title: Diagnostics
      text: Project, front matter, SEO, links and cache checks, with readable results in the app.
    - icon: media
      docs: docs/content
      title: Media
      text: The images and files of the site by folder, imported by drag and drop, with the pages that use each of them.
    - icon: shortcuts
      docs: docs/shortcuts
      title: Keyboard first
      text: Command palette with Ctrl/Cmd+K, Ctrl/Cmd+P to preview, Ctrl/Cmd+Shift+B to build.
    - icon: desktop
      docs: docs/preferences
      title: A real desktop app
      text: Light and dark themes following the system, native menus and notifications, progress in the taskbar. In English and French.
    - icon: updates
      docs: docs/getting-started
      title: Always up to date
      text: The app downloads its updates and installs them on restart, each one with the latest Cecil inside (Windows for now, macOS soon).

# real quotes of beta testers only, with their consent; the section is commented out in `layouts/index.html.twig`
testimonials:
  eyebrow: Beta testers
  title: What those who use it say.
  items: [] # {quote, name, role}

# thin bar before the pricing
pack:
  title: More than 5 client sites?
  text: Add a pack of 5 Pro sites for 29 € per year.
  cta: See the pack

pricing:
  eyebrow: Pricing
  title: Free for all your sites. Pro for your clients' sites.
  text: A yearly subscription, cancel anytime. During the beta, everything is included.
  note: "Cancel anytime: at the end of the period, back to the free version, without losing anything."
  plans:
    - name: Free
      price: 0 €
      period: forever
      text: To discover Cecil Desktop and manage all your sites.
      features:
        - Unlimited sites
        - Build, preview and content editing
        - Publish to Netlify, Vercel, GitHub Pages or S3 (1 target per site)
        - Themes and basic diagnostics
        - Git sync (open, fetch, send)
        - Writing mode, for every site a manager hands you
      cta: Download free
    - name: Pro
      badge: Freelancers and agencies
      price: 59 €
      period: per year
      text: For freelancers and agencies managing the sites of their clients.
      lead: "Everything in Free, plus:"
      features:
        - 5 Pro sites of your choice
        - Several publication targets per site
        - SEO and links diagnostics
        - Form of the pages schema
        - "Writing profile: editable sections, rights on the pages, shared targets"
        - All updates, on 3 computers
        - Supports the development of Cecil
      cta: Get Cecil Desktop Pro
      url: https://buy.polar.sh/polar_cl_J1QrbXjCKqohqt6HgHuNEfX7XH80MbfYtDKoa2BJ3CQ
      disabled: Available after the beta
      highlight: true
    - name: Pro sites pack
      price: +29 €
      period: per year · 5 sites
      text: For agencies managing more than 5 client sites.
      lead: "Added to a Pro license:"
      features:
        - +5 Pro sites per pack
        - As many packs as needed
        - A released site keeps its slot for 30 days
      cta: Add a pack
      disabled: Available after the beta

faq:
  title: A few questions.
  text: Another question? Read the [documentation](/docs/), or ask it from the app with **Help › Send feedback**.
  items:
    - question: What is Cecil Desktop?
      answer: "A desktop application to manage your [Cecil](https://cecil.app) sites: create, edit, build, preview and publish them without typing a single command."
    - question: Do I need to install PHP or Cecil?
      answer: No. Cecil Desktop embeds PHP and Cecil. The embedded Cecil version is shown in the app, and is updated with each release.
    - question: Do I need to install Git?
      answer: "No. Git sync is built in: Cecil Desktop opens a site from its repository (GitHub, GitLab, Gitea, Codeberg…), fetches the changes of the others and sends yours, without Git on your computer. Your repository stays a standard Git repository, that you can keep using from your terminal. See [Git sync](/docs/git/)."
    - question: Does it replace my code editor?
      answer: No. The built-in editor is made for content (Markdown and front matter), and a page opens in your favorite editor in one click. Templates and assets stay in your code editor.
    - question: Can I give a site to a non-technical writer?
      answer: "Yes. Open the site in [Writing mode](/docs/writing-mode/) for everyone, with a small profile file versioned with the site (`.cecil-desktop.yml`): the writer gets the pages of the sections you chose, the media, the preview and publishing, and nothing else. They publish with their own hosting account: the site never contains a token."
    - question: Does the writer need a Pro license?
      answer: "No. The Writing mode is free. Pro is for the manager, to choose the editable sections, the rights on the pages and the shared publishing targets: every writer of a Pro site benefits from them, without a license."
    - question: Is the Writing mode a security feature?
      answer: "No. It is a mode of the interface, to make writing simpler: anyone can switch back to the Management mode on their computer (after a confirmation), and the files of the site belong to whoever has them on their disk."
    - question: Where are my sites and tokens stored?
      answer: "Your sites stay where they are, on your disk: Cecil Desktop doesn't move or convert anything. Hosting tokens are encrypted with the system keychain."
    - question: What is a Pro site?
      answer: "A site the Pro features apply to. The license gives 5 of them, that you choose in the app, and packs of 5 Pro sites can be added for 29 € per year. Your other sites stay managed with the features of the free version. A freed slot can be given to another site 30 days later. See [Cecil Desktop Pro](/docs/pro/)."
    - question: What happens if I stop the Pro subscription?
      answer: "The Pro features stay available until the end of the paid period. After that, Cecil Desktop works like the free version, without taking anything away: your sites, your targets and your writing profiles stay usable, only adding more is limited."
    - question: Which systems are supported?
      answer: Windows 10+ and macOS 12+ (Intel and Apple Silicon). Linux is planned.
    - question: Why does my system warn me when installing?
      answer: "Cecil Desktop is not signed yet, so the system warns about an unknown publisher. On Windows, click *More info* then *Run anyway*. On macOS, open *System Settings › Privacy & Security* and click *Open Anyway*. Signing is on its way."
    - question: Is it open source?
      answer: "Cecil, the static site generator (CLI) embedded in Cecil Desktop, is open source: its source code is on [GitHub](https://github.com/Cecilapp/Cecil). Your sites stay standard Cecil projects, that you can build without the app."

cta:
  title: Your next site is one click away.
  text: Download Cecil Desktop for free, and open your first site in seconds.

# the Cecil ecosystem, after the closing call to action
ecosystem:
  title: The Cecil ecosystem.
  items:
    - title: Cecil
      text: The open source static site generator, embedded in the app.
      link: cecil.app
      url: https://cecil.app
    - title: Cecil documentation
      text: Templates, configuration and themes, to go further with your sites.
      link: Read the documentation
      url: https://cecil.app/documentation/
    - title: Source code
      text: Your sites stay standard Cecil projects, that you can build without the app.
      link: GitHub
      url: https://github.com/Cecilapp/Cecil
---
