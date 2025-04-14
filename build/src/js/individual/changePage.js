ssd.changePage = async (obj = {}, is_history) => {
  const _article_inner = $('.js-article-inner'),
        _loading = $('.js-loading')

  // コンテンツを非表示にする
  _article_inner.animate({
    top: -10,
    opacity: 0
  }, 350, async function () {
    $(window).scrollTop(0)
    _loading.show()

    if (!obj.path) {
      obj.path = '404'
    }

    const canonical = `https://simplesimples.com${obj.path}`,
          array_path = obj.path.replace(/^\/|\/$/g, '').split('/'),
          history_obj = {}

    let title = 'シンプルシンプルデザイン',
        description = ``,
        ogp_image = ``    // TODO デフォルト画像

    let data,
        response,
        html = ''

    let is_error = false,
        is_post = false,
        is_contact = false,
        is_home = false


    switch (array_path[0]) {
      case '':
        is_home = true
        title = ''
        description = ``
        response = await fetch(`/assets/include/pages/home.php`)
        html = await response.text()
        break

      case 'blog':
      case 'moviereview':
        title = `個人ブログは引越ししました | ${title}`
        description = `個人ブログは別ドメインに引っ越ししました。ぜひ、引っ越し先をご覧ください。`
        response = await fetch(`/assets/include/pages/move.php`)
        html = await response.text()
        break

      case 'service':
        title = `サービス | ${title}`
        description = ``
        response = await fetch(`/assets/include/pages/${array_path[0]}.php`)
        html = await response.text()
        break

      case 'about':
        title = `事業内容 | ${title}`
        description = ``
        response = await fetch(`/assets/include/pages/${array_path[0]}.php`)
        html = await response.text()
        break

      case 'contact':
        is_contact = true
        title = `お問い合わせ | ${title}`
        description = ``
        response = await fetch(`/assets/include/pages/${array_path[0]}.php`)
        html = await response.text()
        break

      case 'privacy':
        title = `プライバシーポリシー | ${title}`
        description = ``
        response = await fetch(`/assets/include/pages/${array_path[0]}.php`)
        html = await response.text()
        break

      case 'post':
        title = `制作ブログ | ${title}`
        description = `Web制作や映像制作を主軸とした備忘録です。`
        ogp_image = `/assets/images/post-bg-searchbox.png`
        response = await fetch(`/assets/include/pages/${array_path[0]}.php`)
        html = await response.text()
        break

      case 'search':
        let search_word = cmn.getParam(location.search).q

        if (search_word) {
          search_word = decodeURIComponent(search_word)

          response = await ssd.loadPostSearch(search_word)

          const post_search_result_count = response.count || 0,
                post_search_result_text = (post_search_result_count > 0)? `${post_search_result_count}件見つかりました。` : '見つかりませんでした。'

          search_word = cmn.htmlEscape(search_word)
          title = `「${search_word}」の検索結果 | 制作ブログ | ${title}`
          description = `制作ブログ内で「${search_word}」を含む記事は、${post_search_result_text}`
          ogp_image = `/assets/images/post-bg-searchbox.png`

          html = ssd.setPostListSearch(response.ids || [], description)
          html = ssd.htmlSeachForm(search_word) + html
        } else {
          is_error = true
        }
        break

      case 'web':
      case 'video':
      case 'overview':
        let post_filename = ''

        // 投稿記事の場合は、ファイル名をセットする
        if (array_path[0] === 'web' && array_path[3]) {
          post_filename = array_path[3]
        } else if (array_path[0] != 'web' && array_path[2]) {
          post_filename = array_path[2]
        }

        // 投稿記事かカテゴリか判別する
        if (post_filename) {
          is_post = true
          post_filename = decodeURIComponent(post_filename)

          const post_data = ssd.getPostData(post_filename)

          if (post_data) {
            title = `${post_data.title} | ${title}`
            description = post_data.description
            ogp_image = post_data.img
            html = await ssd.getPostHtml(post_data.id)

            if (html && html != '') {
              data = {
                id: post_data.id,
                html: html
              }
            } else {
              is_error = true
            }
          } else {
            is_error = true
          }
        } else {
          title = ` | ${title}`
          description = ``
          ogp_image = ``
          html = ssd.setPostCategory(array_path[array_path.length - 1])
        }

        html = ssd.htmlSeachForm() + html
        break

      default:
        is_error = true
    }

    if (ssd.loading_page != obj.path) {
      console.error('Diff Page', ssd.loading_page, obj.path)
      return false
    }

    if (is_error) {
      title = `表示できませんでした | ${title}`
      description = ``
      response = await fetch(`/assets/include/pages/system.php`)
      html = await response.text()
    }

    // head情報を更新する
    $('title').html(title)
    $('meta[name="description"]').attr('content', description)
    $('meta[property="og:image"]').attr('content', ogp_image)
    $('link[rel="canonical"]').attr('href', canonical)

    // コンテンツをセットする
    $('body').attr('data-menu', 'hide').attr('data-page', array_path[0] || 'home')
    _loading.hide()
    _article_inner.html(html)

    _article_inner.animate({
      top: 0,
      opacity: 1
    }, 350)

    switch (true) {
      case is_post:
        hljs.highlightAll()
        ssd.setPostLink()
        cmn.setScriptFromText('.js-post-content')
        break
      case is_home:
        ssd.setBusinessquotes()
        break
      case is_contact:
        cmn.loadFormData('.js-form-contact')
        break

      // default なし
    }

    // ヒストリー追加
    if (is_history && obj.path != ssd.last_history) {
      ssd.last_history = obj.path

      history_obj.path = obj.path

      if (data) {
        history_obj.data = data
      }

      cmn.historyPushState(history_obj, '', obj.path)
    }

    // スプラッシュ削除
    if (!ssd.is_delete_splash) {
      ssd.is_delete_splash = true
      cmn.removeSplash()
    }
  })
}
