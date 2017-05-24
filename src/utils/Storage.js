import store from 'store';

export default class Storage {
  static isSupport() {
    return store.enabled;
  }

  static set(key, value) {
    if (!Storage.isSupport()) return Storage;
    store.set(key, value);
    return Storage;
  }

  static get(key) {
    if (!Storage.isSupport()) return null;
    const value = store.get(key);
    return typeof value === 'undefined' ? null : value;
  }

  static remove(key) {
    if (!Storage.isSupport()) return Storage;
    store.remove(key);
    return Storage;
  }

  static clear() {
    if (!Storage.isSupport()) return;
    store.clear();
  }

  static search(query) {
    if (!Storage.isSupport()) return Promise.resolve([]);
    return new Promise((resolve, reject) => {
      if (!query instanceof RegExp) {
        reject(new Error('query is not a RegExp'));
      }
      const regx = new RegExp(query), searchResults = [];
      store.each((value, key) => {
        const matches = key.match(regx);
        if (matches && matches.length > 0) {
          searchResults.push(matches[0]);
        }
      });
      resolve(searchResults);
    });
  }
}
