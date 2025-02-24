const getFontSizeOnMainvisual = (str = '', lineheight = 1) => {
  const w = Math.floor(window.innerWidth * 0.5),
        h = Math.floor(window.innerHeight * 0.5)

  // Math.floor(h / fontsize * lineheight) * Math.floor(w / fontsize) = str.length

  let fontsize = Math.floor(Math.sqrt((h * w) / (str.length * lineheight)))

  return Math.min(fontsize, 60)
}