$(() => {
  const path = location.pathname

  cmn.historySet((obj) => {
    ssd.changePage(obj)
  })

  // ブログデータを取得する
  Promise.all([
    cmn.loadJson('businessquotes.json'),
    cmn.loadJson('list-comment.json'),
    cmn.loadJson('list-popular.json'),
    cmn.loadJson('list.json'),
    cmn.loadJson('category.json'),
    cmn.loadHtml('/assets/include/post-nav.html')
  ])
  .then(results => {

    // 名言データ
    ssd.businessquotes = {}
    ssd.businessquotes.data = results[0]
    ssd.businessquotes.data = cmn.shuffleArray(ssd.businessquotes.data)

    // 最近コメントありの投稿リスト、人気投稿リスト
    ssd.list_comment = results[1]
    ssd.list_popular = results[2]

    // 投稿リスト
    ssd.list = results[3]

    // カテゴリデータ
    ssd.category = {}
    ssd.category.data = results[4]
    ssd.category.html = results[5]

    ssd.changePage({
      path: path
    })

    // スプラッシュ削除
    cmn.removeSplash()
  })
  .catch(error => {
    ssd.changePage({
      path: '/system/'
    })

    // スプラッシュ削除
    cmn.removeSplash()
  })
})


$(document).on('click', '.js-link', function () {
  const href = $(this).attr('href')

  ssd.changePage({
    path: href
  }, true)

  return false
})