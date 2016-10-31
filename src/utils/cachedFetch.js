// modify from https://www.sitepoint.com/cache-fetched-ajax-requests/
import time from 'locutus/php/datetime/time';
import httpBuildQuery from 'locutus/php/url/http_build_query';

import { hashStr, Storage } from '.';

export default function cachedFetch(url, options) {
  const expiryKey = options.expiryKey,
    query = options.query,
    timeout = options.timeout;
  let cacheKey = undefined;

  if (typeof query === 'object') {
    url += '?' + httpBuildQuery(query);
  }
  // let fetch supports timeout
  let isTimeout = false;
  const timeoutId = (typeof timeout === 'number') ?
    setTimeout(() => {
      isTimeout = true;
    }, timeout) : setTimeout(void 0);

  if (typeof expiryKey === 'string') {
    // Use the URL as the cache key to sessionStorage
    cacheKey = 'cf_' + hashStr(url);
    const cached = Storage.get(cacheKey, false);
    const cachedExpiresAt = Storage.get(cacheKey + ':ts');
    if (cached !== null && cachedExpiresAt !== null) {
      // it was in sessionStorage! Yay!
      if (time() < parseInt(cachedExpiresAt, 10)) {
        const response = new Response(new Blob([cached]));
        return Promise.resolve(response);
      }
      // We need to clean up this old key
      Storage.remove(cacheKey);
      Storage.remove(cacheKey + ':ts');
    }
  }

  return fetch(url, options).then((response) => {
    if (isTimeout) {
      throw new Error('request timeout');
    }
    clearTimeout(timeoutId);
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
          if (typeof expiryKey === 'string') {
            Storage.set(cacheKey, content);
            content = JSON.parse(content);
            Storage.set(cacheKey + ':ts', content[expiryKey]);
          }
        });
      }
    }
    return response;
  });
}
