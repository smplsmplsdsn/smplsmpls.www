$(() => {
  const _menu = $('.js-menu')

  $('.js-menu-link').on('click', () => {
    if (_menu.hasClass('show') || _menu.hasClass('hide')) {
      $('.js-menu').toggleClass('show').toggleClass('hide')
    }

    return false
  })
})