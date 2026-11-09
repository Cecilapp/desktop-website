---
title: Netlify
description: Publish a site to Netlify with a personal access token.
---
# Netlify

## Token

Netlify uses a **personal access token**: in Netlify, open **User settings › Applications › Personal access tokens** (the **Create a token** link of the form opens this page), and create a new token.

The account is shown with the email of your Netlify user.

## Target settings

| Field | Description |
|-------|-------------|
| **Site** | The name or ID of a site of your account. |

If no site of your account has this name, a new site is created with it at the first publication, at `https://<name>.netlify.app/`. The name must be unique across all of Netlify: if it is already taken, choose another one.

## Publication

Netlify tells which files it doesn't have yet: only those are sent. Cecil Desktop then waits for Netlify to process the deployment (up to 5 minutes), and shows the URL of the deployment.

:::tip
A site created by Cecil Desktop is a regular Netlify site: you can set its custom domain, redirects or forms in Netlify.
:::
