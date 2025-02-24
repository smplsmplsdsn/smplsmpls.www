$(() => {
  const _header_nav = $('.js-header-nav'),
        _header_nav_link = $('a', _header_nav)

  _header_nav_link
  .on('mouseenter', () => {
    _header_nav.addClass('over')
  })
  .on('mouseleave', () => {
    _header_nav.removeClass('over')
  })
})