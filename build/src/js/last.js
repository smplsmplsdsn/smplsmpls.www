$(() => {
  const path = location.pathname

  ssd.changePage({
    path: path
  })

  cmn.historySet((obj) => {
    ssd.changePage(obj)
  })

  $('.js-link').on('click', function () {
    const href = $(this).attr('href')

    ssd.changePage({
      path: href
    }, true)

    return false
  })

  /*
  const url = new URL(location.href),
        paths = url.pathname + url.search

  const params = cmn.getParam(location.href)

  LOADING_PATHS = paths



  // お問い合わせセッションを空にする
  cmn.storageDelSS('.js-form-contact')

  // 名言を取得してから、コンテンツをセットする
  const init_load = async () => {
    BUSINESS_QUOTES_ORIGINAL = await cmn.loadJson('/assets/ajax/parts/businessquotes.php')

    if (BUSINESS_QUOTES_ORIGINAL) {
      BUSINESS_QUOTES = structuredClone(BUSINESS_QUOTES_ORIGINAL)
      BUSINESS_QUOTES = cmn.shuffleArray(BUSINESS_QUOTES)
    }

    BLOG_POSTS = await cmn.loadJson('/assets/js/blog-list-all.json')

    if (!BLOG_POSTS) {
      console.error('JSONファイルないよ: データのあるドメイン/api2/?class=blog-list&filename=create にアクセス')
      return
    }

    CATEGORIES = await cmn.loadJson('/assets/js/category.json')

    if (!CATEGORIES) {
      console.error('JSONファイルないよ: データのあるドメイン/api2/?class=category&filename=create にアクセス')
    }

    await changePage({
      paths: LOADING_PATHS,
      blog_search: params.q || null
    })

    const _menu = $('.js-menu')

    if (!_menu.hasClass('show')) {
      _menu.addClass('hide')
    }
  }
  init_load()
  */
})
