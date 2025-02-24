cmn.saveFormData = (formSelector) => {
  const form = document.querySelector(formSelector)

  if (!form) return

  const formData = new FormData(form)
  const data = {}

  formData.forEach((value, key) => {
    data[key] = value
  })

  sessionStorage.setItem(formSelector, JSON.stringify(data))
}

cmn.loadFormData = (formSelector) => {
  const form = document.querySelector(formSelector)
  if (!form) return

  const storedData = sessionStorage.getItem(formSelector)
  if (!storedData) return

  const data = JSON.parse(storedData)

  Object.keys(data).forEach((key) => {
    const input = form.querySelector(`[name="${key}"]`)

    if (!input) return

    if (input.type === 'checkbox' || input.type === 'radio') {
      // チェックボックス・ラジオボタンの場合
      const elements = form.querySelectorAll(`[name="${key}"]`)
      elements.forEach((el) => {
        el.checked = el.value === data[key]
      })
    } else if (input.tagName === 'SELECT') {
      // セレクトボックスの場合
      if (Array.isArray(data[key])) {
        Array.from(input.options).forEach((option) => {
          option.selected = data[key].includes(option.value)
        })
      } else {
        input.value = data[key]
      }
    } else {
      // テキスト・テキストエリア・その他のinput
      input.value = data[key]
    }
  })
}
