<h1 align=center><img src="https://raw.githubusercontent.com/LoveLiveSunshine/pixiv.moe/master/src/images/favicon.png" width=50/> pixiv.moe</h1>

[![Build Status](http://img.shields.io/travis/LoveLiveSunshine/pixiv.moe.svg)](https://travis-ci.org/LoveLiveSunshine/pixiv.moe)
[![Coverage Status](https://coveralls.io/repos/github/LoveLiveSunshine/pixiv.moe/badge.svg?branch=master)](https://coveralls.io/github/LoveLiveSunshine/pixiv.moe?branch=master)
[![npm](https://img.shields.io/npm/dt/pixiv.moe.svg?maxAge=2592000)]()
[![npm version](https://badge.fury.io/js/pixiv.moe.svg)](https://badge.fury.io/js/pixiv.moe)
[![Website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg?label=pixivギャラリー)](https://pixiv.moe)
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
* react
* react-dom
* react-router
* redux
* redux-thunk
* react-redux
* react-intl
* material-ui
* whatwg-fetch

## Online Site
[https://pixiv.moe](https://pixiv.moe)

## Features

* Pinterest-style layout illusts.
* Select keywords.
* Search keywords order by popularity without pixiv Premium.
* Login in pixiv and add bookmarks easily.

## Privacy

We would never record your password.  

The authorized data is only stored in `localStorage` and `ACCESS_TOKEN` will expire in one hour. That is to say, **your login session will only remain for one hour!**



## Q&A

Q: Why don't you use `REFRESH TOKEN`?

A: Pixiv change the `REFRESH TOKEN` auth method, so re-login with refresh_token is failed.

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
- Run: `npm start`
- Test: `npm test`
- Build: `npm run dist`
- Publish to gh-pages: `npm run deploy`

### API

The API is based on HTTPS requests and JSON responses.The stable HTTPS endpoint for the latest version is:
`https://api.pixiv.moe/v1`

#### Ranking List

##### request
`GET /ranking?page=[:page]`

###### example
```bash
curl 'https://api.pixiv.moe/v1/ranking?page=1' 
```

##### response
<details>
<summary>JSON</summary>

```json
{
  "status": "success",
  "response": {
    "content": "all",
    "mode": "daily",
    "date": "2017-05-21",
    "works": [
      {
        "rank": 1,
        "previous_rank": 6,
        "work": {
          "id": 62984197,
          "title": "★",
          "caption": null,
          "tags": ["SUKJA", "オリジナル", "ゴスロリ"],
          "tools": null,
          "image_urls": {
            "large":
              "https://api.pixiv.moe/v1/image/Ly9pMi5waXhpdi5uZXQvaW1nLW9yaWdpbmFsL2ltZy8yMDE3LzA1LzIwLzE3LzE1LzM5LzYyOTg0MTk3X3AwLnBuZw==",
            "px_480mw":
              "https://api.pixiv.moe/v1/image/Ly9pMi5waXhpdi5uZXQvYy80ODB4OTYwL2ltZy1tYXN0ZXIvaW1nLzIwMTcvMDUvMjAvMTcvMTUvMzkvNjI5ODQxOTdfcDBfbWFzdGVyMTIwMC5qcGc="
          },
          "width": 700,
          "height": 1000,
          "stats": {
            "scored_count": 2470,
            "score": 24700,
            "views_count": 33130,
            "favorited_count": {
              "public": null,
              "private": null
            },
            "commented_count": null
          },
          "publicity": 0,
          "age_limit": "all-age",
          "created_time": "2017-05-20 17:15:00",
          "reuploaded_time": "2017-05-20 17:15:39",
          "user": {
            "id": 4889903,
            "account": "sorolp",
            "name": "SUKJA",
            "is_following": null,
            "is_follower": null,
            "is_friend": null,
            "is_premium": null,
            "profile_image_urls": {
              "px_50x50":
                "https://api.pixiv.moe/v1/image/Ly9pMy5waXhpdi5uZXQvdXNlci1wcm9maWxlL2ltZy8yMDE2LzExLzI1LzE4LzI4LzI1LzExNzk0MDM4X2ViNGViYjkzOWE5ZTVmNTAzZGUyYjdkMjU0N2IxMjUzXzUwLmpwZw=="
            },
            "stats": null,
            "profile": null
          },
          "is_manga": null,
          "is_liked": null,
          "favorite_id": null,
          "page_count": 1,
          "book_style": "none",
          "type": "illustration",
          "metadata": null,
          "content_type": null,
          "sanity_level": "white"
        },
        "unique_id": "2uba8cM"
      }
    ]
  },
  "count": 1
}
```
</details>

#### Search

##### request
`GET /ranking?word=[:word]&page=[:page]`

###### example
```bash
curl 'https://api.pixiv.moe/v1/search?word=fgo&page=1' 
```

##### response
<details>
<summary>JSON</summary>

```json
{
    "status":"success",
    "response":[
        {
            "id":57808612,
            "title":"邪ンヌ・オルタ",
            "image_urls":{
                "px_128x128":"https://api.pixiv.moe/v2/image/i.pximg.net/c/128x128/img-master/img/2016/07/09/00/10/10/57808612_p0_square1200.jpg",
                "px_480mw":"https://api.pixiv.moe/v2/image/i.pximg.net/c/480x960/img-master/img/2016/07/09/00/10/10/57808612_p0_master1200.jpg",
                "large":"https://api.pixiv.moe/v2/image/i.pximg.net/img-original/img/2016/07/09/00/10/10/57808612_p0.jpg",
                "small":"https://api.pixiv.moe/v2/image/i.pximg.net/c/150x150/img-master/img/2016/07/09/00/10/10/57808612_p0_master1200.jpg",
                "medium":"https://api.pixiv.moe/v2/image/i.pximg.net/c/600x600/img-master/img/2016/07/09/00/10/10/57808612_p0_master1200.jpg"
            },
            "stats":{
                "scored_count":103183,
                "score":1031301,
                "views_count":626438,
                "favorited_count":{
                    "public":102372,
                    "private":1832
                },
                "commented_count":255
            },
            "unique_id":"r9Earbs"
        }
    ],
    "count":50,
    "pagination":{
        "previous":null,
        "next":2,
        "current":1,
        "per_page":50,
        "total":161174,
        "pages":2000
    }
}
```
</details>

#### Illust List

##### request
`GET /gallery?tag=[:tag]&page=[:page]`

###### example
```bash
curl 'https://api.pixiv.moe/v1/gallery?tag=nico&page=1' 
```

##### response
<details>
<summary>JSON</summary>

```json
{
    "status":"success",
    "response":[
        {
            "id":55080228,
            "title":"３年生組",
            "image_urls":{
                "px_128x128":"https://api.pixiv.moe/v2/image/i.pximg.net/c/128x128/img-master/img/2016/02/04/10/09/39/55080228_p0_square1200.jpg",
                "px_480mw":"https://api.pixiv.moe/v2/image/i.pximg.net/c/480x960/img-master/img/2016/02/04/10/09/39/55080228_p0_master1200.jpg",
                "large":"https://api.pixiv.moe/v2/image/i.pximg.net/img-original/img/2016/02/04/10/09/39/55080228_p0.jpg",
                "small":"https://api.pixiv.moe/v2/image/i.pximg.net/c/150x150/img-master/img/2016/02/04/10/09/39/55080228_p0_master1200.jpg",
                "medium":"https://api.pixiv.moe/v2/image/i.pximg.net/c/600x600/img-master/img/2016/02/04/10/09/39/55080228_p0_master1200.jpg"
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
</details>

#### Illust Detail

##### request
`GET /illust/[:illust_id]`

###### example

```bash
curl 'https://api.pixiv.moe/v1/illust/50110342'
```

##### response
<details>
<summary>JSON</summary>

```json
{
    "status":"success",
    "count":1,
    "response":{
        "id":50110342,
        "title":"ことにこと♥【COMIC1☆9】",
        "caption":"５月２日、COMIC1☆9【ヤモセブン】せー50bでマイクロファイバークロスになります！",
        "tags":[
            "ラブライブ!",
            "矢澤にこ",
            "南ことり",
            "にことり",
            "胸囲の格差社会",
            "水着",
            "サイハイソックス",
            "(・8・)",
            "ラブライブ!1000users入り"
        ],
        "tools":[

        ],
        "image_urls":{
            "px_128x128":"https://api.pixiv.moe/v2/image/i.pximg.net/c/128x128/img-master/img/2015/04/30/19/56/14/50110342_p0_square1200.jpg",
            "px_480mw":"https://api.pixiv.moe/v2/image/i.pximg.net/c/480x960/img-master/img/2015/04/30/19/56/14/50110342_p0_master1200.jpg",
            "large":"https://api.pixiv.moe/v2/image/i.pximg.net/img-original/img/2015/04/30/19/56/14/50110342_p0.png"
        },
        "width":784,
        "height":704,
        "stats":null,
        "publicity":0,
        "age_limit":"all-age",
        "created_time":"2015-04-30 19:56:14",
        "reuploaded_time":"2015-04-30 19:56:14",
        "user":{
            "id":2473967,
            "account":"axial",
            "name":"あゆま紗由",
            "profile_image_urls":{
                "px_50x50":"https://api.pixiv.moe/v2/image/i.pximg.net/user-profile/img/2016/07/13/11/20/47/11192925_b983eb7c8038bffa8db23d1341787d0e_50.jpg"
            },
            "stats":null,
            "profile":null
        },
        "page_count":1,
        "book_style":"right_to_left",
        "type":"illustration",
        "metadata":null,
        "content_type":null
    }
}
```

```json
{
    "status":"failure",
    "has_error":true,
    "errors":{
        "system":{
            "message":"対象のイラストは見つかりませんでした。(illust_id:5)",
            "code":206
        }
    }
}
```
</details>

#### Illust Comments

##### request
`GET /illust/comments/[:illust_id]?page=[:page]`

###### example
```bash
curl 'https://api.pixiv.moe/v1/illust/comments/47527196?page=1'
```

##### response
<details>
<summary>JSON</summary>

```json
{
    "total_comments":8,
    "comments":[
        {
            "id":59071954,
            "comment":"凛ちゃん可愛い(๑////๑) 凛ちゃんロングでも似合う(๑////๑)",
            "date":"2016-07-24T14:40:19+09:00",
            "user":{
                "id":17882671,
                "name":"あかーし",
                "account":"osomatsu0224",
                "profile_image_urls":{
                    "medium":"https://source.pixiv.net/common/images/no_profile.png"
                }
            },
            "parent_comment":[

            ]
        },
        {
            "id":48082755,
            "comment":"凛ちゃんかわいい！( ＝ω＝)",
            "date":"2015-07-25T17:28:31+09:00",
            "user":{
                "id":14019593,
                "name":"小原林檎",
                "account":"ai888",
                "profile_image_urls":{
                    "medium":"https://api.pixiv.moe/v2/image/i.pximg.net/user-profile/img/2016/12/31/18/35/26/11938047_60df513a413dbc60ece3c2328e300a6c_170.jpg"
                }
            },
            "parent_comment":[

            ]
        }
    ]
}
```
</details>

#### Auth

##### request
`POST /user/auth`

```json
{
    "username":"[:username]",
    "password":"[:password]"
}
```

###### example
```bash
curl 'https://api.pixiv.moe/v1/user/auth' \
-H 'content-type: application/json' \
-H 'accept: application/json' \
--data-binary '{"username":"abc","password":"mypassword"}'
```

##### response

<details>
<summary>JSON</summary>

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
            "profile_image_urls":{},
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
</details>

#### Add Favourite

##### request
`PUT /favourite/[:illust_id]`

###### example
```bash
curl 'https://api.pixiv.moe/v1/favourite/46453302' \
-X PUT \
-H 'access-token: AAA' \
-H 'content-type: application/json' \
-H 'accept: application/json'
```

##### response

<details>
<summary>JSON</summary>

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
</details>

## Localization

App will auto detect your browser language and use the localization. You can set language manually in drawer.  
Now the app supports Japanese and English.  
Help us if you can translate this app. Please follow the guide in `src/locale`.

## Contribute
Feel free to contribute (PR-s and issues welcomed).  
Only `1.x-dev` branch is accepted.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/10093992?v=4" width="100px;"/><br /><sub><b>そら</b></sub>](http://kokororin.github.io)<br />[💻](https://github.com/LoveLiveSunshine/pixiv.moe/commits?author=kokororin "Code") [📖](https://github.com/LoveLiveSunshine/pixiv.moe/commits?author=kokororin "Documentation") [🎨](#design-kokororin "Design") [⚠️](https://github.com/LoveLiveSunshine/pixiv.moe/commits?author=kokororin "Tests") | [<img src="https://avatars0.githubusercontent.com/u/12712012?v=4" width="100px;"/><br /><sub><b>吟夢ちゃん</b></sub>](https://kirainmoe.com/)<br />[💻](https://github.com/LoveLiveSunshine/pixiv.moe/commits?author=kirainmoe "Code") [🤔](#ideas-kirainmoe "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/12656264?v=4" width="100px;"/><br /><sub><b>simon3000</b></sub>](https://github.com/simon300000)<br />[💻](https://github.com/LoveLiveSunshine/pixiv.moe/commits?author=simon300000 "Code") [🤔](#ideas-simon300000 "Ideas, Planning, & Feedback") [🌍](#translation-simon300000 "Translation") |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License
[MIT license](http://opensource.org/licenses/mit-license.php)
