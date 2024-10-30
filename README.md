# disable-umami

[![GitHub Tag](https://img.shields.io/github/v/tag/uiolee/disable-umami?logo=github)](https://github.com/uiolee/disable-umami/tags)
[![GitHub Release](https://img.shields.io/github/v/release/uiolee/disable-umami?logo=github)](https://github.com/uiolee/disable-umami/releases)
[![GitHub commits since latest release](https://img.shields.io/github/commits-since/uiolee/disable-umami/latest?include_prereleases&sort=semver&logo=github)](https://github.com/uiolee/disable-umami/compare/...main)
[![GitHub top language](https://img.shields.io/github/languages/top/uiolee/disable-umami?logo=github)](#disable-umami)
[![CI](https://github.com/uiolee/disable-umami/actions/workflows/ci.yml/badge.svg?event=push)](https://github.com/uiolee/disable-umami/actions/workflows/ci.yml)
[![Release](https://github.com/uiolee/disable-umami/actions/workflows/publish.yml/badge.svg)](https://github.com/uiolee/disable-umami/actions/workflows/publish.yml)

A WebExtension to disable Umami Analytics to prevent being tracked.

> UserScript is available:
>
> - https://greasyfork.org/scripts/514774
> - https://gist.github.com/uiolee/8683b0c8de01e922771ad7f68e911874

## Install

Available for:

- Firefox
- Firefox for Android

### Mozilla Addon

[![Mozilla Add-on Version](https://img.shields.io/amo/v/disable-umami?logo=firefox)](https://addons.mozilla.org/addon/disable-umami/)

### Github Release

[![GitHub Release](https://img.shields.io/github/v/release/uiolee/disable-umami?logo=github)](https://github.com/uiolee/disable-umami/releases)

## Usage

Once installed, this extension will be injected automatically on every http or https page you visit, no setup required.

## How to disable umami

According to https://umami.is/docs/exclude-my-own-visits

This extension writes `umami.disabled=1` to the local storage of every page you visit.

## Privacy

This extension does not intend to and will not collect, process or transmit any of your personal data.
