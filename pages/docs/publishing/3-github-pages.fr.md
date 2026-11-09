---
title: GitHub Pages
description: Publiez un site sur GitHub Pages avec un fine-grained token.
---
# GitHub Pages

## Jeton

GitHub Pages utilise un **fine-grained token** : dans GitHub, ouvrez **Settings › Developer settings › Personal access tokens › Fine-grained tokens** (le lien **Créer un jeton** du formulaire ouvre cette page), puis :

1. sous **Repository access**, choisissez **Only select repositories** et sélectionnez le dépôt du site ;
2. sous **Permissions**, donnez l'accès **Read and write** à **Contents** et **Pages**.

Le compte est affiché avec votre identifiant GitHub.

## Réglages de la cible

| Champ | Description |
|-------|-------------|
| **Dépôt** | Le dépôt, sous la forme `propriétaire/dépôt`. |
| **Branche** | La branche publiée : `gh-pages` par défaut. |
| **Domaine personnalisé** | Facultatif : par ex. `www.example.com`. |

À l'enregistrement de la cible, Cecil Desktop vérifie que le jeton peut écrire dans le dépôt.

## Publication

Chaque publication remplace le contenu de la branche par le site buildé, en un seul commit (*Publish with Cecil Desktop*) :

- la branche est créée si elle n'existe pas ;
- un fichier `.nojekyll` est ajouté, pour que GitHub ne traite pas le site avec Jekyll ;
- un fichier `CNAME` est ajouté si vous indiquez un domaine personnalisé ;
- GitHub Pages est activé sur la branche si besoin, ou basculé sur elle s'il publiait une autre branche.

Seuls les fichiers que GitHub n'a pas encore sont envoyés, et les fichiers retirés du site sont retirés de la branche. Si rien n'a changé, aucun commit n'est fait.

:::warning
La branche publiée est écrasée à chaque publication : n'utilisez pas la branche de vos sources (par ex. `main`), gardez une branche dédiée comme `gh-pages`.
:::

:::tip
À la création d'un site, Cecil Desktop peut aussi ajouter un workflow GitHub Actions qui le builde et le déploie sur GitHub Pages à chaque push : une alternative à la publication depuis l'application, si votre site est dans un dépôt GitHub.
:::
