// eslint-disable-next-line new-cap
const router = require('express').Router();
const cors = require('cors');
const Pixiv = require('pixiv-app-api');
const cache = require('../utils/cache');

const corsOptions = {
  origin(origin, callback) {
    const whitelist = ['http://localhost:23333', undefined];
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

const getPixiv = async () => {
  const cacheKey = 'pixiv_instance';
  const cacheItem = cache.get(cacheKey);
  if (cacheItem) {
    return cacheItem;
  }

  const pixiv = new Pixiv(
    process.env.PIXIV_USERNAME,
    process.env.PIXIV_PASSWORD,
    {
      camelcaseKeys: false
    }
  );
  await pixiv.login();
  cache.set(cacheKey, pixiv, 60 * 60 * 3);
  return pixiv;
};

router.get('/ranking', cors(corsOptions), async (req, res) => {
  let page = req.query.page || 1;
  page = page < 0 ? 1 : Number(page);
  const pixiv = await getPixiv();
  const result = await pixiv.illustRanking({ offset: (page - 1) * 25 });
  res.json({
    status: 'success',
    response: {
      illusts: result.illusts
    }
  });
});

router.get('/search', cors(corsOptions), async (req, res) => {
  let page = req.query.page || 1;
  page = page < 0 ? 1 : Number(page);
  let word = req.query.word || '';
  if (word) {
    word = word + ' users入り';
  }
  const pixiv = await getPixiv();
  const result = await pixiv.searchIllust(word, {
    offset: (page - 1) * 25,
    sort: 'popular_desc'
  });
  res.json({
    status: 'success',
    response: {
      illusts: result.illusts
    }
  });
});

router.get(/^\/illust\/(\d+)$/, cors(corsOptions), async (req, res) => {
  const illustId = req.params[0];
  const pixiv = await getPixiv();
  const result = await pixiv.illustDetail(illustId);
  res.json({
    status: 'success',
    response: {
      illust: result.illust
    }
  });
});

router.get(
  /^\/illust\/comments\/(\d+)$/,
  cors(corsOptions),
  async (req, res) => {
    let page = req.query.page || 1;
    page = page < 0 ? 1 : Number(page);
    const illustId = req.params[0];
    const pixiv = await getPixiv();
    const result = await pixiv.illustComments(illustId, {
      offset: (page - 1) * 25
    });
    res.json({
      status: 'success',
      response: {
        comments: result.comments
      }
    });
  }
);

module.exports = router;
