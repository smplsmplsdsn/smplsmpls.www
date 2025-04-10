ssd.setBusinessquotes = (is_next) => {
  const _businessquotes = $('.js-businessquotes')

  let d = {}

  if (is_next) {
    ssd.businessquotes.num = ssd.businessquotes.num + 1

    if (ssd.businessquotes.num === ssd.businessquotes.data.length) {
      ssd.businessquotes.num = 0
    }
  }

  d = ssd.businessquotes.data[ssd.businessquotes.num]

  _businessquotes.css({
    opacity: 0
  })

  $('.js-businessquotes-title').html(d.title)
  $('.js-businessquotes-name').html(d.acf.word_name)

  if (d.acf.word_business === '') {
    $('.js-businessquotes-business').html('').hide()
  } else {
    $('.js-businessquotes-business').html(d.acf.word_business).show()
  }

  _businessquotes.animate({
    opacity: 1
  }, 650)
}