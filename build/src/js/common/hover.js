$(document).on('mouseenter', 'a, button', function () {
  $(this).addClass('hover')
})

$(document).on('mouseleave', 'a, button', function () {
  $(this).removeClass('hover')
})
