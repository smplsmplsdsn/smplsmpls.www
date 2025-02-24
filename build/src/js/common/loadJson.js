cmn.loadJson = async (url) => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`)
    }

    return await response.json() // JSONを返却
  } catch (error) {
    console.error("JSONの取得に失敗:", error)
    return null // エラー時は null を返す
  }
}

