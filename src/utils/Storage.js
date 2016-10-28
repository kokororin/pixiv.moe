export default class Storage {

  static set(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
  }

  static get(key) {
    let value = window.localStorage.getItem(key);
    try {
      value = JSON.parse(value);
    } catch ( e ) {}
    return value;
  }

  static remove(key) {
    window.localStorage.removeItem(key);
  }

  static search(query) {
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
