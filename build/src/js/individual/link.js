$(() => {
  $(document).on('click', 'a', function () {
    const _this = $(this),
          href = _this.attr('href'),
          blog_id = _this.attr('data-id') || null,
          blog_category_id = _this.attr('data-category') || null

    // TODO リンク先にsimplesimples
    if (href && typeof changePage === 'function' && (
      href.startsWith("/") ||
      href.startsWith("http://simplesimples") ||
      href.startsWith("https://simplesimples")
    )) {
      paths = (href.startsWith("/"))? href: new URL(href).pathname

      LOADING_PATHS = paths

      changePage({
        paths: paths,
        blog_id: blog_id || 0,
        blog_category_id: blog_category_id || 0
      }, true)

      return false
    }
  })
})
