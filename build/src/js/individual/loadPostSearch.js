ssd.loadPostSearch = async (search_word = '') => {

  // ガード
  if (search_word === '') {
    return {
      status: 'fail',
      message: '検索ワードが指定されていません'
    }
  }

  try {
    const response = await fetch(`/api/post-search.php?search_word=${search_word}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF_TOKEN
      },
    })

    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    return {
      status: 'fail',
      message: error.message || '不明なエラーが発生しました'
    }
  }
}