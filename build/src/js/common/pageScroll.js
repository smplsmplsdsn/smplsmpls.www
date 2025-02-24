/**
 * ページ内をスクロール移動する
 *
 * @param {number} pos 移動先のページ位置。デフォルトはiOSにケアして、最上部は 0 ではなく 1とする
 * @param {number} speed スクロール速度
 * @param {NULL|function} func スクロール移動後に処理する場合は指定する
 */
cmn.pageScroll = (pos = 1, speed = 300, func) => {
  $('html, body').stop()

  $('html').animate({
    scrollTop: pos
  }, speed)

  $('body').animate({
    scrollTop: pos
  }, speed, function () {
      if (func) func();
  })

  return false
}
