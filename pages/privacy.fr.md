---
title: Politique de confidentialité
description: Ce que Cecil Desktop envoie, à qui, et ce qui reste sur votre ordinateur.
---
# Politique de confidentialité

_Dernière mise à jour : 11 novembre 2026_

Cecil Desktop fonctionne sur votre ordinateur : pas de compte, pas de mesure d'audience, pas de pistage. Cette page liste tout ce que l'application envoie sur Internet, et pourquoi.

Responsable du traitement : Aperture Lab, entreprise individuelle d'Arnaud Ligny, Montreuil, France. Contact : [contact@aperturelab.fr](mailto:contact@aperturelab.fr).

## Ce qui reste sur votre ordinateur

- Vos sites et leurs fichiers.
- Les données de l'application (liste des sites, historique des builds et des publications, réglages), dans une base de données locale.
- Les jetons de vos comptes de publication, chiffrés avec le trousseau du système.

## Ce que l'application envoie

| Quand | Quoi | À qui |
|-------|------|-------|
| Vous publiez un site | Les fichiers du site et le jeton du compte | Le fournisseur choisi (Netlify, Vercel, GitHub, Amazon S3…) |
| Vous installez un thème | Les requêtes du thème | [Packagist](https://packagist.org) et l'hébergeur du thème (ex. GitHub) |
| L'application recherche des mises à jour | Les fichiers demandés, votre adresse IP | desktop.cecil.app ([Netlify](https://www.netlify.com), [Cloudflare R2](https://www.cloudflare.com)) |
| Vous activez, vérifiez ou désactivez une licence (Pro) | La clé de licence, l'identifiant de son activation, le nom de l'ordinateur et son système | desktop.cecil.app, puis [Polar](https://polar.sh) |
| Vous envoyez un retour (_Aide › Envoyer un retour_) | Le titre et la description, votre adresse e-mail si vous la donnez, les versions (application, Cecil, PHP), le système et la langue ; les logs seulement si vous les cochez, montrés avant l'envoi, votre dossier personnel masqué | desktop.cecil.app, qui le dépose dans un dépôt GitHub privé |

desktop.cecil.app conserve votre adresse IP peu de temps pour limiter le nombre de requêtes (protection contre les abus) ; il ne conserve rien d'autre.

Quand vous achetez une licence, Polar collecte les données nécessaires à l'achat (nom, adresse e-mail, paiement) : voir sa [politique de confidentialité](https://polar.sh/legal/privacy).

## Ce site

Ce site n'utilise ni cookies ni mesure d'audience. Son hébergeur, Netlify, conserve des journaux techniques (adresse IP, pages demandées).

## Sous-traitants

- [Netlify](https://www.netlify.com) : hébergement de ce site et de ses fonctions (licence, retours).
- [Cloudflare](https://www.cloudflare.com) : stockage des installeurs et des mises à jour.
- [Polar](https://polar.sh) : vente des licences.
- [GitHub](https://github.com) : retours.

## Durée de conservation

- **Retours** : conservés jusqu'à la clôture de l'issue créée, puis supprimés ou anonymisés.
- **Licence** : les activations sont conservées tant que la licence est active. Polar conserve les données des achats pendant la durée imposée par la loi.

## Vos droits

Conformément au RGPD, vous pouvez accéder à vos données, les rectifier ou les supprimer, et vous opposer à leur traitement : écrivez à [contact@aperturelab.fr](mailto:contact@aperturelab.fr). Vous pouvez aussi adresser une réclamation à la [CNIL](https://www.cnil.fr).
