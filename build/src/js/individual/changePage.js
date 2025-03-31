ssd.changePage = async (obj = {}, is_history) => {
  const _article = $('.js-article'),
        _article_inner = $('.js-article-inner'),
        _loading = $('.js-loading')

  // コンテンツを非表示にする
  _article.css({
    'min-height': _article.height()
  })

  _article.animate({
    top: -10,
    opacity: 0
  }, 350, async function () {
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
        is_post = false


    switch (array_path[0]) {
      case '':
        title = ''
        description = ``
        response = await fetch(`/assets/include/pages/home.php`)
        html = await response.text()
        break

      case 'blog':
        title = `個人ブログは引っ越しました | ${title}`
        description = `個人ブログは別ドメインに引っ越ししました。ぜひ、引っ越し先をご覧ください。`
        response = await fetch(`/assets/include/pages/${array_path[0]}.php`)
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
        description = ``
        ogp_image = ``
        response = await fetch(`/assets/include/pages/${array_path[0]}.php`)
        html = await response.text()
        break

      case 'search':
        let search_word = cmn.getParam(location.search).q

        if (!search_word) {
          ssd.changePage()
          return
        }

        search_word = decodeURIComponent(search_word)

        title = `制作ブログ「${search_word}」の検索結果 | ${title}`

        let post_search_result_count = 10,
            post_search_result_text = (post_search_result_count > 0)? `${post_search_result_count}件見つかりました。` : '見つかりませんでした。'

        description = `制作ブログ内で「${search_word}」を含む記事は、${post_search_result_text}`
        ogp_image = ``
        html = (array_path[0])
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
          post_list = ssd.getPostListInfo(post_filename)

          if (post_list) {
            title = post_list.title
            description = post_list.description
            ogp_image = post_list.img
            html = await ssd.getPostData(post_list.id)

            if (html && html != '') {
              data = {
                id: post_list.id,
                html: html
              }
            } else {
              is_error = true
            }
          } else {
            is_error = true
          }
        } else {
          title = ''
          description = ``
          ogp_image = ``
          html = ssd.setPostCategory(array_path[array_path.length - 1])
        }
        break

      default:
        is_error = true
    }

    if (is_error) {
      title = `表示できませんでした | ${title}`
      description = ``
      response = await fetch(`/assets/include/pages/system.php`)
      html = await response.text()
    }

    $('title').html(title)
    $('meta[name="description"]').attr('content', description)
    $('meta[property="og:image"]').attr('content', ogp_image)
    $('link[rel="canonical"]').attr('href', canonical)

    $('body').attr('data-menu', 'hide').attr('data-page', array_path[0] || 'home')

    // コンテンツを表示する
    _loading.hide()
    _article_inner.html(html)

    _article.css({
      'min-height': 'unset'
    })

    $(window).scrollTop(0)

    _article.animate({
      top: 0,
      opacity: 1
    }, 350)

    // 投稿記事の場合
    if (is_post) {
      hljs.highlightAll()
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

    // スプラッシュ削除（TODO タイムラグの処理）
    if (!ssd.is_delete_splash) {
      ssd.is_delete_splash = true
      cmn.removeSplash()
    }
  })
}
