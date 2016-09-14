<?php
if (!defined('PIXIV_ROOT')) {
    exit('Forbidden.');
}
?>
<?php
if (isCached()) {
    exit(getCache());
}
ob_start();
?>
  <!doctype html>
  <html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="pixiv.moe - Pixivのラブライブ発見 - Pixiv 图片墙" />
    <meta name="keywords" content="pixiv,pixiv图片墙,pixiv lovelive,lovelive,ラブライブ" />
    <meta name="google-site-verification" content="aHrpJZ8M_WPQb07omJ2bwC2fg2DQMgFFEovu9wsSD0E" />
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//static.pixiv.moe">
    <link rel="dns-prefetch" href="//i1.pixiv.moe">
    <link rel="dns-prefetch" href="//i2.pixiv.moe">
    <link rel="dns-prefetch" href="//i3.pixiv.moe">
    <link rel="dns-prefetch" href="//i4.pixiv.moe">
<?php include_once __DIR__ . '/orig.header.php';?>
    <title>Pixivのラブライブ発見</title>
    <link href="//fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link href="<?php echo STATIC_BASE_URL; ?>/main.css" rel="stylesheet" />
    <link href="//cdnjs.cloudflare.com/ajax/libs/lightbox2/2.8.2/css/lightbox.min.css" rel="stylesheet" />
  </head>

  <body>
    <noscript>
        <div class="message">
            <p>Javascriptが無効になっていると、サイト内の一部機能がご利用いただけません</p>
        </div>
    </noscript>

    <div id="pixiv-container"></div>
    <div id="loading" style="display: none;">
        <div class="message"><img src="data:image/gif;base64,R0lGODlhEAALAPQAAP///zMzM+Li4tra2u7u7jk5OTMzM1hYWJubm4CAgMjIyE9PT29vb6KiooODg8vLy1JSUjc3N3Jycuvr6+Dg4Pb29mBgYOPj4/X19cXFxbOzs9XV1fHx8TMzMzMzMzMzMyH5BAkLAAAAIf4aQ3JlYXRlZCB3aXRoIGFqYXhsb2FkLmluZm8AIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7" alt=""><p>データが记载する中</p></div>
    </div>
    <div id="load-fail" style="display: none;">
        <div class="message">
            <p>読み込みに失敗しました</p>
        </div>
    </div>

    <div id="refresh" class="float-btn">
        <i class="material-icons">&#xE042;</i>
        <div class="loading-spinner"></div>
    </div>

    <script>

                window.source = '<?php echo SOURCE_URL;?>';
                window.base = '<?php echo BASE_URL; ?>';
                window.loading = false;
                window.page = 0;
                window.isFirstLoadCompleted = false;
                window.lastId = null;
                window.originTitle = 'Pixivのラブライブ発見';
                window.newCount = 0;

    </script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/lightbox2/2.8.2/js/lightbox.min.js"></script>
    <script type="text/javascript" src="<?php echo STATIC_BASE_URL; ?>/??waterfull.js,main.js"></script>
<?php include_once __DIR__ . '/orig.footer.php'; ?>
  </body>

  </html>
<?php 
$content = ob_get_clean();
$content = minify($content);
setCache($content);
exit(getCache());
?>