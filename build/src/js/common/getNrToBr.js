/**
 * 改行コードを<br>に変換する
 *
 * @param {string} str*
 * @return {string} 変換後のstr
 */
cmn.getNrToBr = (str = '') => {
  str = str.replace(/\r\n/g, '<br>')
  str = str.replace(/\r/g, '<br>')
  str = str.replace(/\n/g, '<br>')
  return str
};
