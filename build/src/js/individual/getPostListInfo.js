/*
 * ファイル名から post_id を取得する
 */
ssd.getPostListInfo = (post_filename = '') => {
  const result = ssd.list.find(item => decodeURIComponent(item.slug.replace(/^"|"$/g, '')) === post_filename)

  return result || null
}