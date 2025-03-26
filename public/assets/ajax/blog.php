<?php
foreach (glob(__DIR__ . '/../../../functions/{*.php}', GLOB_BRACE) as $file) {
  if (is_file($file)) {
    include_once($file);
  }
}

header('Content-Type: text/html; charset=UTF-8');
$data = json_decode(file_get_contents('php://input'), true);

$is_index = (isset($_GET['paths']) && $_GET['paths'] === 'post');
$is_query = isset($data['q']);

if ($is_query) {
  $data['topicpath'] = '<strong>「' . htmlspecialchars($data['q'], ENT_QUOTES, 'UTF-8') . '」の検索結果</strong>';
}

function prevnext_unit ($data) {
  $html = '';

  if (!$data) {
    return $html;
  }

  $html .= '<a class="post__prevnext-unit-link" href="' . $data['link'] . '" data-id="' . $data['id'] . '">';
  $html .= '<div class="post__prevnext-unit-link-inner">';
  $html .= '<div class="post__prevnext-unit-thumbnail">';
  $html .= '<figure style="background-image:url(' . $data['image'] . ')"></figure>';
  $html .= '</div>';
  $html .= '<div class="post__prevnext-unit-content">';
  $html .= '<h1 class="post__prevnext-unit-title">' . $data['title'] . '</h1>';
  $html .= '<p class="post__prevnext-unit-excerpt">' . $data['excerpt'] . '</p>';
  $html .= '<div class="post__prevnext-unit-category-and-date">';
  $html .= '<span>' . $data['cateogry_name'] . '</span>';
  $html .= '<span>' . $data['date'] . '</span>';
  $html .= '</div>';
  $html .= '</div>';
  $html .= '</div>';
  $html .= '</a>';

  return $html;
}
?>
<div class="blog">
  <script>
    <?php if ($is_index && !$is_query): ?>
      $('.js-form-blog-search').addClass('blog-header__search--index')
      $('.js-blog-hgroup').addClass('show')
      $('.js-blog-topicpath').html(`<a href="/">ホーム</a><strong>制作ブログ</strong>`)
    <?php else: ?>
      $('.js-form-blog-search').removeClass('blog-header__search--index')
      $('.js-blog-hgroup').removeClass('show')
      $('.js-blog-topicpath').html(`<a href="/">ホーム</a><a href="/post/">制作ブログ</a><?php echo $data['topicpath']; ?>`)
    <?php endif; ?>
  </script>
  <?php if (isset($data) && isset($data['type'])): ?>
    <main class="blog__main">
      <?php if ($data['type'] === 'post'): ?>
        <style><?php echo $data['acf']['stylesheet'] ?? ''; ?></style>

        <div class="post">
          <?php if ($data['image']): ?>
          <figure class="post__mainvisual" style="background-image:url(<?php echo $data['image']; ?>);"></figure>
          <?php endif; ?>

          <h1 class="post__title"><?php echo $data['title']; ?></h1>

          <div class="post__category-and-date">
            <!-- <span><?php echo $data['category']['name']; ?></span> -->
            <div>
              <time datetime="<?php echo $data['date']['time']; ?>"><?php echo $data['date']['date']; ?></time>
              <?php if (isset($data['acf']['update']) && $data['acf']['update'] != ''): ?>
                <span>（<?php echo $data['acf']['update']; ?>更新）</span>
              <?php endif; ?>
            </div>
          </div>

          <div class="post__content">
            <?php echo $data['content']; ?>
          </div>

          <ul class="post__socialmedia">
            <?php if (isset($data['acf']['github']) && $data['acf']['github'] != ''): ?>
              <li>
                <a href="<?php echo $data['acf']['github']; ?>" target="_blank"></a>
              </li>
            <?php endif; ?>
            <?php if (isset($data['acf']['youtube']) && $data['acf']['youtube'] != ''): ?>
              <li>
                <a href="<?php echo $data['acf']['youtube']; ?>" target="_blank"></a>
              </li>
            <?php endif; ?>
          </ul>

          <aside class="comment">
            <div class="comment__inner">
              <h1 class="comment__title">COMMENT</h1>
              <p class="comment__excerpt">
                最後まで目を通していただき、ありがとうございます。この記事はいかがでしたか？
                <?php if (count($data['comments']) === 0): ?>
                <br>この記事の最初のコメントを書いてくれると嬉しいです！
                <?php endif; ?>
              </p>
              <form class="comment__form js-form-comment">
                <input type="hidden" name="comment_post_ID" value="<?php echo $data['id']; ?>">
                <input type="hidden" name="comment_parent" value="0">
                <textarea name="comment"></textarea>
                <p class="comment__form-notification js-comment-notification">TODOこれはサンプルテストでがおざいます</p>
                <div class="comment__form-flex">
                  <input type="text" name="author" value="" placeholder="ニックネーム">
                  <button type="button" class="comment__submit js-comment-submit">コメントする</button>
                </div>
              </form>

              <ul class="comment__list js-comment-list">
                <?php foreach ($data['comments'] as $comment): ?>
                  <?php
                    $nickname = htmlspecialchars($comment['author'], ENT_QUOTES, 'UTF-8');
                    if (trim($nickname) === '') {
                      $nickname = '(匿名)';
                    }
                  ?>
                  <li class="comment__unit">
                    <p class="comment__unit-text"><?php echo nl2br(htmlspecialchars($comment['content'], ENT_QUOTES, 'UTF-8')); ?></p>
                    <p class="comment__unit-info">
                      <span><?php echo $nickname; ?></span>
                      <time><?php echo htmlspecialchars($comment['date'], ENT_QUOTES, 'UTF-8'); ?></time>
                    </p>
                  </li>
                <?php endforeach; ?>
              </ul>

            </div>
          </aside>

          <aside class="post__prevnext">
            <h1 class="post__prevnext-title">同じカテゴリの前後記事</h1>
            <div class="post__prevnext-inner">
              <div class="post__prevnext-unit">
                <?php echo prevnext_unit($data['prev']); ?>
              </div>
              <div class="post__prevnext-unit">
                <?php echo prevnext_unit($data['next']); ?>
              </div>
            </div>
          </aside>

          <script><?php echo $data['acf']['javascript'] ?? ''; ?></script>
        </div>
      <?php elseif ($data['type'] === 'list'): ?>
        <hgroup class="blog__hgroup">
          <h1 class="js-blog-category-label"></h1>
          <p class="js-blog-category-description"></p>
        </hgroup>
        <div class="blog-list__contents js-blog-main-category">
          <div class="blog-list__contents-inner">
            <?php echo $data['html_list']; ?>
          </div>
        </div>
        <script>
          CATEGORY_HIT_COUNT = $('.js-blog-main-category .blog-list-unit').length
          CATEGORY = CATEGORIES.find(item => item.id == <?php echo $data['blog_category_id']; ?>)

          $('.js-blog-category-description').html(CATEGORY.description + '<br>「' + CATEGORY.name + '」は ' + CATEGORY_HIT_COUNT + '記事あります。')
          $('.js-blog-category-label').html(CATEGORY.name)
          $('.js-blog-topicpath').append(CATEGORY.topicpath)
        </script>
      <?php endif; ?>
    </main>
  <?php elseif ($is_query): ?>
    <main class="blog__main">
      <hgroup class="blog__hgroup">
        <h1>「<?php echo htmlspecialchars($data['q'], ENT_QUOTES, 'UTF-8'); ?>」の検索結果</h1>
        <p>「<?php echo htmlspecialchars($data['q'], ENT_QUOTES, 'UTF-8'); ?>」の検索結果は <span class="js-blog-main-search-excerpt"></span></p>
      </hgroup>

      <div class="blog-list__contents js-blog-main-search">
        <div class="blog-list__contents-inner">
          <?php
            $source = file_get_contents_custom('https://data.simplesimples.com/api2/?class=blog-list&filename=search&search_word=' . $data['q']);

            if ($source != 'zero_hit') {
              echo $source;
            }
          ?>
        </div>
      </div>
      <script>
        SEARCH_HIT_COUNT = $('.js-blog-main-search .blog-list-unit').length,
        SEARCH_HIT_TEXT = (SEARCH_HIT_COUNT > 0)? SEARCH_HIT_COUNT + '記事あります。' : '見つかりませんでした。'

        $('.js-blog-main-search-excerpt').html(SEARCH_HIT_TEXT)
      </script>
    </main>
  <?php else: ?>
    <main class="blog__main blog__main-index">
      <p>制作ブログは<span class="js-blog-count-posts-value"></span>記事あります。</p>
      <script>
        BLOG_COUNT_POSTS = $('.js-blog-count-posts').text().trim()
        $('.js-blog-count-posts-value').text(BLOG_COUNT_POSTS)
      </script>
    </main>
  <?php endif; ?>

</div>