ssd.setPostCategory = (category = '') => {
  const category_data = ssd.category.find(item => item.slug == category),
        post_category_list = ssd.list.filter(item => category_data.ids.includes(item.category_id))

  let html = ``,
      html_category = ''

  for (list of post_category_list) {
    html_category += ssd.setPostListsUnit(list, 'h2')
  }

  html += `
<div class="post-category">
  <hgroup class="post-category__hgroup">
    <h1>${category_data.name}</h1>
    <p>${category_data.name}に関する記事は、${post_category_list.length}件あります。<br>${category_data.description}</p>
  </hgroup>
  <div class="post-category__content">
    <div class="post-list post-list--category">
      ${html_category}
    </div>
  </div>
</div>
  `

  return html
}