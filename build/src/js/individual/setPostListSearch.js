ssd.setPostListSearch = (ids, description) => {
  let list_result,
      html_list = ``

  if (ids.length > 0) {
    list_result = ids.split(',').map(item => Number(item))
    list_result = ssd.list.filter(item => list_result.includes(item.id))

    for (list of list_result) {
      html_list += ssd.setPostListsUnit(list, 'h2')
    }
  }

  return `
<div class="search">
  <h1 class="search__title">${description}</h1>
  <div class="post-list post-list--search">
  ${html_list}
  </div>
</div>
  `
}