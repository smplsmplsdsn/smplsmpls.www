const htmlBlogList = (d) => {

  return `
<section class="blog-list-unit">
  <a class="blog-list-unit__link" href="${d.link}" data-id="${d.id}">
    <div class="blog-list-unit__inner">
      <figure class="blog-list-unit__figure">
        <span class="blog-list-unit__bg" style="background-image: url(${d.img});"></span>
      </figure>
      <div class="blog-list-unit__text">
        <h1 class="blog-list-unit__title">${d.title}</h1>
        <p class="blog-list-unit__description">${d.description}</p>
        <p class="blog-list-unit__category-and-date">
          <time class="blog-list-unit__date" datetime="${d.datetime}">${d.date}</time>
          <span class="blog-list-unit__category">${d.category_name}</span>
        </p>
      </div>
    </div>
  </a>
</section>
  `
}