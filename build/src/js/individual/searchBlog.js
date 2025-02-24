$(document).on('submit', '.js-form-blog-search', function () {
  const _input = $('input[name="q"]', this),
        val = _input.val().trim()

  html_list = ''

  if (val.trim().length > 1) {
    LOADING_PATHS = '/blog/?q=' + val

    changePage({
      paths: LOADING_PATHS,
      topickpath: `<strong>「${val}」の検索結果</strong>`,
      blog_search: val,
      html_list: html_list
    }, true)

    _input.val('')
  }

  return false
})