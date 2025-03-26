<?php
session_start();

if (!isset($_SESSION['csrf_token'])) {
  $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
<!DOCTYPE html>
<html lang="ja" prefix="og: http://ogp.me/ns#">
  <head>
    <meta charset="utf-8">
    <title></title>
    <meta name="robots" content="ALL">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <meta property="og:image" content="">
    <meta name="description" content="">
    <link rel="shortcut icon" href="/assets/favicon.ico">
    <link rel="apple-touch-icon-precomposed" href="/assets/favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="/assets/css/common.min.css?<?php echo filemtime('./assets/css/common.min.css'); ?>">
    <link rel="canonical" href="">
  </head>
  <body>
    <nav class="nav">
      <p><a class="js-link" href="/">ホーム</a></p>
      <ul>
        <li><a class="js-link" href="/post/">制作ブログ</a></li>
        <li><a class="js-link" href="/service/">サービス</a></li>
        <li><a class="js-link" href="/about/">事業について</a></li>
        <li><a class="js-link" href="/contact/">お問い合わせ</a></li>
      </ul>
    </nav>

    <article class="article js-article">
      <div class="article__inner js-article-inner"></div>
      <div class="loading js-loading">loading...</div>
    </article>

    <script src="/assets/js/jquery-3.7.1.min.js"></script>
    <script>
      const CSRF_TOKEN = '<?php echo $_SESSION['csrf_token']; ?>'
    </script>
    <script src="/assets/js/common.min.js?<?php echo filemtime('./assets/js/common.min.js'); ?>"></script>
  </body>
</html>