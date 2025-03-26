cmn.replaceTag = (str = '') => {
  return str.replace(/<[^>]*>/g, "")
}