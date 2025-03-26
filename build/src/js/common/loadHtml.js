cmn.loadHtml = async (url = '') => {

  // ガード
  if (url.trim() === '') {
    return {
      status: 'fail',
      message: 'ファイル名が指定されていません'
    }
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-CSRF-Token': CSRF_TOKEN
      }
    })

    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`)
    }

    const htmlData = await response.text()

    return htmlData
  } catch (error) {
    return ''
  }
}
