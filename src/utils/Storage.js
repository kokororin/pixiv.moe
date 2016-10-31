export default class Storage {

  static isSupport() {
    const key = 'test-key';
    try {
      window.localStorage.setItem(key, key);
      window.localStorage.removeItem(key);
      return true;
    } catch ( e ) {
      return false;
    }
  }

  static set(key, value) {
    if (!Storage.isSupport()) return;
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
  }

  static get(key, convertToJSON = true) {
    if (!Storage.isSupport()) return null;
    let value = window.localStorage.getItem(key);
    if (!convertToJSON) return value;
    try {
      value = JSON.parse(value);
    } catch ( e ) {}
    return value;
  }

  static remove(key) {
    if (!Storage.isSupport()) return;
    window.localStorage.removeItem(key);
  }

  static search(query) {
    if (!Storage.isSupport()) return Promise.resolve([]);
    return new Promise((resolve) => {
      const regx = new RegExp(query),
        searchResults = [];
      for (let i = 0, l = window.localStorage.length; i < l; i++) {
        const storageKey = window.localStorage.key(i);
        const matches = storageKey.match(regx);
        if (matches && matches.length > 0) {
          searchResults.push(matches[0]);
        }
      }
      resolve(searchResults);
    });
  }
}
