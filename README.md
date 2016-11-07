<h1 align=center><img src="src/images/favicon.png" width=50/> pixiv.moe</h1>

[![Build Status](http://img.shields.io/travis/kokororin/pixiv.moe.svg)](https://travis-ci.org/kokororin/pixiv.moe)
[![Coverage Status](https://coveralls.io/repos/github/kokororin/pixiv.moe/badge.svg?branch=master)](https://coveralls.io/github/kokororin/pixiv.moe?branch=master)
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
$ yarn install
$ yarn start
```

### Commands
- Install dependencies: `yarn install`
- Run: `yarn start`
- Test: `yarn test`
- Build: `yarn run dist`
- Publish to gh-pages: `yarn run deploy`

### API

The API is based on HTTPS requests and JSON responses.The stable HTTPS endpoint for the latest version is:
`https://api.kotori.love/pixiv/`

#### Illust List

##### request
`GET /source.php?sort=[:sort]&tag=[:tag]&page=[:page]`

###### example
```bash
curl 'https://api.kotori.love/pixiv/source.php?sort=popular&tag=nico&page=1' 
```

##### response
```json
{
    "status":"success",
    "response":[
        {
            "id":55080228,
            "title":"３年生組",
            "image_urls":{
                "px_128x128":"//i1.pixiv.net/c/128x128/img-master/img/2016/02/04/10/09/39/55080228_p0_square1200.jpg",
                "px_480mw":"//i1.pixiv.net/c/480x960/img-master/img/2016/02/04/10/09/39/55080228_p0_master1200.jpg",
                "large":"//i1.pixiv.net/img-original/img/2016/02/04/10/09/39/55080228_p0.jpg",
                "small":"//i1.pixiv.net/c/150x150/img-master/img/2016/02/04/10/09/39/55080228_p0_master1200.jpg",
                "medium":"//i1.pixiv.net/c/600x600/img-master/img/2016/02/04/10/09/39/55080228_p0_master1200.jpg"
            },
            "stats":{
                "scored_count":14014,
                "score":139358,
                "views_count":388896,
                "favorited_count":{
                    "public":16567,
                    "private":1463
                },
                "commented_count":228
            },
            "unique_id":"13KPDGM"
        }
    ],
    "count":50,
    "pagination":{
        "previous":null,
        "next":2,
        "current":1,
        "per_page":50,
        "total":33863,
        "pages":678
    },
    "expires_at":1478517054
}
```

#### Auth

##### request
`POST /auth.php`

```json
{
    "username":"[:username]",
    "password":"[:password]"
}
```

###### example
```bash
curl 'https://api.kotori.love/pixiv/auth.php' \
-H 'content-type: application/json' \
-H 'accept: application/json' \
--data-binary '{"username":"abc","password":"mypassword"}'
```

##### response

```json
{
    "status":"success",
    "message":null,
    "data":{
        "access_token":"AAAAAAAAAAAAA",
        "expires_in":3600,
        "token_type":"bearer",
        "scope":"unlimited",
        "refresh_token":"BBBBBBBBBBBB",
        "user":{
            "profile_image_urls":{
                "px_16x16":"http://i4.pixiv.net/user-profile/img/2016/08/22/18/33/22/11390779_2ffb9b376cf90d1876182b5d894d5e1f_16.jpg",
                "px_50x50":"http://i4.pixiv.net/user-profile/img/2016/08/22/18/33/22/11390779_2ffb9b376cf90d1876182b5d894d5e1f_50.jpg",
                "px_170x170":"http://i4.pixiv.net/user-profile/img/2016/08/22/18/33/22/11390779_2ffb9b376cf90d1876182b5d894d5e1f_170.jpg"
            },
            "id":"123456",
            "name":"nickname",
            "account":"username",
            "is_premium":false,
            "x_restrict":0,
            "is_mail_authorized":true
        }
    }
}
```

```json
{
    "status":"failure",
    "message":"Login error: 103:pixiv ID、またはメールアドレス、パスワードが正しいかチェックしてください。"
}
```

#### Add Favourite

##### request
`POST /favourite.php`

```json
{"illust_id": "[:illust_id]"}
```

###### example
```bash
curl 'https://api.kotori.love/pixiv/favourite.php' \
-H 'access-token: AAA' \
-H 'content-type: application/json' \
-H 'accept: application/json' \
--data-binary '{"illust_id":46453302}'
```

##### response
```json
{
    "status":"success",
    "message":"をブックマークに追加しました"
}
```

```json
{
    "status":"failure",
    "message":"あなたは既にブックマークに追加しました"
}
```

```json
{
    "status":"failure",
    "message":"再度ログインログインセッションの有効期限が切れていてください。"
}
```

## Contribute
Feel free to contribute (PR-s and issues welcomed).

## License
[MIT license](http://opensource.org/licenses/mit-license.php)