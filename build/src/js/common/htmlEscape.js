cmn.htmlEscape = (str = '') => {
  const div = document.createElement('div')

  div.textContent = str

  return div.innerHTML
}