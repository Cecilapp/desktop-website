---
title: Synchronisation Git
description: Ouvrez un site depuis son dépôt Git, récupérez les modifications des autres, envoyez les vôtres et résolvez les conflits, sans Git sur votre ordinateur.
weight: 8.5
---
# Synchronisation Git

Quand un site est un dépôt Git (GitHub, GitLab, Gitea, Codeberg…), Cecil Desktop le garde synchronisé : **récupérez** les modifications des autres, **envoyez** les vôtres, et choisissez quelle version garder quand un même fichier a été modifié des deux côtés. Git n'a pas besoin d'être installé sur l'ordinateur, et l'application parle de modifications et de versions, pas de commits ni de branches.

Le dépôt reste un dépôt Git standard : le responsable du site peut continuer d'utiliser un terminal ou un éditeur de code sur le même dossier.

:::info
La synchronisation Git est gratuite, en mode Gestion comme en [mode Rédaction](writing-mode.md) : l'ouverture d'un site depuis un dépôt, l'état du dépôt, **Récupérer**, **Envoyer** et la résolution d'une fusion.
:::

## Ouvrir un site depuis un dépôt Git

Pour travailler sur un site qui est dans un dépôt, sans l'avoir encore sur votre ordinateur :

1. Sur l'écran **Sites**, cliquez sur **Depuis un dépôt Git** (ou **Fichier › Ouvrir depuis un dépôt Git…**).
2. Saisissez l'**Adresse du dépôt** : une adresse HTTPS, ou l'adresse SSH d'un dépôt sur GitHub, GitLab, Bitbucket ou Codeberg (l'application utilise son équivalent HTTPS).
3. Choisissez le **Compte** : celui du propriétaire du dépôt est proposé ; **Aucun (dépôt public)** pour un dépôt public. Pour un dépôt privé, choisissez un compte qui y a accès en écriture, pour pouvoir ensuite envoyer vos modifications, ou **Connecter un compte…** (voir [Comptes](#comptes)).
4. Vérifiez le **Dossier où mettre le site** et le **Nom du dossier** (le nom du dépôt par défaut).
5. Cliquez sur **Télécharger et ouvrir**.

Le site est téléchargé sans son historique, puis ouvert comme n'importe quel site : en [mode Rédaction](writing-mode.md) si son profil le dit. Un dépôt sans site Cecil à sa racine (pas de `cecil.yml`) est signalé. Si le téléchargement échoue, ce qu'il a écrit est effacé, pour pouvoir réessayer.

:::tip
Pour confier un site à un rédacteur, envoyez-lui l'adresse de son dépôt : le profil du site (`.cecil-desktop.yml`) arrive avec lui.
:::

## État du dépôt

La **barre d'état** affiche la branche du dépôt, le nombre d'enregistrements à envoyer (↑) et à récupérer (↓), et le nombre de modifications faites sur cet ordinateur. Le dépôt est lu quand vous ouvrez un écran du site et quand la fenêtre reprend le focus, et vérifié en ligne toutes les quelques minutes ; un avertissement apparaît quand le site ne peut pas être synchronisé, ou que la vérification a échoué.

Cliquez dessus pour ouvrir l'onglet **Synchronisation** du panneau **Sortie** : les fichiers modifiés sur cet ordinateur (ajoutés, modifiés ou supprimés), **Actualiser**, la raison pour laquelle l'application ne synchronise pas le dépôt le cas échéant, et les erreurs expliquées, avec **Connecter un compte…** ou **Remplacer le jeton** quand le compte est en cause.

## Récupérer les modifications

Pour obtenir les modifications des autres, utilisez le bouton **Récupérer** de la barre d'outils, **Site › Récupérer les modifications** ou l'onglet **Synchronisation**. Le bouton de la barre d'outils est **Envoyer** quand vous avez des modifications à envoyer, et **Récupérer** sinon : l'autre action est dans son menu.

- Si vos modifications sur cet ordinateur portent sur d'autres fichiers, elles sont gardées telles quelles.
- Si elles portent sur les mêmes fichiers, elles sont d'abord enregistrées, puis fusionnées avec les modifications du dépôt. Si les mêmes lignes ont été modifiées des deux côtés, voir [Conflits](#conflits).

Si la page ouverte dans l'éditeur a des modifications non enregistrées, l'application vous le demande d'abord. À la fin, un message indique combien de fichiers ont été mis à jour (ou que **Le site est déjà à jour**), et la page ouverte est relue si elle a été mise à jour.

## Envoyer mes modifications

Pour partager vos modifications, utilisez le bouton **Envoyer** de la barre d'outils (avec le nombre de modifications à envoyer), **Site › Envoyer mes modifications…** ou l'onglet **Synchronisation** ; en mode Rédaction, l'accueil du site indique aussi ce qu'il reste à envoyer.

Le dialogue liste les fichiers modifiés, et propose une **Description des modifications** d'après les titres des pages, par ex. *Modifie « À propos », ajoute 2 médias* : les autres la verront dans l'historique du site.

Cliquez sur **Envoyer** : vos modifications sont enregistrées, fusionnées avec ce qui attend sur le dépôt, puis envoyées. Si le dépôt a changé pendant l'envoi, envoyez à nouveau.

:::info
L'**Auteur de vos modifications** (un nom et une adresse e-mail) signe ce que vous envoyez. Il vient du dépôt s'il en définit un, sinon de **Préférences › Général**, sinon de votre configuration Git (`~/.gitconfig`). S'il n'y en a aucun, l'application le demande une fois, et le garde.
:::

## Conflits

Quand un fichier a été modifié à la fois sur cet ordinateur et sur le dépôt, un bandeau le signale, par ex. *Camille a aussi modifié 2 fichiers que vous avez modifiés : choisissez quelle version garder*. Rien n'est perdu : vos modifications sont enregistrées sur cet ordinateur, et une **Fusion en cours** est affichée jusqu'à votre choix. Les pages en conflit sont signalées dans l'arborescence de **Contenu**, et sur l'accueil du site en mode Rédaction.

Pour chaque fichier, le dialogue montre les deux versions côte à côte :

- **Garder ma version** ;
- **Prendre celle de Camille** (ou **Prendre celle du dépôt**) ;
- **Modifier la page** : l'éditeur montre les passages en conflit entre des lignes `<<<<<<<` et `>>>>>>>` ; gardez le texte voulu, retirez ces lignes, puis cliquez sur **C'est réglé**.

Un fichier qui n'est pas du texte (une image…) ne peut garder que l'une ou l'autre version. Quand le dernier fichier est réglé, la fusion est terminée et le dialogue **Envoyer** s'ouvre, pour que les autres la récupèrent.

**Annuler la fusion** (après confirmation) remet les fichiers à votre version : les modifications du dépôt pourront être récupérées plus tard. Tant que la fusion n'est ni terminée ni annulée, **Récupérer** et **Envoyer** attendent, et mieux vaut ne pas builder ni publier le site.

## Comptes

Envoyer des modifications demande un compte qui a accès au dépôt en écriture, tout comme télécharger un dépôt privé. Le jeton du compte est chiffré avec le trousseau du système, et jamais écrit dans le site.

- **GitHub** : le compte GitHub utilisé pour [publier](publishing/github-pages.md) convient aussi, avec un jeton autorisé à écrire le contenu du dépôt.
- **Autres hébergeurs** (GitLab, Gitea, Forgejo, Codeberg, Bitbucket…) : ajoutez un compte **Git (HTTPS)** dans **Préférences › Comptes**, avec l'**Adresse d'un dépôt**, votre **Identifiant** et un jeton d'accès personnel autorisé à écrire dans le dépôt (GitLab : `write_repository` ; Bitbucket : un mot de passe d'application). L'adresse du dépôt sert à vérifier l'accès, et donne l'hôte du compte.

Le compte d'un site est choisi parmi les comptes de l'hôte de son dépôt, celui du propriétaire du dépôt d'abord. **Vérifier** et **Remplacer le jeton** fonctionnent comme pour les [comptes de publication](publishing/index.md#comptes).

## Limites

Cecil Desktop n'est pas un client Git : pas de branches à changer, pas d'historique à parcourir, pas de rebase. Un dépôt dans un état que l'application ne gère pas est signalé, et laissé à Git :

- pas de dépôt distant (`origin`), ou une adresse qui n'est ni HTTPS ni SSH sur un hôte connu ;
- sur aucune branche, ou une opération Git en cours (rebase, cherry-pick…) ;
- un dossier qui fait partie d'un autre dépôt (worktree ou sous-module) ;
- un dépôt qui utilise Git LFS.

Le site doit être à la racine de son dépôt.
