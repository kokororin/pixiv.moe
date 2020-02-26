import { Router, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import Pixiv from 'pixiv-app-api';
import cache from '../utils/cache';
// eslint-disable-next-line new-cap
const router = Router();

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    const whitelist = ['http://localhost:23333', undefined];
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

const getPixiv = async (next: NextFunction) => {
  const cacheKey = 'pixiv_instance';
  const cacheItem = cache.get<Pixiv<false>>(cacheKey);
  if (cacheItem) {
    try {
      const authInfo = cacheItem.authInfo();
      await cacheItem.userDetail(Number(authInfo.user.id));
      return cacheItem;
    } catch (err) {
      cache.del(cacheKey);
    }
  }

  const pixiv = new Pixiv(
    process.env.PIXIV_USERNAME,
    process.env.PIXIV_PASSWORD,
    {
      camelcaseKeys: false
    }
  );
  try {
    await pixiv.login();
    cache.set(cacheKey, pixiv, 60 * 60 * 3);
    return pixiv;
  } catch (err) {
    next(err);
  }
};

router.get('/ranking', cors(corsOptions), async (req, res, next) => {
  try {
    let page = req.query.page || 1;
    page = page < 0 ? 1 : Number(page);
    const pixiv = await getPixiv(next);
    const result = await pixiv.illustRanking({
      // @ts-ignore
      offset: (page - 1) * 25
    });
    res.json({
      status: 'success',
      response: {
        illusts: result.illusts
      }
    });
  } catch (err) {
    next(err);
  }
});

router.get('/search', cors(corsOptions), async (req, res, next) => {
  let page = req.query.page || 1;
  page = page < 0 ? 1 : Number(page);
  let word = req.query.word || '';
  if (word) {
    word = word + ' users入り';
  }
  try {
    const pixiv = await getPixiv(next);
    const result = await pixiv.searchIllust(word, {
      // @ts-ignore
      offset: (page - 1) * 25,
      sort: 'popular_desc'
    });
    res.json({
      status: 'success',
      response: {
        illusts: result.illusts
      }
    });
  } catch (err) {
    next(err);
  }
});

router.get(/^\/illust\/(\d+)$/, cors(corsOptions), async (req, res, next) => {
  const illustId = Number(req.params[0]);
  try {
    const pixiv = await getPixiv(next);
    const result = await pixiv.illustDetail(illustId);
    res.json({
      status: 'success',
      response: {
        illust: result.illust
      }
    });
  } catch (err) {
    next(err);
  }
});

router.get(
  /^\/illust\/comments\/(\d+)$/,
  cors(corsOptions),
  async (req, res, next) => {
    let page = req.query.page || 1;
    page = page < 0 ? 1 : Number(page);
    const illustId = Number(req.params[0]);
    try {
      const pixiv = await getPixiv(next);
      const result = await pixiv.illustComments(illustId, {
        // @ts-ignore
        offset: (page - 1) * 25
      });
      res.json({
        status: 'success',
        response: {
          comments: result.comments,
          next: pixiv.hasNext()
        }
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
