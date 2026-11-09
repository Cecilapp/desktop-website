---
title: Vercel
description: Publish a site to Vercel with an access token.
---
# Vercel

## Token

In Vercel, open **Account settings › Tokens** (the **Create a token** link of the form opens this page), and create a token with access to the team of the project.

The account is shown with the email of your Vercel user.

## Target settings

| Field | Description |
|-------|-------------|
| **Project** | The name of the Vercel project. |
| **Team** | Optional: the ID (`team_…`) or the slug of the team, for a team project. |

When you save the target, only the access to the account (or to the team) is checked: the project is created at the first publication if it doesn't exist.

## Publication

The site is deployed to production, as a static site: Vercel doesn't run any build or install command, the files built by Cecil are published as they are. Only the files Vercel doesn't have yet are sent, then Cecil Desktop waits for the deployment (up to 5 minutes) and shows the URL of the project.
