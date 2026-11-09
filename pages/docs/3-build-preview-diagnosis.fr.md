---
title: Build, preview, diagnostic
description: Prévisualisez votre site avec rechargement automatique, buildez-le avec des options, lisez ses logs et ses problèmes, et vérifiez-le avec les diagnostics.
---
# Build, preview, diagnostic

L'**Aperçu** d'un site (`Ctrl/⌘+1`) réunit ses 4 tuiles : **Preview**, **Build**, **Publication** et **Diagnostic**, avec l'historique des builds en dessous et les informations sur le site à droite.

![L'Aperçu d'un site, avec l'état de sa preview, de son build, de sa publication et de son diagnostic, et l'historique de ses builds](/images/screenshots/build.png)

La barre d'outils, en haut de chaque écran d'un site, donne accès aux mêmes actions : **Preview**, **Builder** et **Publier**.

## Preview

La preview lance le serveur local de Cecil : le site est buildé, servi à l'adresse `http://127.0.0.1:<port>/`, et ouvert dans votre navigateur. Quand vous modifiez un fichier, le site est rebuildé et la page se recharge dans le navigateur.

- **Lancer** : **Lancer la preview** sur la tuile, le bouton **Preview** de la barre d'outils, ou `Ctrl/⌘+P`. Le premier build a lieu avant que le site soit servi (*Démarrage (build initial)…*).
- **Ouvrir** : une fois la preview en ligne, `Ctrl/⌘+P` (ou **Ouvrir** sur la tuile) l'ouvre à nouveau dans le navigateur.
- **Arrêter** : **Arrêter** sur la tuile, ou **Arrêter la preview** dans le menu du bouton de la barre d'outils.

Chaque site a son propre serveur : plusieurs sites peuvent être prévisualisés en même temps, chacun est affiché dans la barre d'état, en bas de la fenêtre, avec un menu pour l'ouvrir, aller à son site ou l'arrêter. Les previews sont arrêtées quand vous quittez l'application.

### Options de la preview

L'icône d'engrenage de la tuile ouvre les options, conservées pour les lancements suivants :

| Option | Description |
|--------|-------------|
| **Inclure les brouillons** | Sert aussi les pages marquées comme brouillons. |
| **Rebuild incrémental** | Ne rebuilde que les pages modifiées. |
| **Ouvrir le navigateur au démarrage** | Ouvre le site quand le serveur est prêt. |
| **Log détaillé** | Journalise chaque fichier et page traités, et les avertissements. |
| **Page** | L'ID d'une page à servir seule (toutes les pages par défaut). |
| **Port** | Entre 1024 et 65535 ; un port libre est choisi automatiquement par défaut. |

## Build

Un build génère le site dans son dossier de sortie (`_site` par défaut), comme `cecil build`.

- **Lancer** : **Builder** sur la tuile, dans la barre d'outils, ou `Ctrl/⌘+Maj+B`.
- **Suivre** : la tuile affiche l'étape en cours et sa progression, également affichée dans la barre des tâches (Windows) ou le Dock (macOS). Le log défile dans le panneau **Sortie**.
- **Arrêter** : **Arrêter** sur la tuile, le bouton de la barre d'outils (il devient **Arrêter le build** pendant le build), ou **Site › Arrêter le build**.

Un site se builde un build à la fois. Quand le build est terminé, la tuile affiche son statut, sa durée, son nombre de pages et de problèmes, et **Ouvrir** ouvre le dossier de sortie. Une notification système vous prévient quand un build se termine ou échoue, même si vous êtes sur un autre écran (voir les **Préférences** pour la désactiver).

### Options du build

L'icône d'engrenage de la tuile ouvre les options, conservées pour les builds suivants :

| Option | Description |
|--------|-------------|
| **Inclure les brouillons** | Builde aussi les pages marquées comme brouillons. |
| **Dry-run** | Lance le build sans écrire les fichiers. |
| **Optimisation** | Minifie et optimise les assets : selon la configuration, activée ou désactivée. |
| **URL de base** | Remplace le `baseurl` de la configuration pour ce build (par ex. une URL de préproduction). |

### Problèmes

Les avertissements et les erreurs d'un build sont **regroupés par message** : un avertissement répété cinquante fois n'apparaît qu'une fois, avec son nombre. Cliquez sur le nombre de problèmes (sur la tuile, dans l'historique, dans le panneau Sortie ou dans la barre d'état) pour les lister, erreurs en premier.

### Historique

**Historique des builds**, sous les tuiles, liste les 20 derniers builds avec leur date, statut, durée, nombre de pages, problèmes et options. Double-cliquez sur un build (ou cliquez sur **Log**) pour lire son log ; **Supprimer** retire un build et son log.

:::tip
Un build qui échoue à cause de l'application, et non de votre site ? Cliquez sur **Signaler** dans le panneau Sortie : le formulaire de retour s'ouvre avec le log du build joint.
:::

## Diagnostic

Le menu **Diagnostiquer** de la tuile **Diagnostic** lance les vérifications de Cecil :

| Diagnostic | Ce qu'il vérifie |
|------------|------------------|
| **Configuration du site** | La configuration, l'environnement et les chemins du site. |
| **Front matter** | Le front matter des pages : syntaxe et valeurs. |
| **SEO** <span class="tag">Pro</span> | Titres, descriptions et autres règles SEO, page par page. |
| **Liens** <span class="tag">Pro</span> | Les liens internes cassés, et en option les liens externes. |
| **Cache** | Les réglages du cache et la taille des dossiers de cache. |

Les diagnostics **SEO** et **Liens** buildent d'abord le site, sans écrire les fichiers : leur progression s'affiche sur la tuile et leur log dans le panneau **Sortie**. Leurs options (icône d'engrenage) permettent de **vérifier les liens externes** (plus lent : une requête par URL), d'**inclure les pages générées** (sections, taxonomies, pagination…) et d'**inclure les suggestions**.

![Les résultats du diagnostic SEO, regroupés par page](/images/screenshots/diagnosis.png)

Les résultats s'ouvrent à la fin du diagnostic (**Résultats** pour les rouvrir), avec les **problèmes** en rouge, les points **à améliorer** en orange et les suggestions en gris. Dans les résultats du diagnostic **Front matter**, cliquez sur le nom d'un fichier pour ouvrir la page dans l'éditeur et la corriger.

## Panneau Sortie

Le panneau **Sortie**, en bas des écrans d'un site (`Ctrl/⌘+J`), a 4 onglets : **Preview**, **Build**, **Publication** et **Diagnostic**. Il s'ouvre sur le bon onglet quand vous lancez l'une de ces actions, et garde les 500 dernières lignes.

![Le panneau Sortie, avec le log du dernier build](/images/screenshots/output.png)

Dans les onglets **Build** et **Diagnostic**, **Lignes affichées** filtre le log : toutes les lignes, étapes et problèmes, avertissements et erreurs, ou erreurs seulement. Le filtre par défaut se règle dans les **Préférences**.

## Nettoyer le site

Dans le panneau **Informations** de l'Aperçu :

- **Vider le cache** supprime le cache de Cecil (`cecil cache:clear`) ;
- **Tout nettoyer…** supprime les dossiers de sortie, temporaire et de cache du site (`cecil clear`), après confirmation.
