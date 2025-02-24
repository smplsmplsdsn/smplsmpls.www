const changePage = (data = {}, is_history_push) => {
  const paths = data.paths || '/'

  const _body = $('body'),
        _contents = $('.js-contents')
        _contents_inner = $('.js-contents-inner'),
        _contents_blog = $('.js-contents-blog'),
        _contents_blog_header_inner = $('.js-contents-blog-header-inner')

  let is_blog_detail = false

  INIT_PAGE.paths = cmn.getDir(paths)

  switch (INIT_PAGE.paths.level1) {
    case 'home':
    case 'blog':
    case 'service':
    case 'about':
    case 'contact':
    case 'privacy':
      INIT_PAGE.page = INIT_PAGE.paths.level1
      break
    case 'web':
    case 'video':
    case 'overview':
      is_blog_detail = true
      INIT_PAGE.page = 'blog'
      break
    default:
      INIT_PAGE.page = '404'
  }

  // コンテンツを非表示にする
  _contents_blog_header_inner.animate({
    top: -10,
    opacity: 0
  })
  _contents.animate({
    top: -10,
    opacity: 0
  }, 350, async function () {

    // ローディングを表示する
    _body.addClass('loading')
    $('html, body').scrollTop(1)
    _contents_blog.hide()

    // head情報の初期化
    data.title_head = ''
    data.description = ''
    data.image_ogp = ''

    // すでに表示済みの画面か判別する
    const check_page = PAGES.find(obj => obj.paths === paths.replace(/\/$/, ''))

    // コンテンツを取得する
    if (check_page && check_page.data && check_page.data.html) {
      data.html = check_page.data.html
    } else {

      // NOTICE: 変数 data を最新に更新する
      if (is_blog_detail) {

        // 記事かカテゴリーか不明の場合、パス情報から取得する
        if (!data.blog_id && !data.blog_category_id) {
          const date_type = await cmn.loadJson('/assets/ajax/blog-type.php?paths=' + paths.replace(/^\/|\/$/g, ''));

          if (date_type.type === 'post') {
            data.blog_id = date_type.id
          } else {
            data.blog_category_id = date_type.id
          }
        }

        if (data.blog_id && (+data.blog_id) > 0) {
          data = await cmn.loadJson('/assets/ajax/blog-detail.php?blog_id=' + data.blog_id)
          data.html = await cmn.loadHtml('/assets/ajax/blog.php', data)
        } else if (data.blog_category_id && (+data.blog_category_id) > 0) {
          const filtered = BLOG_POSTS.filter(item => item.category_ids.some(id => id == data.blog_category_id))


          let html_list = ''

          if (filtered.length > 0) {

            for (const d of filtered) {
              html_list += htmlBlogList(d)
            }

            // カテゴリ情報をセットする TODO
            data.type = 'list'
            data.html_list = html_list
            data.count = filtered.length
            data.topicpath = ''
            data.title_head = ''
            data.description = ''
            data.image_ogp = ''

            data.html = await cmn.loadHtml('/assets/ajax/blog.php', data)
          } else {

            // 0件ヒット TODO
            html_list = 'error'

            data.blog_category_id = ''
            data.description = ''
            data.image_ogp = ''
            data.title_head = ''
          }
        }
      } else if (data.blog_search) {
        data.paths = paths.replace(/^\/|\/$/g, '')
        data.q = data.blog_search
        data.html = await cmn.loadHtml('/assets/ajax/blog.php', data)

        // TODO
        data.title_head = '制作ブログ「' + data.blog_search + '」の検索結果 - シンプルシンプルデザイン'
        data.description = ''
        data.image_ogp = ''
      } else {
        data.html = await cmn.loadHtml('/assets/ajax/' + INIT_PAGE.page + '.php?paths=' + paths.replace(/^\/|\/$/g, ''))

        if (data.html) {

          // TODO 文言
          switch (INIT_PAGE.page) {
            case 'home':
              data.title_head = 'Webアプリ制作・映像撮影編集ならシンプルシンプルデザイン'
              data.description = '個人向け、小規模企業、新事業向けのWeb制作や映像撮影、編集をしています。'
              data.image_ogp = ''
              break
            case 'blog':
              data.title_head = '制作ブログ'
              data.description = 'Web制作や映像制作の備忘録。'
              data.image_ogp = ''
              break
            case 'service':

              if (INIT_PAGE.paths.level2) {
                switch (INIT_PAGE.paths.level2) {
                  case 'service1':
                    data.title_head = 'サービス1'
                    data.description = ''
                    data.image_ogp = ''
                    break;
                  case 'service2':
                    data.title_head = 'サービス2'
                    data.description = ''
                    data.image_ogp = ''
                    break;
                  case 'service3':
                    data.title_head = 'サービス3'
                    data.description = ''
                    data.image_ogp = ''
                    break;

                  //  default なし
                }
              } else {
                data.title_head = 'サービス'
                data.description = ''
                data.image_ogp = ''
              }

              break
            case 'about':
              data.title_head = '事業について'
              data.description = '事業理念、事業概要、代表プロフィールを紹介します。'
              data.image_ogp = ''
              break
            case 'contact':
              data.title_head = 'お問い合わせ'
              data.description = ''
              data.image_ogp = ''
              break
            case 'privacy':
              data.title_head = 'プライバシーポリシー'
              data.description = ''
              data.image_ogp = ''
              break
            case 'web':
              data.title_head = '制作ブログ「Web制作」'
              data.description = ''
              data.image_ogp = ''
              break
            case 'video':
              data.title_head = '制作ブログ「映像制作」'
              data.description = ''
              data.image_ogp = ''
              break
            case 'overview':
              data.title_head = '制作ブログ「運用情報」'
              data.description = ''
              data.image_ogp = ''
              break

            // default なし
          }

          if (INIT_PAGE.page != 'home') {
            data.title_head = data.title_head + ' - シンプルシンプルデザイン'
          }
        } else {
          data = null
        }
      }

      if (data) {
        PAGES.push({
          paths: paths.replace(/\/$/, ''),
          data: data
        })
      } else {
        data.title_head = 'ページが見つかりませんでした'
        data.description = 'ページが見つかりませんでした'
        data.html = 'TODO ERROR'
      }
    }

    // 読み込みタイムラグへの配慮
    if (LOADING_PATHS !== paths) {
      return
    }

    // History に追加する
    if (is_history_push) {
      cmn.historyPushState({
        paths: paths,
        data: data
      }, '', paths)
    }

    // コンテンツを入れ替える（scriptの処理は扱い要注意。この方法は、data.htmlが信頼できることが大前提）
    _contents_inner.html(data.html)
    _contents_inner.filter('script').each(function() {
      $.globalEval(this.text)
    })

    if (INIT_PAGE.paths.level1 === 'home') {

      if (BUSINESS_QUOTES && BUSINESS_QUOTES.length > 0) {
        let businessquotes = BUSINESS_QUOTES[BUSINESS_QUOTES_NUM]

        if (businessquotes.word_business != '') {
          businessquotes.word_business = `<span>（${businessquotes.word_business}）</span>`
        }

        $('.js-businessquotes').css({
          fontSize: getFontSizeOnMainvisual(businessquotes.title, 1.2),
          lineHeight: 1.2
        }).html(`
          <p class="businessquotes__word"><span>${businessquotes.title}</span></p>
          <p class="businessquotes__name"><span>${businessquotes.word_name}${businessquotes.word_business}</span></p>
        `)

        BUSINESS_QUOTES_NUM = BUSINESS_QUOTES_NUM + 1
        if (BUSINESS_QUOTES.length === BUSINESS_QUOTES_NUM) {
          BUSINESS_QUOTES_NUM = 0
        }
      }
    }

    if (INIT_PAGE.paths.level1 === 'contact') {
      cmn.loadFormData('.js-form-contact')
    }

    if (INIT_PAGE.page === 'blog') {
      _contents_blog.show()
      scroll.show('.js-blog-list-1')
      scroll.show('.js-blog-list-2')
      scroll.show('.js-blog-list-3')
    } else {
      _contents_blog.hide()
    }

    // ローディングを非表示にする
    _body.removeClass('loading')

    // ページ先頭へ移動する
    $('html, body').scrollTop(1)

    // メニューやモーダルを非表示にする
    $('.js-menu, .js-modal').removeClass('show').addClass('hide')

    // コンテンツを表示する
    _contents_blog_header_inner.animate({
      top: 0,
      opacity: 1
    }, 350)

    _contents.animate({
      top: 0,
      opacity: 1
    }, 350)

    // headtタグ内を調整する
    $('title').text(data.title_head)
    $('meta[name="description"]').attr('content', data.description)
    $('link[rel="canonical"]').attr('href', 'https://simplesimples.com' + paths)
    $('#og-image').attr('content', data.image_ogp)
  })
}
