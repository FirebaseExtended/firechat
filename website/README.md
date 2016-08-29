# Firechat Website

## Initial Setup

To deploy the Firechat website, first make sure you have Firebase Hosting deploy privileges for the
`firechat` Firebase project.

Also, make sure you have [Jekyll](https://jekyllrb.com/docs/installation/) installed:

```
$ gem install jekyll
```

## Recurring Setup

Once you have deploy privileges and have Jekyll installed, you can deploy the Firechat website by
running the following two commands from this directory:

```
$ jekyll build
$ firebase deploy
```
