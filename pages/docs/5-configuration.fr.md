---
title: Configuration
description: Éditez la configuration d'un site avec un formulaire, ou en YAML, vérifiée comme Cecil la charge.
---
# Configuration

La section **Configuration** d'un site (`Ctrl/⌘+6`) édite son fichier de configuration (`cecil.yml`), en 4 onglets : **Formulaire**, **Avancé**, **Rédaction** (le [profil du site](#redaction), dans un autre fichier) et **YAML**.

Seules les entrées modifiées sont réécrites : les commentaires et le reste du fichier sont conservés. Un champ vide garde la valeur par défaut de Cecil, affichée en indication.

## Formulaire

![Le formulaire de configuration d'un site](/images/screenshots/config.png)

La table des matières, à droite, mène à chaque groupe d'options :

- **Site** : titre, baseline, URL de base, URL absolues, description, auteur, et **Thème(s)**, séparés par des virgules, dans l'ordre de priorité ;
- **Langues** : la langue principale (et si ses pages sont aussi préfixées, par ex. `/fr/…`), et les autres langues, avec leur code, nom et locale ;
- **Par langue**, quand le site a plusieurs langues : le titre, la baseline, la description, l'auteur, le format des dates et les menus de chaque langue (un champ vide reprend la valeur du site) ;
- **Taxonomies** : leurs noms au pluriel et au singulier (`disabled` pour en désactiver une) ;
- **Menus** : les entrées ajoutées aux pages qui ont une variable `menu` dans leur front matter ;
- **Dates** : leur format et le fuseau horaire ;
- **Listes de pages** : leur tri (date, mise à jour, titre ou poids), leur ordre et leur pagination.

## Avancé

Les options du build : les valeurs par défaut de Cecil conviennent à la plupart des sites.

- **Pages** : le chemin des pages suivantes d'une liste, et le **Contrôle du front matter** (`pages.validation`) : `error` (une page invalide est ignorée), `warning` (la page est conservée, avec un avertissement), `strict` (le build échoue) ou désactivé ;
- **Assets** : empreinte dans le nom des fichiers, minification du CSS et du JavaScript, sortie Sass, qualité et optimisation des images ;
- **Optimisation** des fichiers générés (HTML, CSS, JavaScript, images) ;
- **Cache et sortie** : le cache, et les dossiers du cache et de sortie.

## Rédaction

L'onglet **Rédaction** décrit ce que peuvent faire les rédacteurs du site en [mode Rédaction](writing-mode.md) : si le site s'ouvre en mode Rédaction pour tout le monde, son responsable, les sections modifiables, les droits sur les pages, les dossiers des médias et les cibles de publication partagées. Il est enregistré dans `.cecil-desktop.yml`, à la racine du site (pas dans `cecil.yml`), avec son propre bouton **Enregistrer**.

## YAML

L'onglet **YAML** édite tout le fichier, pour les options qui ne sont pas dans le formulaire (par ex. `pages.schema`). **Vérifier** le contrôle sans l'enregistrer.

## Enregistrer

Quand quelque chose a changé, une barre affiche **Modifications non enregistrées**, avec **Annuler les modifications** et **Enregistrer** (`Ctrl/⌘+S`).

Avant d'écrire le fichier, la configuration est vérifiée avec le schéma de Cecil : si elle est invalide, ou utilise des options dépréciées, elle n'est pas enregistrée, et **Aller à la ligne …** ouvre le YAML à la ligne en cause. Un onglet avec des erreurs affiche leur nombre.

:::info
Les options sont documentées dans la [documentation de la configuration de Cecil](https://cecil.app/documentation/configuration/).
:::
