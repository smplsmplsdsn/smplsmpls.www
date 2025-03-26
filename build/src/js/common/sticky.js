/**
 * CSS STICKY を使用して、stickyが上部固定した場合と上部固定解除した場合に処理を実行するメソッド
 *
 * @param {string} name*
 * @param {function} func_able* : 上部固定時に処理する関数
 * @param {function} func_disable* : 上部固定が解除した時に処理する関数
 * @returns
 */
cmn.sticky = (name = '', func_able, func_disable) => {
  const sticky_element = document.querySelector(name)

  if (name.trim() === '' || !sticky_element || typeof func_able != 'function' || typeof func_disable != 'function') {
    return false
  }

  let last_osffset = sticky_element.getBoundingClientRect().top,
      is_sticky = false

  window.addEventListener('scroll', () => {
    const current_offset = sticky_element.getBoundingClientRect().top

    if (current_offset === last_osffset && !is_sticky) {
      func_able()
    } else if (current_offset != last_osffset && is_sticky) {
      func_disable()
    }

    last_osffset = current_offset
  })
}