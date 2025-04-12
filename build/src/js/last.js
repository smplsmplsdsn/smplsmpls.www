$(() => {

  const path = location.pathname

  cmn.historySet((obj) => {

    if (obj) {
      ssd.changePage(obj)
    } else {
      ssd.changePage({
        path: path
      })
    }
  })

  // ブログデータを取得する
  Promise.all([
    cmn.loadJson('businessquotes.json'),
    cmn.loadJson('list.json'),
    cmn.loadJson('list-popular.json'),
    cmn.loadJson('list-comment.json'),
    cmn.loadJson('category.json'),
    cmn.loadHtml('/assets/include/post-nav.html')
  ])
  .then(results => {

    // 名言データ
    ssd.businessquotes = {}
    ssd.businessquotes.data = results[0]
    ssd.businessquotes.data = cmn.shuffleArray(ssd.businessquotes.data)
    ssd.businessquotes.num = 0
    ssd.businessquotes.is_init = false

    // 投稿リスト
    ssd.list = results[1]

    // 人気投稿リスト
    const popular_ids = results[2]?.ids.split(',').map(id => Number(id)) || []
    ssd.list_popular = popular_ids
      .map(id => ssd.list.find(item => item.id === id))
      .filter(item => item !== undefined)

    // 最近コメントありの投稿リスト
    const comment_ids = results[3]?.ids.split(',').map(id => Number(id)) || []
    ssd.list_comment = comment_ids
      .map(id => ssd.list.find(item => item.id === id))
      .filter(item => item !== undefined)

    // カテゴリデータ
    ssd.category = results[4]

    // 画面セット
    ssd.changePage({
      path: path
    })

    // 投稿カテゴリをセット
    $('.js-post-nav').html(results[5])

    // 投稿15記事セット
    ssd.setPostLists15()
  })
  .catch(error => {

    console.error('Ohh, somthing happens...', error)

    ssd.changePage({
      path: '/system/'
    })

    // スプラッシュ削除
    cmn.removeSplash()
  })
})

// メニュー切り替え
$(() => {
  const _body = $('body')

  $('.js-menu-link').on('click', () => {
    const status = _body.attr('data-menu'),
          after_status = (status === 'show')? 'hide' : 'show'

    console.log(status)

    _body.attr('data-menu', after_status)
    return false
  })
})

// 画面切り替え
$(document).on('click', '.js-link', function () {
  const href = $(this).attr('href')

  ssd.changePage({
    path: href
  }, true)

  return false
})

// 名言切り替え
$(document).on('click', '.js-link-businessquotes', () => {
  ssd.setBusinessquotes(true)
  return false
})