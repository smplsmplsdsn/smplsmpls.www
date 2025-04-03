/**
 * テキストのscriptを、scriptタグとして実行する
 *
 * @param {*} tgt e.g. .js-container
 * @returns
 */
cmn.setScriptFromText = (tgt) => {
  let scripts = document.querySelector(tgt).querySelectorAll('script')

  scripts.forEach(old_script => {
    let new_script = document.createElement('script')

    // 外部スクリプトか判別する
    if (old_script.src) {
      new_script.src = old_script.src
    } else {
      new_script.textContent = old_script.textContent
    }

    document.body.appendChild(new_script)
    old_script.remove()
  })
}