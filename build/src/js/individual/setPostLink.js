/**
 * 投稿
 * リンク属性が内部リンク以外は外部リンクにする
 */
ssd.setPostLink = () => {
  $(".js-post-content a").each(function(){
		let _this = $(this),
			  href = _this.attr("href")

    // メールリンクの場合
    if (href.match(/^mailto/)) {
      _this.removeAttr("target")

			if ($("img", _this).length === 0) {
				_this.prepend('<span class="icon-mail linkmail"></span>')
			}

    // サイト内リンクの場合
    } else if (href.match(/^\//) || href.match(/^https:\/\/simplesimples\.com/)) {
			_this.removeAttr("target")

    // 外部リンクの場合
		} else {
			_this.attr("target", "_blank").attr("rel", "noopener noreferrer");

      // 画像リンクではない場合
			if ($("img", _this).length == 0) {
				_this.append('<span class="icon-windows newwin"></span>');
			}
		}
	})
}
