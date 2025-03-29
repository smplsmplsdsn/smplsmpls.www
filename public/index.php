<?php
// data
// s8yH yt77 8kNg l2Q1 Z3pY kLn3
// echo -n "takenori:s8yH yt77 8kNg l2Q1 Z3pY kLn3" | base64
// dGFrZW5vcmk6czh5SCB5dDc3IDhrTmcgbDJRMSBaM3BZIGtMbjM=
//
// 'Authorization': 'Basic dGFrZW5vcmk6czh5SCB5dDc3IDhrTmcgbDJRMSBaM3BZIGtMbjM='
//
// www
// vINO K18p fUr5 s1t7 TSAA M66g
// echo -n "takenori:vINO K18p fUr5 s1t7 TSAA M66g" | base64
// dGFrZW5vcmk6dklOTyBLMThwIGZVcjUgczF0NyBUU0FBIE02Nmc=
//
// 'Authorization': 'Basic dGFrZW5vcmk6dklOTyBLMThwIGZVcjUgczF0NyBUU0FBIE02Nmc='
//
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

    <link rel="stylesheet" href="/assets/highlight/styles/github-dark.min.css">
    <script src="/assets/highlight/highlight.min.js"></script>
  </head>
  <body>
    <div class="js-splash splash" style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;display:flex;justify-content:center;align-items:center;background:#fff;">splash TODO</div>

    <div class="mainvisual">
      <div class="mainvisual__content">
        <div class="mainvisual__content-inner">
          <h1 class="mainvisual__title">
            ロゴ
          </h1>
          <p>シンプルシンプルデザインは、おかげさまで2025年2月で10周年を迎えることができました。これもみなさんのおかげです。ありがとうございます。今後ともどうぞよろしくお願いいたします。</p>
          <ul class="mainvisual__lists">
            <li><a class="js-link" href="/post/">制作ブログ</a></li>
            <li><a class="js-link" href="/service/">サービス</a></li>
            <li><a class="js-link" href="/about/">事業について</a></li>
            <li><a class="js-link" href="/contact/">お問い合わせ</a></li>
          </ul>
        </div>
      </div>
      <div class="mainvisual__visual"></div>
    </div>

    <header class="header js-header">
      <nav class="nav">
        <p><a class="js-link" href="/">ホーム</a></p>
        <ul>
          <li><a class="js-link" href="/post/">制作ブログ</a></li>
          <li><a class="js-link" href="/service/">サービス</a></li>
          <li><a class="js-link" href="/about/">事業について</a></li>
          <li><a class="js-link" href="/contact/">お問い合わせ</a></li>
        </ul>
      </nav>
    </header>


    <article class="article js-article">
      <div class="article__inner js-article-inner"></div>
      <div class="loading js-loading">loading...</div>
    </article>

    <section class="post-list">
      <h2 class="post-list__title">制作ブログ</h2>
      <section class="post-list__section">
        <h3 class="post-list__section-title">最近の15記事</h3>
        <div class="scroll js-scroll-post-recenlty">
          <div class="scroll__outer">
            <div class="scroll__inner">
              <div class="scroll__content js-post-recenlty-lists post-list-units"></div>
            </div>
          </div>
        </div>
      </section>
      <section class="post-list__section">
        <h3 class="post-list__section-title">よく読まれている15記事</h3>
        <div class="scroll js-scroll-post-popular">
          <div class="scroll__outer">
            <div class="scroll__inner">
              <div class="scroll__content js-post-popular-lists post-list-units"></div>
            </div>
          </div>
        </div>
      </section>
      <section class="post-list__section">
        <h3 class="post-list__section-title">最近コメントありの15記事</h3>
        <div class="scroll js-scroll-post-comment">
          <div class="scroll__outer">
            <div class="scroll__inner">
              <div class="scroll__content js-post-comment-lists post-list-units"></div>
            </div>
          </div>
        </div>
      </section>
    </section>

    <div class="post-nav">
      <div class="post-nav__inner js-post-nav"></div>
    </div>

    <footer class="footer">

      <p>
        <a class="js-link" href="/">ホーム</a>
      </p>
      <ul class="mainvisual__lists">
        <li><a class="js-link" href="/post/">制作ブログ</a></li>
        <li><a class="js-link" href="/service/">サービス</a></li>
        <li><a class="js-link" href="/about/">事業について</a></li>
        <li><a class="js-link" href="/contact/">お問い合わせ</a></li>
      </ul>
      <div>
        <a class="js-link" href="/privacy/">プライバシーポリシー</a>
      </div>

      <small class="footer__copyright">SINCE 2015 &copy; シンプルシンプルデザイン</small>
    </footer>

    <script src="/assets/js/jquery-3.7.1.min.js"></script>
    <script>
      const CSRF_TOKEN = '<?php echo $_SESSION['csrf_token']; ?>'
    </script>
    <script src="/assets/js/common.min.js?<?php echo filemtime('./assets/js/common.min.js'); ?>"></script>
  </body>
</html>