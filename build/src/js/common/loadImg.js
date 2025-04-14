/**
 * data-src値 を 読み込み成功時のみ、src属性に変更する
 */
cmn.loadImg = (tgt) => {
  $('img', tgt).each(function () {
    const _this = $(this),
          src = _this.attr('data-src')

    const temp_img = new Image()

    temp_img.onload = () => {
      _this.attr('src', src).removeAttr('data-src')
    }
    temp_img.src = src
  })
}