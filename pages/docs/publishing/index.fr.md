---
title: Publication
description: Publiez votre site sur Netlify, Vercel, GitHub Pages ou AWS S3, en un clic, via leurs API.
weight: 4
---
# Publication

Cecil Desktop publie votre site sur **Netlify**, **Vercel**, **GitHub Pages** ou **AWS S3 / CloudFront**, directement via leurs API : aucun outil en ligne de commande (git, Netlify, Vercel ou AWS) n'est nécessaire. Seuls les fichiers modifiés sont envoyés.

## Cibles et comptes

Une **cible** indique où un site est publié : un hébergeur, ses réglages (site, projet, dépôt ou bucket) et le **compte** utilisé pour s'y connecter. Un site peut avoir plusieurs cibles, par ex. *Production* et *Préproduction* <span class="tag">Pro</span>.

Un compte contient le jeton (ou les clés) d'un hébergeur. Il est enregistré une fois et partagé entre vos sites : ajoutez-le avec votre première cible, ou dans **Préférences › Comptes**. Les jetons sont vérifiés auprès de l'hébergeur, puis chiffrés avec le trousseau du système (Gestionnaire d'identification Windows, Trousseau macOS) ; ils ne sont jamais écrits dans vos sites.

:::info
La version gratuite permet 1 cible par site. [Cecil Desktop Pro](../pro.md) en permet plusieurs. Le nombre de comptes n'est pas limité.
:::
Une cible peut être **partagée** avec les rédacteurs du site, par son profil : chaque rédacteur y publie alors avec son propre compte. Voir [Mode Rédaction](../writing-mode.md#cibles-partagees).

## Ajouter une cible

1. Ouvrez la section **Publication** du site (`Ctrl/⌘+5`) et cliquez sur **Nouvelle cible**.
2. Choisissez l'**Hébergeur**, et donnez un nom à la cible (par ex. *Production*).
3. Renseignez les réglages de l'hébergeur : voir [Netlify](netlify.md), [Vercel](vercel.md), [GitHub Pages](github-pages.md) ou [AWS S3](aws-s3.md).
4. Si besoin, indiquez une **URL de base du build**, pour publier avec une autre URL que celle de la configuration (par ex. pour une cible de préproduction).
5. Choisissez un compte existant, ou **Nouveau compte…** : nommez-le, collez son jeton (le lien **Créer un jeton** ouvre la page de l'hébergeur), et cliquez sur **Enregistrer**.

![Le formulaire Nouvelle cible, pour Netlify](/images/screenshots/publish-target.png)

Le jeton et la cible sont vérifiés auprès de l'hébergeur avant d'être enregistrés : si quelque chose ne va pas (jeton invalide, droit manquant, dépôt inconnu…), une erreur s'affiche et rien n'est enregistré.

## Publier

![Une cible de publication Netlify, avec l'historique de ses publications](/images/screenshots/publish.png)

Cliquez sur **Publier** sur une cible, ou publiez sur la cible par défaut (la dernière publiée) depuis la barre d'outils, le menu **Site › Publier** ou `Ctrl/⌘+Maj+P`. Le menu du bouton de la barre d'outils liste toutes les cibles du site.

Avant de publier, Cecil Desktop propose de **Publier ce build**, le dernier build du site, sans le refaire, quand il peut être réutilisé : un build réussi, sans erreurs, brouillons, dry-run ni page seule, avec l'URL de base de la cible. Si des fichiers du site ont été modifiés depuis ce build, il vous prévient : choisissez **Rebuilder et publier** pour inclure vos modifications.

Sinon, le site est buildé pour la production (sans les brouillons) dans son propre dossier (`.cecil/deploy/`), puis envoyé. Si le build a des erreurs, la publication est annulée.

Pendant l'envoi, la cible affiche la progression (fichiers envoyés sur le total) et le log défile dans l'onglet **Publication** du panneau **Sortie**. Une fois terminé, la cible affiche l'URL publiée : cliquez dessus pour ouvrir le site.

:::tip
Vous pouvez continuer à travailler pendant la publication d'un site : elle se déroule en arrière-plan.
:::

## Historique

**Historique**, sous chaque cible, liste ses 10 dernières publications avec leur date, statut, build et nombre de fichiers envoyés ; **Log** affiche le log d'une publication.

Pour supprimer une cible, utilisez son menu **…**, puis **Supprimer** : son historique est supprimé, mais pas le site publié.

## Comptes

**Préférences › Comptes** (`Ctrl/⌘+,`) liste vos comptes d'hébergeurs, avec le nombre de cibles qui les utilisent et leur état (**Valide**, **Non vérifié** ou **Échec**).

![Les préférences Comptes, qui listent un compte Netlify avec son jeton vérifié](/images/screenshots/accounts.png)

Faites un clic droit sur un compte pour :

- **Vérifier** à nouveau son jeton ;
- le **Renommer** ;
- **Remplacer le jeton**, par ex. quand il expire ;
- le **Supprimer** : les cibles qui l'utilisent sont conservées, mais doivent être reliées à un autre compte avant de publier à nouveau.

:::warning
Les jetons sont chiffrés pour votre compte utilisateur sur cet ordinateur : ils ne peuvent pas être lus par un autre utilisateur ou sur un autre ordinateur, vous devez donc ajouter à nouveau vos comptes sur un nouvel ordinateur.
:::

## Dépannage

| Message | Que faire |
|---------|-----------|
| *Aucun compte associé à cette cible.* | Le compte de la cible a été supprimé : modifiez la cible et choisissez un autre compte. |
| *La sortie du build #… n'est plus disponible* | Le dossier de sortie du build a été supprimé : publiez à nouveau avec un nouveau build. |
| *Le build a produit … erreur(s) : publication annulée.* | Corrigez les erreurs du build (voir l'onglet **Build** du panneau **Sortie**), puis publiez à nouveau. |
| *Interrompue (l'application a été fermée).* | L'application a été fermée pendant la publication : publiez à nouveau. |
| *… : erreur 401* ou *403* | Le jeton est invalide, a expiré ou n'a pas un droit nécessaire : vérifiez le compte dans **Préférences › Comptes**, et remplacez son jeton si besoin. |
