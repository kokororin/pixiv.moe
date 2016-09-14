<?php
define('PIXIV_ROOT', __DIR__);

require_once __DIR__ . '/functions.php';

define('BASE_URL', '//pixiv.moe/');
define('STATIC_BASE_URL', '//static.pixiv.moe');
define('ICON_BASE_URL', STATIC_BASE_URL . '/icons');
define('SOURCE_URL', 'https://api.kotori.love/pixiv/source.php');

$query = trim($_GET['i']);

if (is_numeric($query)) {
    $url = 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=' . $query;
    require __DIR__ . '/orig.jump.php';
} elseif ($query == '' || $query == 'index.html' || $query == 'index.htm') {
    require __DIR__ . '/orig.home.php';
} elseif ($query == 'source.json') {
    require __DIR__ . '/orig.source.php';
} else {
    header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found", true, 404);
    exit('404 Not Found.');
}
