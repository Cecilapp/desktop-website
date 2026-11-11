---
title: Mode Rédaction
description: Confiez un site à un rédacteur : les modes Rédaction et Gestion, et le profil du site (.cecil-desktop.yml).
---
# Mode Rédaction

Un site peut s'afficher dans 2 modes :

- **Gestion**, par défaut : tout ce que fait Cecil Desktop, pour qui crée et paramètre le site (configuration, thème, structure des pages, cibles de publication, builds et diagnostics) ;
- **Rédaction**, pour qui écrit son contenu : les pages, les images et les fichiers, la preview et la publication. Tout ce qui touche à la technique est retiré de l'interface.

Une même personne peut passer de l'un à l'autre, par ex. pour voir le site comme le verra un rédacteur. Et le responsable d'un site peut **l'ouvrir en mode Rédaction pour tout le monde**, pour le confier à un client ou à une équipe, avec un profil enregistré dans le site.

:::warning
Le mode Rédaction est un mode de l'interface, **pas une protection** : les fichiers du site appartiennent à qui les a sur son disque, et chacun peut passer en mode Gestion sur son ordinateur, ou modifier les fichiers avec un autre outil. Utilisez-le pour simplifier la rédaction, pas pour protéger un site.
:::

## Changer de mode

Utilisez **Affichage › Passer en mode Rédaction** (ou **Passer en mode Gestion**), ou la palette de commandes (`Ctrl/⌘+K`). Le choix ne vaut que pour ce site, sur cet ordinateur : rien n'est écrit dans le site.

En mode Rédaction, une pastille **Rédaction** s'affiche à côté du nom du site, dans la barre de titre : cliquez dessus pour revenir en mode Gestion.

## Ce que voit le rédacteur

En mode Rédaction, la barre latérale du site a 4 sections :

- **Accueil**, à la place de l'Aperçu : les dernières pages, filtrées par **Toutes**, **Brouillons** ou **À publier** (les pages modifiées depuis votre dernière publication depuis cet ordinateur), avec **Nouvelle page**, **Vérifier mes pages** (le front matter de toutes les pages, vérifié comme le fait Cecil), **Voir le site** et **Publier** ;
- **Contenu** : l'[éditeur](content.md), avec les seules pages des sections que le rédacteur peut modifier. Une nouvelle page se crée à partir d'un titre, dans l'une de ces sections, depuis le modèle de la section (`models/`). Le front matter est un formulaire, [schéma de pages](content.md#schema-de-pages) du site compris ; les autres variables (YAML) sont repliées, et conservées telles quelles ;
- **Médias** : les images et les fichiers du site (voir [Médias](content.md#medias)) ; les imports vont dans les dossiers du profil ;
- **Publication** : les cibles partagées par le profil du site (voir [plus bas](#cibles-partagees)).

Les sections **Thèmes** et **Configuration**, les builds, les diagnostics et les logs des builds ne sont pas affichés. La barre d'outils garde **Preview** et **Publier**, le panneau **Sortie** les logs de la preview et des publications, et la barre d'état affiche le nombre de pages à publier.

## Confier un site à un rédacteur

Le responsable décrit ce que peuvent faire les rédacteurs dans **Configuration › Rédaction**, puis versionne le site avec eux (Git, dossier synchronisé…) :

1. Ouvrez le site en mode Gestion, puis **Configuration** (`Ctrl/⌘+6`) › **Rédaction**.
2. Cochez **Ouvrir ce site en mode Rédaction** : cela vaut pour toute personne qui ouvre le dossier ; vous restez en mode Gestion sur cet ordinateur.
3. Renseignez le **Responsable** : votre nom, affiché aux rédacteurs pour ce qui reste hors de leur portée (« géré par … »).
4. Choisissez les **Sections modifiables**, si les rédacteurs peuvent **Créer et dupliquer des pages** et **Renommer, déplacer et supprimer des pages**, les dossiers des **Médias**, s'il faut **Autoriser la publication**, et les **Cibles partagées** <span class="tag">Pro</span>.
5. Cliquez sur **Enregistrer** : le profil est écrit dans `.cecil-desktop.yml`, à la racine du site.

**Essayer le mode Rédaction** montre le site tel que le verra un rédacteur, avec ce profil.

Quand un rédacteur ouvre le site, il s'ouvre en mode Rédaction, présenté une fois par une fenêtre qui dit ce qu'il peut faire et qui gère le site. S'il passe en mode Gestion, Cecil Desktop demande d'abord une confirmation (la configuration et le thème changent tout le site), et un bandeau lui rappelle qu'il n'est pas dans le mode du site, avec **Revenir en Rédaction**.

## Le profil du site

`.cecil-desktop.yml` est un fichier YAML à la racine du site, à côté de `cecil.yml`. Cecil ne publie pas les fichiers de la racine d'un site : le profil n'a aucun effet sur le site généré. Il est écrit par **Configuration › Rédaction**, et peut aussi s'écrire à la main.

```yaml
mode: writing          # ouvre le site en mode Rédaction (par défaut : Gestion)
contact: Camille Roux  # le responsable du site, affiché aux rédacteurs
writing:
  sections: [blog, ateliers]  # sections modifiables par les rédacteurs (/ pour les pages à la racine de pages/) ; par défaut : toutes
  pages:
    create: true       # créer et dupliquer des pages, depuis le modèle de leur section (par défaut : true)
    delete: false      # renommer, déplacer et supprimer des pages (par défaut : false)
  images: assets/images     # dossier des images importées, dans assets/ ou static/ (par défaut : assets/images)
  files: static/documents   # dossier des fichiers importés, dans static/ (par défaut : static)
  publish: true        # autoriser la publication (par défaut : true)
targets:               # cibles de publication partagées avec les rédacteurs, sans aucun jeton
  - name: Production
    provider: netlify  # netlify, vercel, github ou s3
    site: mon-site     # les réglages de l'hébergeur
```

Toutes les clés sont facultatives : `mode: writing` seul ouvre le site en mode Rédaction, avec toutes ses sections. Une valeur invalide (section inconnue, dossier hors du site, hébergeur inconnu, cible incomplète…) est ignorée avec un avertissement : affiché dans **Configuration › Rédaction** et au-dessus des écrans en mode Gestion. Un fichier illisible laisse le site en mode Gestion, avec l'erreur.

**Configuration › Rédaction** ne réécrit que les entrées modifiées : les commentaires et le reste du fichier sont conservés.

:::tip
Versionnez `.cecil-desktop.yml` avec le site, pour que vos rédacteurs le reçoivent. Il ne contient jamais de jeton : une cible décrit l'hébergeur et ses réglages, et chaque rédacteur connecte son propre compte.
:::

## Cibles partagées

Les cibles du profil sont listées dans la section **Publication** des rédacteurs, avec un badge **Partagée** : ils peuvent y publier, mais pas ajouter, modifier ou supprimer une cible.

La première fois, le rédacteur clique sur **Connecter mon compte…** sur la cible : il choisit l'un de ses comptes de l'hébergeur, ou en ajoute un (voir [Comptes](publishing/index.md#comptes)). Il doit avoir accès au site chez l'hébergeur : il est vérifié, puis chiffré avec le trousseau du système, comme tout compte.

Pour partager une cible, le responsable l'ajoute dans **Publication**, puis la coche dans les **Cibles partagées** de **Configuration › Rédaction**. Une cible partagée se modifie là, pas dans **Publication**.

## Version gratuite et Pro

- Le **mode Rédaction est gratuit**, y compris le formulaire du [schéma de pages](content.md#schema-de-pages) pour le rédacteur.
- Un site ouvert en mode Rédaction par son profil **ne compte pas** dans le site unique de la version gratuite : un rédacteur indépendant qui travaille pour plusieurs clients reste gratuit. Passer un tel site en mode Gestion applique la limite.
- Ouvrir un site en mode Rédaction (`mode`), le responsable et les dossiers des médias sont gratuits. Choisir les **sections modifiables**, les **droits sur les pages** et les **cibles partagées** dans **Configuration › Rédaction** fait partie de [Cecil Desktop Pro](pro.md), pour le responsable. Un rédacteur applique toujours le profil, quelle que soit sa licence.

:::info
Pendant la bêta, toutes les fonctions sont disponibles sans licence.
:::
