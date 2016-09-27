export default () => {
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: () => supportsPassive = true
    });
    window.addEventListener('test-for-passive', null, opts);
  } catch ( e ) {}
  return supportsPassive;
};