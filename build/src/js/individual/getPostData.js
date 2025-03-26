ssd.getPostData = async (post_id) => {
  let html = ''

  let post_data = ssd.post.find(item => item.id == post_id)

  if (post_data) {
    return 'aruyo TODO'

  } else {
    post_data = await ssd.loadPost(post_id)

    // ガード
    if (!post_data?.content) {
      return 'TODO ネット切れてる場合'
    }

    ssd.post.push(post_data)
  }

  console.log(post_data)

  const image = (post_data?.image)? `<figure class="post__mainvisual mainvisual" style="background-image: url(${post_data.image});"></figure>` : ``


  let update = post_data?.acf?.update || ``

  if (update) {
    let update_array = update.split('-')

    update = `(${update_array[0]}年${update_array[1]}月${update_array[2]}日更新)`
  }

  const page_url = encodeURIComponent(`htttps://simplesimples.com${post_data.link}`),
        page_title = encodeURIComponent(post_data.title),
        site_name = encodeURIComponent('【シンプルシンプルデザイン】')

  const html_sns_git = (post_data?.acf?.github)? `<li><a class="sns-github" href="${post_data.acf.github}"><span class="icon-github"></span></a></li>`: ``,
        link_sns_twitter = `https://x.com/share?url=${page_url}&text=${page_title}${site_name}`,
        link_sns_facebook = `https://www.facebook.com/sharer/sharer.php?u=${page_url}`,
        link_sns_line = `https://line.me/R/msg/text/?${site_name}${page_title} ${page_url}`

  const html_sns = `
<ul class="sns-list post__sns-list">
  ${html_sns_git}
  <li><a href="${link_sns_twitter}"><span class="icon-twitter"></span></a></li>
  <li><a href="${link_sns_facebook}"><span class="icon-facebook"></span></a></li>
  <li><a href="${link_sns_line}"><span class="icon-line"></span></a></li>
</ul>
  `

  html = `
<main class="post js-post">
  ${image}
  <header class="post__header">

    <p class="post__datetime-and-category">
      <span class="post__datetime">
          <time datetime="${post_data.dateitme}">${post_data.date}</time>
          ${update}
      </span>
      <span class="post__category">${post_data.category_name}</span>
    </p>

    <h1 class="post__title">${post_data.title}</h1>
  </header>

  ${html_sns}

  <div class="content post__content js-post-content">
    ${post_data.content }
  </div>

  ${html_sns}

  <div class="post__comment">
    <aside class="comment js-comment">
      <div class="comment__inner">
        <h1 class="comment__title">COMMENT</h1>
        <p class="comment__description js-comment__description">最後まで目を通していただき、ありがとうございます。この記事はいかがでしたか？</p>
        <div class="comment__form-outer">
          <form id="commentform" class="comment__form js-form-comment" method="post">
            <textarea name="comment"></textarea>
            <div class="comment__info">
              <input class="comment__name" name="author" type="text" value="" placeholder="ニックネーム">
              <input class="comment__submit js-comment-submit" name="submit" type="submit" value="コメントする">
            </div>
            <input type="hidden" name="comment_post_ID" value="${post_data.id}">
            <input type="hidden" name="comment_parent" value="0" />
            <p class="comment__message js-comment-message"><strong>コメント送信できませんでした。恐れ入りますが、コメントが入力されていることをご確認の上、もう一度「コメント送信」を選択してください。</strong></p>
          </form>
        </div>

        <div class="comment__list">


        </div>
      </div>
    </aside>
  </div>
</main>
  `

  return html
}


          // <?php
          // $comments = get_comments('post_id='.get_the_id().'&status=approve&type=comment&orderby=comment_date&order=ASC');

          // function check_author($author_name, $author_email = '') {
          //   if ("" === $author_name) {
          //     $author_name = "(匿名)";
          //   }
          //   if ("simplesimplesdesign@gmail.com" === $author_email) {
          //     $author_name = "たけたけ";
          //   }
          //   return enc($author_name);
          // }

          // function view_comment($comments) {
          //   $t = '';
          //   if (count($comments) > 0) {
          //     foreach ( $comments as $comment ) {
          //       $t .= '<div class="comment__unit-outer" id="comment-'.$comment -> comment_ID.'">';
          //       $t .= '<div class="comment__unit">';
          //       $comment_text = $comment -> comment_content;
          //       $comment_text = preg_replace('/&lt;/', '＜', $comment_text);
          //       $comment_text = preg_replace('/&gt;/', '＞', $comment_text);
          //       $t .= replace_br(enc($comment_text));
          //       $t .= '<div class="comment__unit-info">';
          //       $t .= '<span class="comment__unit-name">';
          //       $t .= check_author($comment -> comment_author, $comment -> comment_author_email);
          //       $t .= '</span>';
          //       $t .= '<time class="comment__unit-time" datetime="'.date("Y-m-d\TH:i", strtotime($comment -> comment_date)).'">';
          //       $t .= date("Y年m月d日 H:i", strtotime($comment -> comment_date));
          //       $t .= '</time>';
          //       $t .= "</div>";
          //       $t .= "</div>";
          //       $t .= "</div>";
          //     }
          //   } else {
          //     $t .= '<p class="comment__none js-comment-none">この記事の最初のコメントを書いてくれると嬉しいです！</p>';
          //   }
          //   return $t;
          // }
          // echo view_comment($comments);