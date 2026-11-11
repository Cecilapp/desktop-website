---
title: Contenu
description: Parcourez les pages d'un site, éditez leur Markdown et leur front matter, ajoutez des images, et prévisualisez le résultat.
---
# Contenu

La section **Contenu** d'un site (`Ctrl/⌘+2`) est l'endroit où vous écrivez : l'arborescence des pages à gauche, l'éditeur Markdown au centre, et le **Front matter** et le **Plan** de la page à droite.

![L'éditeur Markdown, avec l'arborescence des pages et la page rendue](/images/screenshots/content.png)

## Arborescence des pages

L'arborescence liste les pages du dossier `pages/`, dossiers en premier. Chaque page affiche son titre (ou son nom de fichier : basculez avec le bouton de la barre d'outils), et des badges :

- une icône d'œil barré pour un **brouillon** (`draft: true` ou `published: false`) ;
- la **langue** d'une page traduite (par ex. `about.fr.md`) ;
- la **date** de la page ;
- une icône d'alerte rouge si son front matter est **invalide**.

**Filtrer…** cherche dans les chemins et les titres. Les flèches du clavier déplacent dans l'arborescence, et ouvrent ou ferment les dossiers.

Faites un clic droit sur une page pour ses actions :

| Action | Raccourci | Description |
|--------|-----------|-------------|
| **Ouvrir** | | Ouvre la page dans l'éditeur. |
| **Voir dans la preview** | | Ouvre la page dans le navigateur, si la [preview](build-preview-diagnosis.md#preview) est lancée. |
| **Ouvrir dans l'éditeur externe** | | Ouvre le fichier dans votre éditeur (voir les [Préférences](preferences.md#editeur)). |
| **Afficher dans l'Explorateur / le Finder** | | Affiche le fichier dans le gestionnaire de fichiers. |
| **Renommer…** | `F2` | Renomme la page, ou la déplace : saisissez un autre dossier dans son chemin. |
| **Dupliquer** | `Ctrl/⌘+D` | Copie la page à côté (`nom-copie.md`), et ouvre la copie. |
| **Mettre à la corbeille** | `Suppr` | Met le fichier à la corbeille du système, d'où vous pouvez le restaurer. |

## Créer une page

Cliquez sur **+** (**Nouvelle page**) au-dessus de l'arborescence, et saisissez le chemin du fichier dans `pages/`, par ex. `blog/mon-article.md` : le nom est converti en slug, et la page est créée avec `cecil new:page`, à partir du modèle de sa section s'il y en a un (`models/`). **Préfixer le nom par la date du jour** ajoute `AAAA-MM-JJ-` devant.

:::tip
Pour traduire une page, dupliquez-la (ou créez une page) avec le code de la langue avant l'extension : `about.fr.md` est la version française de `about.md`.
:::

## Écrire

L'éditeur colore la syntaxe Markdown. Sa barre d'outils met en forme le texte : titres, **gras** (`Ctrl/⌘+B`), *italique* (`Ctrl/⌘+I`), barré, code (`Ctrl/⌘+E`), lien, image, listes, liste de tâches, citation, bloc de code, tableau et séparateur. Cliquez à nouveau sur un bouton pour retirer sa mise en forme. Les boutons qui ne tiennent pas passent dans le menu **…**.

Le sélecteur **Affichage** change la disposition, conservée pour les pages suivantes :

- **Éditeur** : le Markdown seul ;
- **Côte à côte** : le Markdown et la page rendue, qui défile avec l'éditeur ;
- **Rendu** : la page rendue seule.

La page rendue est convertie comme le fait Cecil (options Markdown du site, notes, coloration du code) et rafraîchie pendant la saisie, mais sans les templates du site : pour voir la page dans sa mise en page, utilisez **Voir dans la preview** (icône d'œil), une fois la preview lancée.

Le **mode concentration** (`Ctrl/⌘+Maj+Entrée`, ou le menu **…**) masque tout sauf le texte ; `Échap` en sort.

La barre d'état affiche le nombre de mots, le temps de lecture estimé et la position du curseur.

## Enregistrer

Enregistrez avec **Enregistrer** ou `Ctrl/⌘+S`. Un point à côté du titre signale des modifications non enregistrées : Cecil Desktop demande avant de les abandonner quand vous ouvrez une autre page ou quittez l'écran. Il n'y a pas d'enregistrement automatique.

Seules les variables modifiées du front matter sont réécrites : le reste, commentaires compris, est conservé.

:::warning
Les modifications faites à une page ouverte dans un autre éditeur ne sont pas rechargées : rouvrez la page pour les voir.
:::

## Front matter

L'onglet **Front matter** présente les variables de la page sous forme de formulaire :

![L'onglet Front matter, à côté de l'éditeur Markdown](/images/screenshots/frontmatter.png)

- **Titre**, **Description**, **Date** (`AAAA-MM-JJ`) et **Brouillon** sont toujours affichés ; les champs vides ne sont pas écrits dans le fichier ;
- les **taxonomies** du site (par ex. les tags) sont des listes de termes : saisissez un terme puis `Entrée` ou `,` pour l'ajouter, `×` pour le retirer ;
- **Ajouter une variable** ajoute une autre variable de Cecil : publiée, planification, exclue des listes, mise à jour, menus, poids, template, chemin, slug, alias, redirection, formats de sortie, langue, référence de traduction… ;
- **Autres variables (YAML)** contient les autres variables, en YAML (par ex. `author: Jane`).

Le front matter est vérifié comme le fait Cecil, pendant la saisie, avec les messages à côté des champs. Selon l'option `pages.validation` du site (voir [Configuration](configuration.md#avance)), une page invalide ne peut pas être enregistrée (`error`, par défaut, et `strict`), ou est enregistrée avec un avertissement (`warning`).

Si le front matter n'est pas en YAML, ou ne peut pas être lu, tout le fichier est édité comme du texte.

### Schéma de pages

<span class="tag">Pro</span> Si le site définit un schéma de ses pages (`pages.schema` dans la configuration), ses variables sont aussi présentées comme des champs de formulaire, avec leur type (texte, liste de valeurs, nombre, interrupteur, date, liste…), leur valeur par défaut et un badge **Requis** : les variables communes sous **Variables du site**, celles de la section sous **Variables de « section »**.

Dans la version gratuite, ces variables restent dans **Autres variables (YAML)**, et sont toujours vérifiées ; en [mode Rédaction](writing-mode.md), le formulaire est gratuit.

## Plan

L'onglet **Plan** liste les titres de la page et met en évidence celui en cours : cliquez sur un titre pour vous y rendre.

Le panneau de droite se masque ou s'affiche avec le bouton à la fin de la barre de l'éditeur. Quand la fenêtre est étroite, il s'ouvre par-dessus l'éditeur.

## Images

Pour ajouter une image à une page :

- **déposez**-la sur l'éditeur ;
- **collez**-la ;
- ou cliquez sur **Insérer une image** dans la barre d'outils : choisissez une image du site (dans `assets/` et `static/`), **Importer…** un ou plusieurs fichiers, ou insérez-en une **Par son URL**.

![La boîte de dialogue Insérer une image, avec les images du site](/images/screenshots/images.png)

Les images importées sont copiées dans le dossier `assets/images/` du site, avec un nom converti en slug, et insérées sous la forme `![alt](/images/nom.jpg)`. Une image déjà importée est réutilisée, pas copiée à nouveau.

Formats acceptés : AVIF, GIF, JPEG, PNG, SVG et WebP, jusqu'à 12 Mo.

:::tip
Les images et les fichiers du site se gèrent aussi dans la section [Médias](#medias).
:::

## Médias

La section **Médias** d'un site (`Ctrl/⌘+3`) liste ses médias, en 2 onglets :

- **Images** : les images de `assets/` et `static/` (tous deux sont servis à la racine du site, leurs dossiers sont donc fusionnés) ;
- **Fichiers** : les autres fichiers de `static/` (PDF, documents…).

Chaque onglet s'ouvre sur le dossier où vont les nouveaux médias : `assets/images/` et `static/` par défaut, ou les dossiers fixés par le [profil du site](writing-mode.md#le-profil-du-site). Parcourez les dossiers, cherchez dans tous les dossiers, et affichez les médias en aperçu ou en liste.

Pour ajouter des médias, **déposez** des fichiers sur l'écran, ou cliquez sur **Importer des images…** / **Importer des fichiers…** (jusqu'à 12 Mo par fichier) : ils sont copiés dans le dossier affiché s'il se trouve dans le dossier du profil, sinon dans le dossier du profil lui-même.

Sélectionnez un média pour voir son **Adresse sur le site**, les pages qui l'utilisent (cliquez sur l'une d'elles pour l'ouvrir), et **Copier le Markdown** pour l'insérer dans une page. **Mettre à la corbeille** vous prévient d'abord si des pages l'utilisent.

En [mode Rédaction](writing-mode.md), la section Médias ne montre que les dossiers du profil.
