cmn.loadJson = async (filename = '') => {

  // ガード
  if (filename.trim() === '') {
    return {
      status: 'fail',
      message: 'ファイル名が指定されていません'
    }
  }

  try {
    const response = await fetch('/api/index.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF_TOKEN
      },
      body: JSON.stringify({
        filename: filename
      }),
    })

    if (!response.ok) {
      return {
        status: 'fail',
        message: `HTTPエラー: ${response.status}`
      }
    }

    return await response.json()
  } catch (error) {
    return {
      status: 'fail',
      message: error.message || '不明なエラーが発生しました'
    }
  }
}
