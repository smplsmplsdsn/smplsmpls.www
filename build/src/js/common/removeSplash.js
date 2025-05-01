const CURRENT_TIME = new Date().getTime()

cmn.removeSplash = () => {
  const diff =  1500 - Math.min(new Date().getTime() - CURRENT_TIME, 1500)

  setTimeout(() => {
    $('.js-splash').fadeOut(() => {
      $('.js-splash').remove()
    })
  }, diff)
}

