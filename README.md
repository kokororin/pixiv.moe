# pixiv.moe

[![Build Status](http://img.shields.io/travis/kokororin/pixiv.moe.svg)](https://travis-ci.org/kokororin/pixiv.moe)
[![Coverage Status](https://coveralls.io/repos/github/kokororin/pixiv.moe/badge.svg?branch=master)](https://coveralls.io/github/kokororin/pixiv.moe?branch=master)
[![GitHub issues](https://img.shields.io/github/issues/kokororin/pixiv.moe.svg)](https://github.com/kokororin/pixiv.moe/issues)
[![npm version](https://badge.fury.io/js/pixiv.moe.svg)](https://badge.fury.io/js/pixiv.moe)
![Dependency Tracker](https://img.shields.io/david/kokororin/pixiv.moe.svg "Dependency Tracker") ![Dependency Tracker](https://img.shields.io/david/dev/kokororin/pixiv.moe.svg "Dependency Tracker")
![Node Version](https://img.shields.io/node/v/pixiv.moe.svg "Node Version")

A pinterest-style layout site, shows illusts on [pixiv.net](http://pixiv.net) order by popularity. Written with react.

## Online Site
[https://pixiv.moe](https://pixiv.moe)

## Features

* Pinterest-style layout illusts.
* Select keywords.
* Login in Pixiv and add bookmarks easily.

## Privacy

We would never record your password.  

The authorized data is only stored in `localStorage` and `ACCESS_TOKEN` will expire in one hour. That is to say, **your login session will only remain for one hour!**



## Q&A

Q: Why don't you use `REFRESH TOKEN`?

A: Pixiv change the `REFRESH TOKEN` auth method, so re-login with refresh_token is failed.

## Dev
```bash
# Start for development
$ git clone https://github.com/kokororin/pixiv.moe
$ cd pixiv.moe
$ npm install
$ npm start
```

### Commands
- Init: `$ npm install`
- Run: `$ npm start`
- Build: `$ npm run dist`
- Publish `$ npm run deploy`

## Contribute
Feel free to contribute (PR-s and issues welcomed).

## License
[MIT license](http://opensource.org/licenses/mit-license.php)