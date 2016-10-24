// modify from https://www.sitepoint.com/cache-fetched-ajax-requests/
import time from 'locutus/php/datetime/time';

const hashStr = (str) => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

export default (url, options) => {
  let expiryKey = undefined;
  expiryKey = options.expiryKey;
  if (typeof expiryKey !== 'string') {
    throw new Error('No expiryKey given.');
  }
  // Use the URL as the cache key to sessionStorage
  const cacheKey = 'cf_' + hashStr(url);
  const cached = localStorage.getItem(cacheKey);
  const cachedExpiresAt = localStorage.getItem(cacheKey + ':ts');
  if (cached !== null && cachedExpiresAt !== null) {
    // it was in sessionStorage! Yay!
    if (time() < parseInt(cachedExpiresAt, 10)) {
      const response = new Response(new Blob([cached]));
      return Promise.resolve(response);
    }
    // We need to clean up this old key
    localStorage.removeItem(cacheKey);
    localStorage.removeItem(cacheKey + ':ts');

  }

  return fetch(url, options).then((response) => {
    // let's only store in cache if the content-type is
    // JSON or something non-binary
    if (response.status === 200) {
      const ct = response.headers.get('Content-Type');
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        // There is a .json() instead of .text() but
        // we're going to store it in sessionStorage as
        // string anyway.
        // If we don't clone the response, it will be
        // consumed by the time it's returned. This
        // way we're being un-intrusive.
        response.clone().text().then((content) => {
          localStorage.setItem(cacheKey, content);
          content = JSON.parse(content);
          localStorage.setItem(cacheKey + ':ts', content[expiryKey]);
        });
      }
    }
    return response;
  });
};
