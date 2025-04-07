cmn.htmlEntityDecode = str => {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = str
  return textarea.value
}