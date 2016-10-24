// modify from https://github.com/joernroeder/piwik-react-router
export default class Piwik {

  previousPath = null;

  unlistenFromHistory = null;

  opts = {};

  constructor(opts = {}) {
    this.opts = opts;
    opts.trackErrors = ((opts.trackErrors !== undefined) ? opts.trackErrors : false);
    opts.enableLinkTracking = ((opts.enableLinkTracking !== undefined) ? opts.enableLinkTracking : true);
    opts.updateDocumentTitle = ((opts.updateDocumentTitle !== undefined) ? opts.updateDocumentTitle : true);

    if (!opts.url || !opts.siteId) {
      throw Error('PiwikTracker cannot be initialized! You haven\'t passed a url and sideId to it.');
    }
    window._paq = window._paq || [];

    if (opts.trackErrors) {
      if (window.addEventListener) {
        window.addEventListener('error', this.trackError, false);
      } else if (window.attachEvent) {
        window.attachEvent('onerror', this.trackError);
      } else {
        window.onerror = this.trackError;
      }
    }

    // piwik initializer
    {
    let u = null;
    if (opts.url.indexOf('http://') !== -1 || opts.url.indexOf('https://') !== -1) {
      u = opts.url + '/';
    } else {
      u = ((document.location.protocol === 'https:') ? 'https://' + opts.url + '/' : 'http://' + opts.url + '/');
    }

    this.push(['setSiteId', opts.siteId]);
    this.push(['setTrackerUrl', u + 'piwik.php']);

    if (opts.enableLinkTracking) {
      this.push(['enableLinkTracking']);
    }

    const d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.defer = true;
    g.async = true;
    g.src = u + 'piwik.js';
    s.parentNode.insertBefore(g, s);
    }

  }


  /**
   * Adds a page view for the the given location
   */
  track(currentPath) {

    if (this.previousPath === currentPath) {
      return;
    }

    if (this.opts.updateDocumentTitle) {
      this.push(['setDocumentTitle', document.title]);
    }
    this.push(['setCustomUrl', currentPath]);
    this.push(['trackPageView']);

    this.previousPath = currentPath;
  }

  /**
   * Pushes the specified args to the piwik tracker.
   * You can use this method as the low-level api to call methods from the piwik API or call custom functions
   *
   * @see https://developer.piwik.org/guides/tracking-javascript-guide
   */
  push(args) {
    window._paq.push(args);
  }

  /**
   * Tracks occurring javascript errors as a `JavaScript Error` piwik event.
   *
   * @see http://davidwalsh.name/track-errors-google-analytics
   */
  trackError(e, eventName = 'JavaScript Error') {
    this.push([
      'trackEvent',
      eventName,
      e.message,
      e.filename + ':  ' + e.lineno
    ]);
  }

  connectToHistory(history) {
    this.unlistenFromHistory = history.listen(function(loc) {
      this.track(loc);
    });

    return history;
  }

  disconnectFromHistory() {
    if (this.unlistenFromHistory) {
      this.unlistenFromHistory();
    }
  }

}
