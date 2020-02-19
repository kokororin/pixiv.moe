<h1 align=center><img src="https://raw.githubusercontent.com/LoveLiveSunshine/pixiv.moe/master/src/images/favicon.png" width=50/> pixiv.moe</h1>

[![Build Status](http://img.shields.io/travis/LoveLiveSunshine/pixiv.moe.svg)](https://travis-ci.org/LoveLiveSunshine/pixiv.moe)
[![Coverage Status](https://coveralls.io/repos/github/LoveLiveSunshine/pixiv.moe/badge.svg?branch=master)](https://coveralls.io/github/LoveLiveSunshine/pixiv.moe?branch=master)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A pinterest-style layout site, shows illusts on [pixiv.net](http://pixiv.net) order by popularity. Written with React.

Table of Contents
=================

  * [Tech Stack](#tech-stack)
  * [Online Site](#online-site)
  * [Features](#features)
  * [Privacy](#privacy)
  * [Q&amp;A](#qa)
  * [Dev](#dev)
     * [Commands](#commands)
     * [API](#api)
  * [Localization](#localization)
  * [Contribute](#contribute)
  * [Contributors](#contributors)
  * [License](#license)


## Tech Stack

### Front-end
* react
* react-dom
* react-router
* redux
* redux-thunk
* react-redux
* react-intl
* material-ui
* whatwg-fetch

### Back-end
* express
* pixiv-app-api

## Online Site
[https://pixiv.moe](https://pixiv.moe)

## Features

* Pinterest-style layout illusts.
* Select keywords.
* Search keywords order by popularity without pixiv Premium.
* ~~Login in pixiv and add bookmarks easily.~~

## Dev
```bash
# Start for development
$ git clone https://github.com/LoveLiveSunshine/pixiv.moe
$ cd pixiv.moe
$ yarn
$ npm start
```

### Commands
- Install dependencies: `yarn`
- Run Back-end Server: `npm run backend:dev`
- Run Front-end Server: `npm start`
- Test: `npm test`
- Build Front-end: `npm run dist`

### API

The API is based on HTTPS requests and JSON responses.The stable HTTPS endpoint for the latest version is:
`http://localhost:3000`

#### Ranking List

##### request
`GET /ranking?page=[:page]`

###### example
```bash
curl 'http://localhost:3000/ranking?page=1' 
```

#### Search

##### request
`GET /ranking?word=[:word]&page=[:page]`

###### example
```bash
curl 'http://localhost:3000/search?word=fgo&page=1' 
```

#### Illust Comments

##### request
`GET /illust/comments/[:illust_id]?page=[:page]`

###### example
```bash
curl 'http://localhost:3000/illust/comments/47527196?page=1'
```

## Localization

App will auto detect your browser language and use the localization. You can set language manually in drawer.  
Now the app supports Japanese and English.  
Help us if you can translate this app. Please follow the guide in `src/locale`.

## Contribute
Feel free to contribute (PR-s and issues welcomed).  

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/10093992?v=4" width="100px;"/><br /><sub><b>そら</b></sub>](http://kokororin.github.io)<br />[💻](https://github.com/LoveLiveSunshine/pixiv.moe/commits?author=kokororin "Code") [📖](https://github.com/LoveLiveSunshine/pixiv.moe/commits?author=kokororin "Documentation") [🎨](#design-kokororin "Design") [⚠️](https://github.com/LoveLiveSunshine/pixiv.moe/commits?author=kokororin "Tests") | [<img src="https://avatars0.githubusercontent.com/u/12712012?v=4" width="100px;"/><br /><sub><b>吟夢ちゃん</b></sub>](https://kirainmoe.com/)<br />[💻](https://github.com/LoveLiveSunshine/pixiv.moe/commits?author=kirainmoe "Code") [🤔](#ideas-kirainmoe "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/12656264?v=4" width="100px;"/><br /><sub><b>simon3000</b></sub>](https://github.com/simon300000)<br />[💻](https://github.com/LoveLiveSunshine/pixiv.moe/commits?author=simon300000 "Code") [🤔](#ideas-simon300000 "Ideas, Planning, & Feedback") [🌍](#translation-simon300000 "Translation") | [<img src="https://avatars0.githubusercontent.com/u/29944979?v=4" width="100px;"/><br /><sub><b>Muhammad Iqbal Rifai</b></sub>](https://blog.0wo.me)<br />[🌍](#translation-py7hon "Translation") |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License
[MIT license](http://opensource.org/licenses/mit-license.php)
