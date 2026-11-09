---
title: Netlify
description: Publiez un site sur Netlify avec un jeton d'accès personnel.
---
# Netlify

## Jeton

Netlify utilise un **personal access token** : dans Netlify, ouvrez **User settings › Applications › Personal access tokens** (le lien **Créer un jeton** du formulaire ouvre cette page), et créez un nouveau jeton.

Le compte est affiché avec l'e-mail de votre utilisateur Netlify.

## Réglages de la cible

| Champ | Description |
|-------|-------------|
| **Site** | Le nom ou l'ID d'un site de votre compte. |

Si aucun site de votre compte ne porte ce nom, un nouveau site est créé avec ce nom à la première publication, à l'adresse `https://<nom>.netlify.app/`. Le nom doit être unique sur tout Netlify : s'il est déjà pris, choisissez-en un autre.

## Publication

Netlify indique les fichiers qu'il n'a pas encore : seuls ceux-là sont envoyés. Cecil Desktop attend ensuite que Netlify traite le déploiement (jusqu'à 5 minutes), et affiche l'URL du déploiement.

:::tip
Un site créé par Cecil Desktop est un site Netlify normal : vous pouvez régler son domaine personnalisé, ses redirections ou ses formulaires dans Netlify.
:::
