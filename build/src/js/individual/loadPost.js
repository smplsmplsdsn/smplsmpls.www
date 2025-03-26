ssd.loadPost = async (post_id = '') => {

  // ガード
  if (post_id === '') {
    return {
      status: 'fail',
      message: '投稿IDが指定されていません'
    }
  }

  try {
    const response = await fetch(`/api/post.php?post_id=${post_id}`, {
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
