/**
 * 
 * @file https://static.pixiv.moe/main.js
 * @param {object} window
 * @param {object} window.jQuery
 * @param {object} window.lightbox
 *
 * @date 2016-09-03
 */
;(function(m, o, e) {
  'use strict';

  var containerId = '#pixiv-container',
    container = o(containerId),
    loading = o('#loading'),
    failure = o('#load-fail'),
    refreshId = '#refresh',
    refresh = o(refreshId),
    refreshIcon = o('#refresh i'),
    spinner = o('#refresh .loading-spinner'),

    waterfallOpt = {
      getResource: function(index, render) {
        getSource(false, render);
      }
    },

    buildHtml = function(item) {
      return [
        '<div class="cell" data-illust-id="' + item.id + '">',
        '<a href="' + item.image_urls.px_480mw + '" data-lightbox="pixiv.moe" data-title="' + item.link + '">',
        '<img src="' + item.image_urls.px_480mw + '" />',
        '</a>',
        '<p class="title"><a target="_blank" href="' + m.base + item.id + '">' + item.title + '</a></p>',
        '<p class="meta">' + (item.stats.favorited_count.public + item.stats.favorited_count.private) + '件のブックマーク</p>',
        '</div>'
      ].join('');
    },

    getSource = function(isFirstLoad, callback) {
      m.loading ? false : void o.ajax({
        method: 'get',
        url: m.source,
        data: {
          page: ++m.page
        },
        dataType: 'jsonp',
        crossDomain: true,
        timeout: 15e3,
        beforeSend: function() {
          failure.hide();
          loading.show();
          if (isFirstLoad) {
            m.loading = true;
          }
        }
      })
        .done(function(data) {
          if (data.status == 'success' && data.count > 0) {
            var html = '';
            o.each(data.response, function(i, elem) {
              html += buildHtml(elem);
              if (isFirstLoad && i == 0) {
                m.lastId = elem.id;
              }
            });
            if (isFirstLoad) {
              var append = o(html).css('opacity', 0);
              append.appendTo(containerId);
              append.fadeTo(600, 1);
              container.waterfall(waterfallOpt);
              m.isFirstLoadCompleted = true;
            }
            if (typeof callback === 'function') {
              callback(o(html))
            }
          } else {
            if (isFirstLoad) {
              failure.show();
            }
          }
        })
        .fail(function() {
          if (isFirstLoad) {
            failure.show();
          }
          setTimeout(function() {
            refreshIcon.show();
            spinner.hide();
          }, 1500);
        })
        .always(function() {
          loading.hide();
          m.loading = false;
        });
    },

    onRefresh = function() {
      container.fadeOut().empty();
      refreshIcon.hide();
      spinner.show();
      m.page = 0;
      getSource(true, function() {
        container.fadeIn();
        m.document.title = m.originTitle;
        refreshIcon.show();
        spinner.hide();
      });
    },

    disableScroll = function() {
      setInterval(function() {
        var overlay = o('#lightboxOverlay');
        if (overlay.length > 0) {
          (overlay.css('display') == 'none') ? o('body').unbind('mousewheel') :
            o('body').bind('mousewheel', function(event, delta) {
              event.preventDefault();
            });
        }
      }, 100);
    },

    onCheckLatent = function() {
      setInterval(function() {
        if (m.isFirstLoadCompleted && m.lastId != null) {
          o.ajax({
            method: 'get',
            url: m.source,
            data: {
              last: m.lastId
            },
            dataType: 'jsonp',
            crossDomain: true,
          })
            .done(function(data) {
              if (data.status == 'success' && data.new_latent_count) {
                var count = data.new_latent_count;
                if (count > 0) {
                  setTimeout(function() {
                    var html = '';
                    o.each(data.response, function(i, elem) {
                      if (i == count) {
                        return false;
                      }
                      if (i == 0) {
                        m.lastId = elem.id;
                      }
                      //html += buildHtml(elem);
                      m.newCount++;
                    });
                    //container.prepend(html);
                    //container.waterfall(waterfallOpt);
                    m.document.title = '(' + m.newCount + ') ' + m.originTitle;
                  }, 1500);
                }
              }
            });
        }
      }, 10000);
    },
    initialize = function() {
      disableScroll();
      onCheckLatent();
      getSource(true, null);
      e.option({
        showImageNumberLabel: false
      });
      try {
        var event = new Promise(function(r, j) {
          setTimeout(r, 0)
        });
        event.then(console.log("%c%s", "color: black; font-size: 18px;", "You can contact us on Twitter.\n https://twitter.com/LLPixiv"));
      } catch ( err ) {}

    };


  o(m.document)
    .on('click', refreshId, onRefresh)
    .ready(initialize);


})(window, jQuery, lightbox);