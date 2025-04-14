ssd.setPostLists15 = () => {
  let html_recently = '',
      html_popular = '',
      html_comment = ''

  for (let i = 0; i < 15; i++) {
    html_recently += ssd.setPostListsUnit(ssd.list[i], 'h4')
  }

  for (list of ssd.list_popular) {
    html_popular += ssd.setPostListsUnit(list, 'h4')
  }

  for (list of ssd.list_comment) {
    html_comment += ssd.setPostListsUnit(list, 'h4')
  }

  $('.js-post-recenlty-lists').html(html_recently)
  $('.js-post-popular-lists').html(html_popular)
  $('.js-post-comment-lists').html(html_comment)

  cmn.loadImg($('.js-post-recenlty-lists'))
  cmn.loadImg($('.js-post-popular-lists'))
  cmn.loadImg($('.js-post-comment-lists'))

  scroll.show('.js-scroll-post-recenlty')
  scroll.show('.js-scroll-post-popular')
  scroll.show('.js-scroll-post-comment')
}