<h1 align=center><img src="https://raw.githubusercontent.com/kokororin/pixiv.moe/master/src/images/favicon.png" width=50/> pixiv萌え</h1>

![Build Status](https://github.com/kokororin/pixiv.moe/actions/workflows/ci.yml/badge.svg)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A pinterest-style layout site, shows illusts on [pixiv.net](http://pixiv.net) order by popularity. Written with React.

# Table of Contents

- [Tech Stack](#tech-stack)
- [Online Site](#online-site)
- [Features](#features)
- [Privacy](#privacy)
- [Q&amp;A](#qa)
- [Dev](#dev)
  - [Commands](#commands)
  - [API](#api)
- [Deploy](#deploy)
  - [With Docker](#with-docker)
- [Localization](#localization)
- [Contribute](#contribute)
- [Contributors](#contributors)
- [License](#license)

## Tech Stack

### Front-end

- react
- react-dom
- react-router
- mobx
- mobx-react-lite
- react-intl
- material-ui
- whatwg-fetch

## Online Site

[https://pixiv.moe](https://pixiv.moe)

## Features

- Pinterest-style layout illusts.
- Select tags.
- Search keywords order by popularity without pixiv Premium.
- Login in pixiv and add bookmarks easily.

## Dev

```bash
# Start for development
$ git clone https://github.com/kokororin/pixiv.moe
$ cd pixiv.moe
$ yarn
$ npm start
```

### Commands

- Install dependencies: `yarn`
- Run Front-end Server: `npm start`
- Test: `npm test`
- Build Front-end: `npm run build`

### API

The API is based on HTTPS requests and JSON responses.

Our online site's API Server uses `https://api.pixiv.moe/`

To check whether our API server **could** connected to pixiv, you can visit [https://api.pixiv.moe/ping](https://api.pixiv.moe/ping).

See more in [API Docs](https://github.com/kokororin/pixiv.moe/blob/master/docs/API.md).

## Deploy

### With Docker

```bash
docker build -t <customized-name> .
docker run -p <port>:80 -d <customized-name>
```

## Localization

App will auto detect your browser language and use the localization. You can set language manually in drawer.  
Help us if you can translate this app. Please follow the guide in `src/locale`.

## Contribute

Feel free to contribute (PR-s and issues welcomed).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://kokororin.github.io"><img src="https://avatars0.githubusercontent.com/u/10093992?v=4" width="100px;" alt=""/><br /><sub><b>そら</b></sub></a><br /><a href="https://github.com/kokororin/pixiv.moe/commits?author=kokororin" title="Code">💻</a> <a href="https://github.com/kokororin/pixiv.moe/commits?author=kokororin" title="Documentation">📖</a> <a href="#design-kokororin" title="Design">🎨</a> <a href="https://github.com/kokororin/pixiv.moe/commits?author=kokororin" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://kirainmoe.com/"><img src="https://avatars0.githubusercontent.com/u/12712012?v=4" width="100px;" alt=""/><br /><sub><b>吟夢ちゃん</b></sub></a><br /><a href="https://github.com/kokororin/pixiv.moe/commits?author=kirainmoe" title="Code">💻</a> <a href="#ideas-kirainmoe" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/simon300000"><img src="https://avatars1.githubusercontent.com/u/12656264?v=4" width="100px;" alt=""/><br /><sub><b>simon3000</b></sub></a><br /><a href="https://github.com/kokororin/pixiv.moe/commits?author=simon300000" title="Code">💻</a> <a href="#ideas-simon300000" title="Ideas, Planning, & Feedback">🤔</a> <a href="#translation-simon300000" title="Translation">🌍</a></td>
    <td align="center"><a href="https://blog.0wo.me"><img src="https://avatars0.githubusercontent.com/u/29944979?v=4" width="100px;" alt=""/><br /><sub><b>Muhammad Iqbal Rifai</b></sub></a><br /><a href="#translation-py7hon" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/Meodinger"><img src="https://avatars1.githubusercontent.com/u/54493746?v=4" width="100px;" alt=""/><br /><sub><b>Meodinger Wang</b></sub></a><br /><a href="#translation-Meodinger" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/kaozaza2"><img src="https://avatars1.githubusercontent.com/u/11665930?v=4" width="100px;" alt=""/><br /><sub><b>Kao</b></sub></a><br /><a href="#translation-kaozaza2" title="Translation">🌍</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT license](http://opensource.org/licenses/mit-license.php)
