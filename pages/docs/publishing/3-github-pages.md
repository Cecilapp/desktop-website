---
title: GitHub Pages
description: Publish a site to GitHub Pages with a fine-grained token.
---
# GitHub Pages

## Token

GitHub Pages uses a **fine-grained token**: in GitHub, open **Settings › Developer settings › Personal access tokens › Fine-grained tokens** (the **Create a token** link of the form opens this page), then:

1. under **Repository access**, choose **Only select repositories** and pick the repository of the site;
2. under **Permissions**, give **Read and write** access to **Contents** and **Pages**.

The account is shown with your GitHub login.

## Target settings

| Field | Description |
|-------|-------------|
| **Repository** | The repository, as `owner/repository`. |
| **Branch** | The published branch: `gh-pages` by default. |
| **Custom domain** | Optional: e.g. `www.example.com`. |

When you save the target, Cecil Desktop checks that the token can write to the repository.

## Publication

Each publication replaces the content of the branch with the built site, in a single commit (*Publish with Cecil Desktop*):

- the branch is created if it doesn't exist;
- a `.nojekyll` file is added, so that GitHub doesn't process the site with Jekyll;
- a `CNAME` file is added if you set a custom domain;
- GitHub Pages is enabled on the branch if needed, or switched to it if it published another branch.

Only the files GitHub doesn't have yet are sent, and the files removed from the site are removed from the branch. If nothing has changed, no commit is made.

:::warning
The published branch is overwritten at each publication: don't use the branch of your sources (e.g. `main`), keep a dedicated branch such as `gh-pages`.
:::

:::tip
When you create a site, Cecil Desktop can also add a GitHub Actions workflow that builds and deploys it on GitHub Pages at each push: an alternative to publishing from the app, if your site is in a GitHub repository.
:::
