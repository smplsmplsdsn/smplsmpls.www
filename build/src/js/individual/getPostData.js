ssd.getPostData = async (post_id) => {
  let html = ''

  let post_data = ssd.post.find(item => item.id == post_id)

  if (!post_data) {
    post_data = await ssd.loadPost(post_id)

    // ガード
    if (!post_data?.content) {
      return 'TODO ネット切れてる場合'
    }

    ssd.post.push(post_data)
  }

  const image = (post_data?.image)? `<figure class="post__mainvisual" style="background-image: url(${post_data.image});"></figure>` : ``

  let update = post_data?.acf?.update || ``

  if (update) {
    let update_array = update.split('-')

    update = `(${update_array[0]}年${update_array[1]}月${update_array[2]}日更新)`
  }

  const page_url = encodeURIComponent(`https://simplesimples.com${post_data.link}`),
        page_title = encodeURIComponent(post_data.title),
        site_name = encodeURIComponent('【シンプルシンプルデザイン】')

  const html_sns_git = (post_data?.acf?.github)? `<li><a class="sns-github" href="${post_data.acf.github}" target="_blank"><span class="icon-github"></span></a></li>`: ``,
        link_sns_twitter = `https://x.com/share?url=${page_url}&text=${page_title}${site_name}`,
        link_sns_facebook = `https://www.facebook.com/sharer/sharer.php?u=${page_url}`,
        link_sns_line = `https://line.me/R/msg/text/?${site_name}${page_title} ${page_url}`

  const html_sns = `
<ul class="sns-list post__sns-list">
  ${html_sns_git}
  <li><a href="${link_sns_twitter}" target="_blank"><span class="icon-twitter"></span></a></li>
  <li><a href="${link_sns_facebook}" target="_blank"><span class="icon-facebook"></span></a></li>
  <li><a href="${link_sns_line}" target="_blank"><span class="icon-line"></span></a></li>
</ul>
  `

  const html_comment_first = (post_data.comments.length === 0)? '<p class="post-comment__none js-comment-none">この記事の最初のコメントを書いてくれると嬉しいです！</p>': ''

  let html_comments = ''

  for (const comment of post_data.comments) {
    let { author, content, date } = comment

    author = author.trim() || '(匿名)'
    content = content.replace(/</g, '＜').replace(/>/g, '＞')
    content = content.replace(/&lt;/g, '＜').replace(/&gt;/g, '＞')
    content = cmn.getNrToBr(content)

    html_comments += `
<div class="post-comment__unit">
  <div class="post-comment__unit-inner">
    ${content}
    <div class="post-comment__unit-info">
      <span class="post-comment__unit-name">${author}</span>
      <time class="post-comment__unit-time">${date}</time>
    </div>
  </div>
</div>
    `
  }

  html_comments = (post_data.comments.length === 0)? `` : `<div class="post-comment__list js-comment-list">${html_comments}</div>`

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

  <div class="post-content post__content js-post-content">
    ${post_data.content}
  </div>

  ${html_sns}

  <div class="post__comment">
    <aside class="post-comment js-comment">
      <div class="post-comment__inner js-comment-inner">
        <h1 class="post-comment__title">COMMENT</h1>
        <p class="post-comment__description js-post-comment__description">最後まで目を通していただき、ありがとうございます。この記事はいかがでしたか？</p>
        ${html_comment_first}
        <div class="post-comment__form-outer">
          <form id="commentform" class="post-comment__form js-form-comment" method="post" onsubmit="return false;">
            <textarea name="comment"></textarea>
            <p class="post-comment__message js-comment-notification"><strong>コメント送信できませんでした。恐れ入りますが、コメントが入力されていることをご確認の上、もう一度「コメント送信」を選択してください。</strong></p>
            <div class="post-comment__info">
              <input class="post-comment__name" name="author" type="text" value="" placeholder="ニックネーム">
              <button class="post-comment__submit js-comment-submit" type="button">コメントする</button>
            </div>
            <input type="hidden" name="comment_post_ID" value="${post_data.id}">
            <input type="hidden" name="comment_parent" value="0" />
          </form>
        </div>
        ${html_comments}
      </div>
    </aside>
  </div>
</main>
  `

  return html
}