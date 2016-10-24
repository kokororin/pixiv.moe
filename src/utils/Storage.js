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
}
