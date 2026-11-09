---
title: Thèmes
description: Parcourez, installez, mettez à jour et supprimez les thèmes Cecil publiés sur Packagist, sans Composer.
---
# Thèmes

La section **Thèmes** d'un site (`Ctrl/⌘+3`) liste les thèmes installés dans le site, et le catalogue des thèmes Cecil.

## Catalogue

Le catalogue liste les thèmes publiés sur [Packagist](https://packagist.org/?type=cecil-theme), avec leur capture d'écran, leur version et leur description. Cherchez-y, ou filtrez-le :

- **Thèmes visuels** (par défaut) : les gabarits et les styles d'un site ;
- **Composants** : une fonction ajoutée à un autre thème, comme un moteur de recherche ou des icônes.

**Actualiser le catalogue** le recharge (il est conservé 6 heures).

![Le catalogue des thèmes, avec leur capture d'écran, leur version et leur description](/images/screenshots/themes.png)

## Installer un thème

Cliquez sur **Installer** sur un thème : il est téléchargé dans le dossier `themes/` du site, avec les thèmes dont il dépend, et ajouté en premier aux **Thème(s)** de la configuration, ce qui lui donne la priorité la plus haute. Composer n'est pas nécessaire.

:::tip
Un thème composant doit souvent être placé après le thème visuel qu'il complète : changez l'ordre dans **Configuration › Site › Thème(s)**.
:::

## Thèmes installés

Chaque thème installé affiche sa version et sa source :

- **installé par l'app** : **Mettre à jour** apparaît quand une nouvelle version est disponible ;
- **installé par Composer**, ou **local** (un thème à vous) : l'application signale quand une nouvelle version est disponible, mais ne les met pas à jour.

L'interrupteur **Activé** ajoute le thème à la configuration (en dernier, la priorité la plus basse) ou l'en retire. Le bouton corbeille retire le thème de la configuration et supprime son dossier.

## Sites gérés avec Composer

Si les thèmes d'un site sont installés avec Composer (son `composer.json` requiert `cecil/theme-installer` ou un thème), Cecil Desktop ne les installe pas : le catalogue affiche la commande `composer require` à lancer, et les thèmes installés peuvent toujours être activés ou désactivés.
