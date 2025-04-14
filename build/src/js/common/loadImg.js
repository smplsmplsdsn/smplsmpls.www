/**
 * img data-src値 を 読み込み成功時のみ、src属性に変更する
 * background-image  * data-bg値 を 読み込み成功時のみ、style属性に変更する
 */
cmn.loadImg = (tgt) => {
  $('img, .js-lazybg', tgt).each(function () {
    const _this = $(this),
          src = _this.attr('data-src'),
          bg = _this.attr('data-bg')

    let temp_img

    if (typeof src === 'string' && src !== '') {
      temp_img = new Image()
      temp_img.onload = () => {
        _this.attr('src', src).removeAttr('data-src')
      }
      temp_img.src = src
    }

    if (typeof bg === 'string' && bg !== '') {
      temp_img = new Image()
      temp_img.onload = () => {
        _this.attr('style', `background-image:url(${bg});`).removeAttr('data-bg')
      }
      temp_img.src = bg
    }
  })
}
