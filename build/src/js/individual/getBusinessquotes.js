/**
 * 1日1回 名言を取得する（今回は使用なし）
 */
const getBusinessquotes = async () => {
  const ls_businessquotes = cmn.storageLS('businessquotes')

  const today = new Date(),
        yyyy = today.getFullYear(),
        mm = String(today.getMonth() + 1).padStart(2, '0'),
        dd = String(today.getDate()).padStart(2, '0'),
        formattedDate = (+`${yyyy}${mm}${dd}`)

  let is_valid_storage = false,
      businessquotes = {}
      id = 0

  // ローカルストレージに名言オブジェクトがある場合、idを取得する
  if (ls_businessquotes && ls_businessquotes.date) {
    if (formattedDate === ls_businessquotes.date) {
      is_valid_storage = true
    } else {
      id = ls_businessquotes.id
    }
  }

  // 名言を取得する
  if (is_valid_storage) {
    businessquotes = ls_businessquotes
  } else {
    businessquotes = await cmn.loadJson('/assets/ajax/parts/businessquotes2.php?id=' + id)

    // ガード
    if (!businessquotes) {
      return ''
    }

    // ローカルストレージに保存する
    businessquotes.date = formattedDate;
    cmn.storageLS('businessquotes', businessquotes)
  }

  if (businessquotes.word_business != '') {
    businessquotes.word_business = `(${businessquotes.word_business})`
  }

  let html_businessquotes = `
<p class="businessquotes__word">${businessquotes.title}</p>
<p class="businessquotes__name">${businessquotes.word_name}${businessquotes.word_business}</p>
  `

  return html_businessquotes
}
