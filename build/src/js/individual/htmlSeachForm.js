ssd.htmlSeachForm = (search_word = '') => {
  return `
<form class="form-search js-form-search" action="/search/" method="get">
  <input type="text" name="q" value="${search_word}" placeholder="制作ブログ内を検索">
</form>
  `
}