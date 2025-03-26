/**
 * DBに保存時に、UTFコードの最初のバックスラッシュがないので、付与して文字変換する
 * e.g., u00e9e の場合、期待するのは、ée
 * &#x00e9e   // ée
 * &#x00e9e   // ພ
 */
cmn.replaceUTF = (str = '') => {
  return str.replace(/u([\da-fA-F]{4})/g, '&#x$1;')
}