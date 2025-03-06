cmn.loadHtml = async (url, post_data = {}) => {

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/html'
      },
      body: JSON.stringify(post_data)
    })

    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`)
    }

    return await response.text()
  } catch (error) {
    console.error("HTMLの取得に失敗:", error, url)
    return null   // エラー時は null を返す
  }
}