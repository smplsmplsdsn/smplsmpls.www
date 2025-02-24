/**
 * getパラメータを取得してオブジェクトで返却。
 *
 * @param {string} url_string
 * @return {object}
 */
cmn.getParam = (url_string) => {
  let str = url_string || location.href,
      param = [],
      obj = {},
      i

  str = (str.split('?').length > 1)? str.split('?')[1]: str
  param = str.split('&')

  for (i in param) {
    let p = param[i].split('=')

    if (p.length == 2 && "" != p[1].trim()) {
      obj[p[0]] = p[1]
    }
  }

  return obj
}