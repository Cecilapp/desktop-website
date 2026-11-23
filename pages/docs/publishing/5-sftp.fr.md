---
title: SFTP
description: Publiez un site sur votre propre serveur (hébergement mutualisé, VPS) en SFTP, avec un mot de passe ou une clé privée.
---
# SFTP

Publiez sur un serveur à vous, un hébergement mutualisé ou un VPS, en **SFTP** (SSH). Aucun client SSH ni autre outil n'est nécessaire sur votre ordinateur.

## Compte

Utilisez les accès SFTP (ou SSH) donnés par votre hébergeur :

| Champ | Description |
|-------|-------------|
| **Hôte** | L'adresse du serveur, par exemple `sftp.example.com` (`hôte:port` et `sftp://` sont acceptés). |
| **Port** | Facultatif : `22` par défaut. |
| **Identifiant** | Votre identifiant SFTP. |
| **Mot de passe** | Le mot de passe, ou laissez-le vide et utilisez une clé privée. |
| **Clé privée** | Une clé privée au format OpenSSH ou PuTTY, collée en entier (`-----BEGIN OPENSSH PRIVATE KEY-----`…). |
| **Phrase de passe de la clé** | Facultatif : la phrase de passe de la clé privée. |
| **Empreinte de la clé du serveur** | Facultatif : l'empreinte donnée par votre hébergeur (`SHA256:…`). |

Le compte s'affiche `identifiant@hôte`. Il faut un mot de passe ou une clé privée ; avec les deux, la clé est essayée en premier.

**La clé du serveur est vérifiée**, comme le fait `ssh` : son empreinte est retenue à l'ajout du compte (ou celle que vous avez saisie est vérifiée), puis contrôlée à chaque connexion. Si le serveur présente une autre clé, la publication est refusée : si le changement est prévu (serveur réinstallé, changement d'hébergeur), cliquez sur **Remplacer le jeton…** et saisissez à nouveau le compte pour accepter la nouvelle clé.

## Réglages de la cible

| Champ | Description |
|-------|-------------|
| **Dossier** | Le dossier du site sur le serveur, depuis le dossier de connexion du compte (par exemple `public_html`) ou en chemin absolu ; vide : le dossier de connexion. Il est créé s'il n'existe pas. |
| **URL du site** | Facultatif : l'adresse publique du site, affichée après chaque publication. |

## Publication

SFTP ne dit pas si un fichier a changé : Cecil Desktop garde la liste des fichiers publiés, avec leur SHA-1, dans un fichier `.cecil-desktop-deploy.json` à la racine du dossier.

- Seuls les fichiers nouveaux et modifiés sont envoyés ; les fichiers que le site n'a plus sont **supprimés**, avec les dossiers qu'ils laissent vides.
- La première publication envoie tous les fichiers et ne supprime rien : les fichiers déjà présents dans le dossier ne viennent peut-être pas du site.
- Les fichiers sont envoyés d'abord, puis les pages, pour qu'une page ne s'affiche jamais sans ses styles ; la liste est écrite en dernier. Une publication interrompue est complétée par la suivante.
- La liste est sur le serveur : elle vaut pour tous les ordinateurs et pour les rédacteurs qui publient sur une [cible partagée](../writing-mode.md#cibles-partagees). Elle ne contient que les chemins et les SHA-1 de fichiers déjà publics.

:::warning
Publiez dans un dossier réservé au site : les fichiers que la liste nomme et que le site n'a plus sont supprimés.
:::

## Limites

- Les fichiers sont écrits en place : pendant une publication, un visiteur peut recevoir un fichier en cours d'écriture.
- Les clés d'un agent SSH (Pageant, ssh-agent) et `~/.ssh/config` ne sont pas utilisés : collez la clé dans le formulaire.
- FTP et FTPS ne sont pas pris en charge.
