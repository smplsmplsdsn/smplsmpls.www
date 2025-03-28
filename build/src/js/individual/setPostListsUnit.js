ssd.setPostListsUnit = (list, headline_tag = 'h2') => {
  html = `
<article class="post-list-unit">
  <a class="js-link post-list-unit__link" href="${list.link}" data-postid="${list.id}">
    <figure class="post-list-unit__figure" style="background-image:url(${list.img})"></figure>
    <div class="post-list-unit__content">
      <${headline_tag} class="post-list-unit__title">${list.title}</${headline_tag}>
      <p class="post-list-unit__description">${list.description}</p>
      <p class="post-list-unit__time-and-category">
        <time class="post-list-unit__time">${list.date}</time>
        <span class="post-list-unit__category">${list.category_name}</span>
      </p>
    </div>
  </a>
</article>
  `
  return html
}