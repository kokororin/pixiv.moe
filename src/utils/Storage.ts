import store from 'store';

export default class Storage {
  static isSupport() {
    return store.enabled;
  }

  static set(key: string, value: any) {
    if (!Storage.isSupport()) {
      return Storage;
    }
    store.set(key, value);
    return Storage;
  }

  static get(key: string) {
    if (!Storage.isSupport()) {
      return null;
    }
    const value = store.get(key);
    return typeof value === 'undefined' ? null : value;
  }

  static remove(key: string) {
    if (!Storage.isSupport()) {
      return Storage;
    }
    store.remove(key);
    return Storage;
  }

  static clear() {
    if (!Storage.isSupport()) {
      return;
    }
    store.clearAll();
  }

  static search(query: RegExp) {
    if (!Storage.isSupport()) {
      return Promise.resolve([]);
    }
    return new Promise(resolve => {
      const regx = new RegExp(query);
      const searchResults: any[] = [];
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
