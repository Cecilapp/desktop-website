---
title: AWS S3 / CloudFront
description: Publiez un site dans un bucket Amazon S3, avec une distribution CloudFront en option.
---
# AWS S3 / CloudFront

## Clés

AWS utilise les clés (**Access key ID** et **Secret access key**) d'un utilisateur IAM. Créez un utilisateur dédié à la publication, avec ces droits sur le bucket :

- `s3:ListBucket`
- `s3:PutObject`
- `s3:DeleteObject`
- `cloudfront:CreateInvalidation`, si vous utilisez CloudFront

Un utilisateur limité à son bucket, qui ne peut pas lister les autres buckets, est accepté. Le compte est affiché sous la forme *AWS (ABCD…WXYZ)*, avec le début et la fin de la clé d'accès.

## Réglages de la cible

| Champ | Description |
|-------|-------------|
| **Bucket** | Le nom du bucket. |
| **Région** | La région du bucket, par ex. `eu-west-3`. |
| **Préfixe** | Facultatif : un dossier du bucket, par ex. `docs/`. |
| **Distribution CloudFront** | Facultatif : l'ID de la distribution, pour invalider son cache après chaque publication. |
| **URL du site** | Facultatif : l'URL publique du site, affichée après chaque publication. |

:::warning
Le bucket doit exister : Cecil Desktop ne le crée pas, et ne règle ni son accès public ni son hébergement de site statique. Configurez-les d'abord dans AWS.
:::

## Publication

Les fichiers sont comparés aux objets du bucket (sous le préfixe) :

- seuls les fichiers nouveaux et modifiés sont envoyés, avec leur type de contenu ;
- les objets qui ne sont plus dans le site sont **supprimés** ;
- les pages HTML sont envoyées avec des en-têtes de cache qui font vérifier aux navigateurs s'il existe une nouvelle version, les autres fichiers sont mis en cache 1 jour ;
- si une distribution CloudFront est indiquée et que quelque chose a changé, son cache est invalidé.

:::caution
Les objets sous le préfixe qui ne sont pas dans le site sont supprimés : ne publiez pas dans un bucket (ou un préfixe) qui contient d'autres fichiers.
:::

Après la publication, la cible affiche l'**URL du site**, ou l'URL du fichier `index.html` dans le bucket.
