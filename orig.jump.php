<?php
if (!defined('PIXIV_ROOT')) {
    exit('Forbidden.');
}
?>
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta content="noindex, nofollow" name="robots" />
<?php include_once __DIR__ . '/orig.header.php';?>

<title>あなたはpixiv.netへリダイレクトしています</title>
</head>
<body>
	<div style="text-align: center;padding: 10px 0;color: #999;">
            <p>あなたはpixiv.netへリダイレクトしています</p>
    </div>
<script>
setTimeout(function(){
	window.location.href = '<?php echo $url;?>';
}, 1500);
</script>
<?php include_once __DIR__ . '/orig.footer.php'; ?>
</body>
</html>