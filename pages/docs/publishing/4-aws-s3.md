---
title: AWS S3 / CloudFront
description: Publish a site to an Amazon S3 bucket, with an optional CloudFront distribution.
---
# AWS S3 / CloudFront

## Keys

AWS uses the keys (**Access key ID** and **Secret access key**) of an IAM user. Create a user dedicated to the publication, with these permissions on the bucket:

- `s3:ListBucket`
- `s3:PutObject`
- `s3:DeleteObject`
- `cloudfront:CreateInvalidation`, if you use CloudFront

A user limited to its bucket, that can't list the other buckets, is accepted. The account is shown as *AWS (ABCD…WXYZ)*, with the beginning and the end of the access key.

## Target settings

| Field | Description |
|-------|-------------|
| **Bucket** | The name of the bucket. |
| **Region** | The region of the bucket, e.g. `eu-west-3`. |
| **Prefix** | Optional: a folder of the bucket, e.g. `docs/`. |
| **CloudFront distribution** | Optional: the ID of the distribution, to invalidate its cache after each publication. |
| **Site URL** | Optional: the public URL of the site, shown after each publication. |

:::warning
The bucket must exist: Cecil Desktop doesn't create it, and doesn't set its public access or its static website hosting. Set them up in AWS first.
:::

## Publication

The files are compared with the objects of the bucket (under the prefix):

- only the new and changed files are sent, with their content type;
- the objects that are no longer in the site are **deleted**;
- HTML pages are sent with cache headers that make browsers check for a new version, the other files are cached for 1 day;
- if a CloudFront distribution is set and something has changed, its cache is invalidated.

:::caution
Objects under the prefix that are not in the site are deleted: don't publish to a bucket (or a prefix) that holds other files.
:::

After the publication, the target shows the **Site URL**, or the URL of the `index.html` file in the bucket.
