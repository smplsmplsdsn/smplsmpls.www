/*
 *  History API
 */
const IS_HISTORY_API = (history && history.pushState && history.state !== undefined)

let IS_HISTORY_PUSH = false

/**
 * 疑似ページ遷移させるときの処理
 * https://developer.mozilla.org/ja/docs/Web/API/History/pushState
 *
 * @param (anything) state シリアライズ可能なあらゆるもの
 * @param (string) title
 * @param (string) url 指定がない場合は現在のURL
 */
cmn.historyPushState = (state, title, url) => {
  if (IS_HISTORY_API) {
    history.pushState(state, title, url)
    IS_HISTORY_PUSH = true
  }
}

/**
 * historyPushState で指定した、state の値を取得する
 *
 * @param {function} func ブラウザの前へ次へをクリックした際の処理
 */
cmn.historySet = (func) => {
  if (IS_HISTORY_API) {
    $(window).on('popstate', function (event) {
      // originalEvent と state の確認
      const state = event.originalEvent?.state || null

      if (func) {
        func(state)
      }
    })
  }
}
