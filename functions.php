<?php
if (!defined('PIXIV_ROOT')) {
    exit('Forbidden.');
}

function getCacheName()
{
    return __DIR__ . '/cache/' . date('Y-m-d') . '.cache';
}

function isCached()
{
    return is_file(getCacheName());
}

function getCache()
{
    return file_get_contents(getCacheName());
}

function setCache($content)
{
    clearCache();
    $content .= '<!-- Cached page generated on ' . gmdate('Y-m-d H:i:s') . ' (utc) -->';
    file_put_contents(getCacheName(), $content);
}

function clearCache()
{
    $files = glob(__DIR__ . '/cache/*');
    foreach ($files as $file) {
        if (is_file($file)) {
            unlink($file);
        }
    }
}

function minify($buffer)
{
    $initial = strlen($buffer);
    $buffer = explode("<!--wp-compress-html-->", $buffer);
    $count = count($buffer);
    for ($i = 0; $i <= $count; $i++) {
        if (stristr($buffer[$i], '<!--wp-compress-html no compression-->')) {
            $buffer[$i] = (str_replace("<!--wp-compress-html no compression-->", " ", $buffer[$i]));
        } else {
            $buffer[$i] = (str_replace("\t", " ", $buffer[$i]));
            $buffer[$i] = (str_replace("\n\n", "\n", $buffer[$i]));
            $buffer[$i] = (str_replace("\n", "", $buffer[$i]));
            $buffer[$i] = (str_replace("\r", "", $buffer[$i]));
            while (stristr($buffer[$i], '  ')) {
                $buffer[$i] = (str_replace("  ", " ", $buffer[$i]));
            }
        }
        $buffer_out .= $buffer[$i];
    }
    $final = strlen($buffer_out);
    $savings = ($initial - $final) / $initial * 100;
    $savings = round($savings, 2);
    //$buffer_out .= "\n<!--压缩前的大小: $initial bytes; 压缩后的大小: $final bytes; 节约：$savings% -->";
    return $buffer_out;
}

function getBaseUrl()
{
    if (isset($_SERVER['HTTP_HOST']) && preg_match('/^((\[[0-9a-f:]+\])|(\d{1,3}(\.\d{1,3}){3})|[a-z0-9\-\.]+)(:\d+)?$/i', $_SERVER['HTTP_HOST'])) {
        $base_url = (isSecure() ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST']
        . substr($_SERVER['SCRIPT_NAME'], 0, strpos($_SERVER['SCRIPT_NAME'], basename($_SERVER['SCRIPT_FILENAME'])));
    } else {
        $base_url = 'http://localhost/';
    }
    return rtrim($base_url, '/') . '/';
}

function isSecure()
{
    if (!empty($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off') {
        return true;
    } elseif (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && 'https' === $_SERVER['HTTP_X_FORWARDED_PROTO']) {
        return true;
    } elseif (!empty($_SERVER['HTTP_FRONT_END_HTTPS']) && strtolower($_SERVER['HTTP_FRONT_END_HTTPS']) !== 'off') {
        return true;
    }
    return false;
}
