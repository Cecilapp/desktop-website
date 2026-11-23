---
title: Cecil Desktop
# contenu de la page d'accueil, dans l'ordre de ses sections (layout : layouts/index.html.twig)
announce: # fine barre au-dessus de la navigation (optionnelle)
  text: "Nouveau dans la 0.18 : sites illimités en gratuit, sites Pro et publication SFTP."
  link: Lire les nouveautés
  page: docs/changelog
  anchor: v0.18.0

hero:
  badge: Bêta
  pill: Tout est inclus pendant la bêta
  pill_url: '#pricing'
  title: Du Markdown au site en ligne, <span class="text-gold-400">en un clic</span>.
  text: "Une application desktop native pour gérer et builder vos sites statiques. Cecil est embarqué : rien d'autre à installer."
  note: Windows 10+ · macOS 12+ (Intel et Apple Silicon) · PHP et Cecil embarqués
  screenshot:
    image: images/screenshots/sites.png
    video: videos/demo.mp4 # la capture reste en repli (chargement, animations réduites)
    alt: Liste des sites dans Cecil Desktop, avec l'état de leur dernier build et de leur publication

# ce avec quoi l'application travaille : hébergeurs et forges Git (noms seuls, sans logos de marque)
proof:
  title: Publiez là où vos sites vivent déjà.
  text: Directement via les API des hébergeurs, sans aucun CLI à installer.
  items:
    - name: Netlify
      kind: Hébergeur
    - name: Vercel
      kind: Hébergeur
    - name: GitHub Pages
      kind: Hébergeur
    - name: AWS S3
      kind: Hébergeur
    - name: SFTP
      kind: Votre serveur
    - name: GitHub
      kind: Forge Git
    - name: GitLab
      kind: Forge Git
    - name: Codeberg
      kind: Forge Git

intro:
  eyebrow: Une app, tout le cycle
  title: Tout ce que fait Cecil, sous la main.
  text: Logs de build, preview en direct, éditeur Markdown et déploiements dans une seule fenêtre. La configuration brute et les logs détaillés restent visibles.

# empilées : titre et texte au-dessus, capture pleine largeur dessous (optionnelle)
features:
  - kicker: Écrire
    title: Écrivez, voyez le résultat en direct
    docs: docs/content
    text: "Parcourez l'arborescence `pages/`, éditez le Markdown avec coloration syntaxique et remplissez le front matter via un formulaire. Enregistrez : la preview se recharge dans votre navigateur."
    points:
      - Barre de mise en forme et raccourcis, plan et nombre de mots
      - Rendu de la page à côté de l'éditeur, ou mode concentration pour le texte seul
      - Images glissées, collées ou choisies, copiées dans le site
      - Front matter en formulaire, vérifié comme le fait Cecil, YAML brut pour le reste
      - Ouverture de n'importe quelle page dans votre éditeur externe
    screenshot:
      image: images/screenshots/content.png
      alt: Éditeur Markdown avec l'arborescence des pages et l'aperçu en direct
  - kicker: Builder
    title: Buildez, vérifiez, corrigez
    docs: docs/build-preview-diagnosis
    text: "Un clic et Cecil builde le site. Les logs défilent dans le panneau Sortie, et les problèmes sont regroupés par message : un avertissement répété cinquante fois n'apparaît qu'une fois, avec son nombre."
    points:
      - Options de build (brouillons, dry-run, optimisation, URL de base)
      - Diagnostic de la configuration, du front matter, du SEO et des liens
      - Historique des builds, avec leur durée et leurs problèmes
    screenshot:
      image: images/screenshots/build.png
      alt: Aperçu d'un site, avec l'état de sa preview, de son build, de sa publication et de son diagnostic, et l'historique de ses builds
  - kicker: Publier
    title: Publiez où vous voulez, vos jetons en sécurité
    docs: docs/publishing
    text: Déployez sur Netlify, Vercel, GitHub Pages ou AWS S3 directement via leurs API, ou sur votre propre serveur en SFTP. Seuls les fichiers modifiés sont envoyés, et chaque déploiement est conservé dans l'historique. Les jetons sont chiffrés avec le trousseau du système et jamais écrits dans vos projets.
    points:
      - Plusieurs cibles par site (production, recette…)
      - Envoi différentiel, aucun CLI git, Netlify ou AWS requis
      - Gestionnaire d'identification Windows et Trousseau macOS
      - Aucune télémétrie
    screenshot:
      image: images/screenshots/publish.png
      alt: Cible de publication Netlify, avec l'historique des déploiements
  - kicker: Synchroniser
    title: Git intégré, sans Git à installer
    docs: docs/git
    text: Ouvrez un site depuis son dépôt, récupérez les modifications des autres et envoyez les vôtres, conflits compris. GitHub, GitLab, Gitea, Codeberg…
    points:
      - Ouvrir, récupérer et envoyer dans la version gratuite
      - Votre dépôt reste un dépôt Git standard
    # screenshot: à ajouter (images/screenshots/git.png et git.dark.png)

# mise en avant du mode Rédaction
writing:
  eyebrow: Mode Rédaction
  title: Confiez le site à ceux qui l'écrivent.
  text: "Ouvrez un site en mode Rédaction pour un client, un rédacteur ou une équipe : ils retrouvent leurs pages, les médias, la preview et la publication. La configuration, le thème et les builds disparaissent de l'interface."
  docs: docs/writing-mode
  screenshot:
    image: images/screenshots/writing.png
    alt: Accueil d'un site en mode Rédaction, avec les dernières pages, les pages à publier et la barre latérale réduite au contenu, aux médias et à la publication
  items:
    - icon: home
      title: Un accueil pour écrire
      text: Les dernières pages, les brouillons et les pages à publier, dès l'ouverture du site.
    - icon: sections
      title: Sections choisies
      text: Le responsable décide quelles sections du site sont modifiables.
    - icon: lock
      title: Droits sur les pages
      text: Le responsable règle ce que les rédacteurs peuvent faire sur les pages.
    - icon: document
      title: Profil versionné
      text: Un petit fichier `.cecil-desktop.yml` suit le site, sans aucun jeton.
    - icon: upload
      title: Chacun publie
      text: Chaque rédacteur publie avec son propre compte chez l'hébergeur.
    - icon: user
      title: Gratuit pour les rédacteurs
      text: "Aucune licence côté rédacteur : seul le responsable a besoin de Pro."

# présentation de Pro, avant les tarifs
pro:
  eyebrow: Cecil Desktop Pro
  title: Pensé pour les sites de vos clients.
  text: "Choisissez 5 sites Pro : ils profitent de plusieurs cibles de publication, des diagnostics SEO et liens et du profil de rédaction complet. Vos autres sites restent gratuits, sans limite."
  link: Voir les tarifs
  items:
    - title: 5 sites Pro
      text: Au choix, réattribuables
    - title: Cibles multiples
      text: Production, recette…
    - title: SEO et liens
      text: Diagnostics complets
    - title: Schéma de pages
      text: Formulaire du front matter
    - title: Profil de rédaction
      text: Sections, droits, cibles partagées
    - title: 3 ordinateurs
      text: Toutes les mises à jour

more:
  title: Et tout ce que vous attendez.
  items:
    - icon: preview
      docs: docs/build-preview-diagnosis
      title: Preview en direct
      text: Un serveur local avec rechargement automatique, ouvert dans votre navigateur. Un par site.
    - icon: sites
      docs: docs/getting-started
      title: Tous vos sites
      text: Ouvrez un projet, ou glissez son dossier sur la fenêtre. Créez-en un nouveau avec un assistant, et passez de l'un à l'autre.
    - icon: config
      docs: docs/configuration
      title: Configuration
      text: Un formulaire pour chaque option, ou le YAML brut. Vérifiée comme Cecil la charge, et seul ce que vous modifiez est réécrit.
    - icon: themes
      docs: docs/themes
      title: Thèmes
      text: Parcourez, installez et mettez à jour les thèmes Cecil publiés sur Packagist, sans Composer.
    - icon: doctor
      docs: docs/build-preview-diagnosis
      title: Diagnostic
      text: Vérifications du projet, du front matter, du SEO, des liens et du cache, avec des résultats lisibles dans l'application.
    - icon: media
      docs: docs/content
      title: Médias
      text: Les images et les fichiers du site par dossier, importés par glisser-déposer, avec les pages qui utilisent chacun d'eux.
    - icon: shortcuts
      docs: docs/shortcuts
      title: Pensé pour le clavier
      text: Palette de commandes avec Ctrl/Cmd+K, Ctrl/Cmd+P pour prévisualiser, Ctrl/Cmd+Maj+B pour builder.
    - icon: desktop
      docs: docs/preferences
      title: Une vraie application desktop
      text: Thèmes clair et sombre qui suivent le système, menus et notifications natifs, progression dans la barre des tâches. En français et en anglais.
    - icon: updates
      docs: docs/getting-started
      title: Toujours à jour
      text: L'application télécharge ses mises à jour et les installe au redémarrage, chacune avec la dernière version de Cecil (Windows pour l'instant, macOS bientôt).

# uniquement de vraies citations de bêta-testeurs, avec leur accord ; la section est en commentaire dans `layouts/index.html.twig`
testimonials:
  eyebrow: Bêta-testeurs
  title: Ce qu'en disent ceux qui l'utilisent.
  items: [] # {quote, name, role}

# fine barre avant les tarifs
pack:
  title: Plus de 5 sites clients ?
  text: Ajoutez un pack de 5 sites Pro pour 29 € par an.
  cta: Voir le pack

pricing:
  eyebrow: Tarifs
  title: Gratuit pour tous vos sites. Pro pour ceux de vos clients.
  text: Un abonnement annuel, sans engagement. Pendant la bêta, tout est inclus.
  note: "Sans engagement : à l'échéance, retour à la version gratuite, sans rien perdre."
  plans:
    - name: Gratuit
      price: 0 €
      period: pour toujours
      text: Pour découvrir Cecil Desktop et gérer tous vos sites.
      features:
        - Sites illimités
        - Build, preview et édition du contenu
        - Publication vers Netlify, Vercel, GitHub Pages ou S3 (1 cible par site)
        - Thèmes et diagnostics de base
        - Synchronisation Git (ouvrir, récupérer, envoyer)
        - Mode Rédaction, pour tous les sites qu'un responsable vous confie
      cta: Télécharger gratuitement
    - name: Pro
      badge: Freelances et agences
      price: 59 €
      period: par an
      text: Pour les freelances et les agences qui gèrent les sites de leurs clients.
      lead: "Tout ce qui est dans Gratuit, plus :"
      features:
        - 5 sites Pro au choix
        - Plusieurs cibles de publication par site
        - Diagnostics SEO et liens
        - Formulaire du schéma de pages
        - "Profil de rédaction : sections modifiables, droits sur les pages, cibles partagées"
        - Toutes les mises à jour, sur 3 ordinateurs
        - Soutient le développement de Cecil
      cta: Obtenir Cecil Desktop Pro
      url: https://buy.polar.sh/polar_cl_JAAyVlRfypWvzq94Bl8zN5D4Rg1DBvFOZ1ntB2XiVLI
      disabled: Disponible après la bêta
      highlight: true
    - name: Pack de sites Pro
      price: +29 €
      period: par an · 5 sites
      text: Pour les agences qui gèrent plus de 5 sites clients.
      lead: "S'ajoute à une licence Pro :"
      features:
        - +5 sites Pro par pack
        - Autant de packs que nécessaire
        - Un site libéré garde sa place 30 jours
      cta: Ajouter un pack
      url: https://buy.polar.sh/polar_cl_u4KlAhqP4Nkfoaq3TaScRmD0vo5lwUyGqtvAf0vYo83
      disabled: Disponible après la bêta

faq:
  title: Quelques questions.
  text: Une autre question ? Consultez la [documentation](/fr/docs/), ou posez-la depuis l'application avec **Aide › Envoyer un avis**.
  items:
    - question: Qu'est-ce que Cecil Desktop ?
      answer: "Une application desktop pour gérer vos sites [Cecil](https://cecil.app) : les créer, les éditer, les builder, les prévisualiser et les publier sans taper une seule commande."
    - question: Dois-je installer PHP ou Cecil ?
      answer: Non. Cecil Desktop embarque PHP et Cecil. La version de Cecil embarquée est affichée dans l'application, et mise à jour à chaque release.
    - question: Dois-je installer Git ?
      answer: "Non. La synchronisation Git est intégrée : Cecil Desktop ouvre un site depuis son dépôt (GitHub, GitLab, Gitea, Codeberg…), récupère les modifications des autres et envoie les vôtres, sans Git sur votre ordinateur. Votre dépôt reste un dépôt Git standard, que vous pouvez continuer d'utiliser depuis votre terminal. Voir [Synchronisation Git](/fr/docs/git/)."
    - question: Remplace-t-il mon éditeur de code ?
      answer: Non. L'éditeur intégré est fait pour le contenu (Markdown et front matter), et une page s'ouvre dans votre éditeur préféré en un clic. Les templates et les assets restent dans votre éditeur de code.
    - question: Puis-je confier un site à un rédacteur non technique ?
      answer: "Oui. Ouvrez le site en [mode Rédaction](/fr/docs/writing-mode/) pour tout le monde, avec un petit fichier de profil versionné avec le site (`.cecil-desktop.yml`) : le rédacteur dispose des pages des sections que vous avez choisies, des médias, de la preview et de la publication, et de rien d'autre. Il publie avec son propre compte chez l'hébergeur : le site ne contient jamais de jeton."
    - question: Le rédacteur a-t-il besoin d'une licence Pro ?
      answer: "Non. Le mode Rédaction est gratuit. Pro s'adresse au responsable, pour choisir les sections modifiables, les droits sur les pages et les cibles de publication partagées : tous les rédacteurs d'un site Pro en profitent, sans licence."
    - question: Le mode Rédaction est-il une protection ?
      answer: "Non. C'est un mode de l'interface, pour simplifier la rédaction : chacun peut revenir en mode Gestion sur son ordinateur (après une confirmation), et les fichiers du site appartiennent à qui les a sur son disque."
    - question: Où sont stockés mes sites et mes jetons ?
      answer: "Vos sites restent là où ils sont, sur votre disque : Cecil Desktop ne déplace ni ne convertit rien. Les jetons des hébergeurs sont chiffrés avec le trousseau du système."
    - question: Qu'est-ce qu'un site Pro ?
      answer: "Un site sur lequel s'appliquent les fonctions Pro. La licence en donne 5, que vous choisissez dans l'application, et des packs de 5 sites Pro s'ajoutent pour 29 € par an. Vos autres sites restent gérés avec les fonctions de la version gratuite. Un emplacement libéré peut être réattribué à un autre site 30 jours plus tard. Voir [Cecil Desktop Pro](/fr/docs/pro/)."
    - question: Que se passe-t-il si j'arrête l'abonnement Pro ?
      answer: "Les fonctions Pro restent disponibles jusqu'à la fin de la période payée. Ensuite, Cecil Desktop fonctionne comme la version gratuite, sans rien vous retirer : vos sites, vos cibles et vos profils de rédaction restent utilisables, seul l'ajout est limité."
    - question: Quels systèmes sont pris en charge ?
      answer: Windows 10+ et macOS 12+ (Intel et Apple Silicon). Linux est prévu.
    - question: Pourquoi mon système m'avertit-il à l'installation ?
      answer: "Cecil Desktop n'est pas encore signé : le système signale donc un éditeur inconnu. Sous Windows, cliquez sur *Informations complémentaires* puis *Exécuter quand même*. Sous macOS, ouvrez *Réglages Système › Confidentialité et sécurité* et cliquez sur *Ouvrir quand même*. La signature est en cours."
    - question: Est-ce open source ?
      answer: "Cecil, le générateur de site statique (CLI) embarqué dans Cecil Desktop, est open source : son code source est sur [GitHub](https://github.com/Cecilapp/Cecil). Vos sites restent des projets Cecil standards, que vous pouvez builder sans l'application."

cta:
  title: Votre prochain site est à un clic.
  text: Téléchargez Cecil Desktop gratuitement, et ouvrez votre premier site en quelques secondes.

# l'écosystème Cecil, après l'appel final
ecosystem:
  title: L'écosystème Cecil.
  items:
    - title: Cecil
      text: Le générateur de sites statiques open source, embarqué dans l'application.
      link: cecil.app
      url: https://cecil.app
    - title: Documentation de Cecil
      text: Templates, configuration et thèmes, pour aller plus loin avec vos sites.
      link: Lire la documentation
      url: https://cecil.app/documentation/
    - title: Code source
      text: Vos sites restent des projets Cecil standards, que vous pouvez builder sans l'application.
      link: GitHub
      url: https://github.com/Cecilapp/Cecil
---
