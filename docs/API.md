## pixiv.moe API Docs

The prefix of all APIs is `https://api.pixiv.moe`

### Fetch access token

All request to `pixiv.moe API` should be passed with `x-kotori-token` header.  
There is a limit on the number of requests per minute.

```bash
GET /session
```

### Fetch the ranking illustrations

```bash
GET /v2/ranking?page=:page
```

### Fetch trending illustrations and tags

```bash
GET /v2/trending/tags
```

### Search the illustrations

```bash
GET /v2/search?word=:word&page=:page
```

### Fetch the details of a single illustration

```bash
GET /v2/illust/:illustId
```

### Fetch the details of a single ugoira

```bash
GET /v2/illust/ugoira/:illustId
```

### Fetch the comments of an illustration

```bash
GET /v2/illust/comments/:illustId?page=:page
```

### Image proxy

```bash
GET /image/:url
```

Example:

```bash
GET /image/i.pximg.net/c/600x1200_90/img-master/img/2020/04/07/01/35/22/80618126_p0_master1200.jpg
```

Test:

<img style="height: 400px" src="https://api.pixiv.moe/image/i.pximg.net/c/600x1200_90/img-master/img/2020/04/07/01/35/22/80618126_p0_master1200.jpg">

#### Single Image

```bash
GET /image/:illustId.(jpg|png|gif)
```

Example:

```bash
GET /image/80617627.jpg
```

Test:

<img style="height: 400px" src="https://api.pixiv.moe/image/80617627.jpg">

#### Multiple Images

```bash
GET /image/:illustId-:index.(jpg|png|gif)
```

Example:

```bash
GET /image/80617627-2.jpg
```

Test:

<img style="height: 400px" src="https://api.pixiv.moe/image/80617627-2.jpg">

#### Convert to Webp

```bash
GET /image/i.pximg.net/c/600x1200_90/img-master/img/2020/04/07/01/35/22/80618126_p0_master1200.jpg@progressive.webp
```

Test:

<img style="height: 400px" src="https://api.pixiv.moe/image/i.pximg.net/c/600x1200_90/img-master/img/2020/04/07/01/35/22/80618126_p0_master1200.jpg@progressive.webp">
