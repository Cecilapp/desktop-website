---
title: Vercel
description: Publiez un site sur Vercel avec un jeton d'accès.
---
# Vercel

## Jeton

Dans Vercel, ouvrez **Account settings › Tokens** (le lien **Créer un jeton** du formulaire ouvre cette page), et créez un jeton avec accès à l'équipe du projet.

Le compte est affiché avec l'e-mail de votre utilisateur Vercel.

## Réglages de la cible

| Champ | Description |
|-------|-------------|
| **Projet** | Le nom du projet Vercel. |
| **Équipe** | Facultatif : l'ID (`team_…`) ou le slug de l'équipe, pour un projet d'équipe. |

À l'enregistrement de la cible, seul l'accès au compte (ou à l'équipe) est vérifié : le projet est créé à la première publication s'il n'existe pas.

## Publication

Le site est déployé en production, comme un site statique : Vercel ne lance aucune commande de build ou d'installation, les fichiers buildés par Cecil sont publiés tels quels. Seuls les fichiers que Vercel n'a pas encore sont envoyés, puis Cecil Desktop attend le déploiement (jusqu'à 5 minutes) et affiche l'URL du projet.
