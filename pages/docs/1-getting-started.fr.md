---
title: Bien démarrer
description: Installez Cecil Desktop, ouvrez ou créez votre premier site, et repérez-vous dans la fenêtre.
---
# Bien démarrer

Cette page vous guide du téléchargement jusqu'à la preview de votre premier site.

## Prérequis

- **Windows** 10 ou plus récent (x64 ou ARM64)
- **macOS** 12 ou plus récent (Intel ou Apple Silicon)

PHP et Cecil sont embarqués dans l'application : vous n'avez pas à les installer. Linux est prévu.

## Installer

Téléchargez l'installeur de votre système depuis la [section de téléchargement](/fr/#download) du site, puis lancez-le.

:::warning
Cecil Desktop n'est pas encore signé : votre système vous avertit d'un éditeur inconnu.

- **Windows** : dans la fenêtre SmartScreen, cliquez sur **Informations complémentaires**, puis **Exécuter quand même**.
- **macOS** : ouvrez **Réglages Système › Confidentialité et sécurité**, puis cliquez sur **Ouvrir quand même**.

La signature est en cours.
:::

## Ouvrir un site

Au premier lancement, l'écran **Sites** est vide. Pour ajouter un site existant :

- cliquez sur **Ouvrir un dossier** (**Fichier › Ouvrir un dossier…**, `Ctrl/⌘+O`) et choisissez le dossier de votre site Cecil ;
- ou déposez le dossier du site sur la fenêtre.

![L'écran Sites, qui liste les sites avec l'état de leur dernier build et de leur dernière publication](/images/screenshots/sites.png)

Cecil Desktop travaille directement sur vos fichiers : rien n'est déplacé ni converti, et votre site reste un projet Cecil standard, que vous pouvez toujours builder en ligne de commande.

:::tip
Si le dossier ouvert n'est pas encore un site Cecil, Cecil Desktop propose de **créer un site dans ce dossier**.
:::

## Créer un site

Cliquez sur **Nouveau site** (**Fichier › Nouveau site…**, `Ctrl/⌘+N`), puis suivez les 3 étapes de l'assistant :

1. **Emplacement** : le dossier parent et le nom du dossier du site.
2. **Site** : titre, baseline, URL de base (`/`, ou l'URL où le site sera publié), description, auteur et langue principale. Vous pourrez les modifier ensuite dans la configuration.
3. **Point de départ** :
   - **Site vide** : la configuration et une page d'accueil, avec les templates par défaut de Cecil ;
   - **Démonstration** : des pages, templates et assets d'exemple (blog, documentation) ;
   - **Thème** : un thème du catalogue, installé après la création du site.

   Vous pouvez aussi ajouter un workflow GitHub Actions qui déploie le site sur GitHub Pages.

![La dernière étape de l'assistant Nouveau site : le point de départ du site](/images/screenshots/new-site.png)

Cliquez sur **Créer le site** : le site s'ouvre sur son **Aperçu**.

:::info
La version gratuite gère 1 site. [Cecil Desktop Pro](/fr/#pricing) lève cette limite. Pendant la bêta, tout est inclus.
:::

## Se repérer

La fenêtre d'un site comporte 3 zones principales :

- la **barre latérale**, à gauche, liste vos sites et les sections du site ouvert : **Aperçu**, **Contenu**, **Médias**, **Thèmes**, **Publication** et **Configuration** (`Ctrl/⌘+1` à `Ctrl/⌘+6` ; moins en [mode Rédaction](writing-mode.md)). `Ctrl/⌘+B` la replie en une colonne d'icônes ;
- la **zone principale** affiche la section choisie ;
- le panneau **Sortie**, en bas (`Ctrl/⌘+J`), affiche les logs de la preview, des builds, des publications et du diagnostic.

La **palette de commandes** (`Ctrl/⌘+K`) donne accès à vos sites et à toutes les actions, au clavier.

![La palette de commandes, qui liste les sections du site, les sites et les actions](/images/screenshots/palette.png)

## Prévisualiser, builder, publier

Depuis n'importe quelle section d'un site :

| Action | Raccourci | Ce qu'elle fait |
|--------|-----------|-----------------|
| **Preview** | `Ctrl/⌘+P` | Démarre le serveur local de Cecil et ouvre le site dans votre navigateur. Les pages se rechargent quand vous enregistrez un fichier. |
| **Builder** | `Ctrl/⌘+Maj+B` | Génère le site dans son dossier de sortie, avec les logs et les problèmes dans le panneau Sortie. |
| **Publier** | `Ctrl/⌘+Maj+P` | Envoie le site (son dernier build, ou un nouveau) vers sa cible de publication (Netlify, Vercel, GitHub Pages ou AWS S3). |

Pour publier, ajoutez une cible dans la section **Publication** du site, avec un compte d'hébergement configuré dans les **Préférences** (`Ctrl/⌘+,`).

## Mises à jour

Sous Windows, Cecil Desktop télécharge ses mises à jour et les installe au redémarrage. Chaque mise à jour embarque la dernière version de Cecil. Pour vérifier tout de suite, utilisez **Aide › Rechercher des mises à jour…**.

Sous macOS, téléchargez la nouvelle version depuis le site et installez-la par-dessus la précédente.

## Retirer un site de la liste

Dans la barre latérale, faites un clic droit sur un site et choisissez **Retirer de la liste**. Seule l'entrée est retirée : les fichiers du site restent sur votre disque.
