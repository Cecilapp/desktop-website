---
title: Dépannage
description: Les problèmes courants et leurs solutions, et comment envoyer un retour à l'équipe.
---
# Dépannage

## Problèmes courants

### Le système m'avertit à l'installation

Cecil Desktop n'est pas encore signé. Sous Windows, cliquez sur **Informations complémentaires**, puis **Exécuter quand même**. Sous macOS, ouvrez **Réglages Système › Confidentialité et sécurité**, puis cliquez sur **Ouvrir quand même**.

### Dossier introuvable

Le dossier du site a été déplacé ou supprimé. S'il a été déplacé, ouvrez-le à nouveau depuis son nouvel emplacement (**Fichier › Ouvrir un dossier…**), puis retirez l'ancienne entrée : clic droit dessus dans la barre latérale, puis **Retirer de la liste** (les fichiers ne sont pas supprimés).

### Configuration invalide

Le fichier de configuration du site ne peut pas être chargé : l'erreur est affichée dans l'**Aperçu**. Ouvrez **Configuration › YAML**, corrigez le fichier, puis cliquez sur **Vérifier**.

### Une page manque dans le site

- C'est un brouillon (`draft: true` ou `published: false`, icône d'œil barré dans l'arborescence) : buildez avec **Inclure les brouillons**, ou publiez-la.
- Son front matter est invalide (icône rouge dans l'arborescence) : avec le contrôle du front matter `error`, Cecil l'ignore. Ouvrez-la, et corrigez les variables signalées dans l'onglet **Front matter**.
- Lancez le diagnostic **Front matter**, depuis l'**Aperçu**, pour lister les problèmes de toutes les pages.

### Le build échoue

Lisez le log dans l'onglet **Build** du panneau **Sortie** (`Ctrl/⌘+J`) : filtrez-le avec **Lignes affichées** pour ne voir que les erreurs. Si l'erreur vient de l'application plutôt que de votre site, cliquez sur **Signaler** pour l'envoyer à l'équipe, avec le log du build.

### La preview ne démarre pas

Si vous avez indiqué un **Port** dans les [options de la preview](build-preview-diagnosis.md#options-de-la-preview), il est peut-être utilisé par une autre application : videz le champ pour choisir automatiquement un port libre.

### La publication échoue

Voir le [dépannage de la publication](publishing/index.md#depannage).

### Les modifications faites dans un autre éditeur n'apparaissent pas

Une page ouverte dans Cecil Desktop n'est pas rechargée quand elle est modifiée par une autre application : rouvrez-la.

## Données

- Vos **sites** restent où ils sont, sur votre disque : Cecil Desktop travaille directement sur leurs fichiers, et ils restent des projets Cecil standard.
- La **liste des sites**, l'historique des builds et des publications, et les préférences sont enregistrés par l'application, dans son dossier de données.
- Les **jetons** et la **clé de licence** sont chiffrés avec le trousseau du système, pour votre compte utilisateur sur cet ordinateur.
- Il n'y a **aucune télémétrie** : rien n'est envoyé, sauf quand vous publiez, vérifiez une licence ou envoyez un retour.

## Envoyer un retour

Un bug, une idée, une critique ? Utilisez **Aide › Envoyer un retour…** : choisissez son type (bug, idée ou autre), donnez-lui un titre et une description et, si vous le souhaitez, votre e-mail pour obtenir une réponse.

Vous pouvez joindre le **log du dernier build** du site et le **journal de l'application** (ses erreurs récentes) : ils sont affichés avant l'envoi, et votre dossier utilisateur y est remplacé par `~`. Les versions de l'application, de Cecil et de PHP, et votre système, sont toujours envoyés. Votre retour est lu par l'équipe de Cecil uniquement.
