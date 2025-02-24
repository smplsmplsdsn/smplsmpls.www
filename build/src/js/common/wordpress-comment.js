
$(() => {
  let is_sending = false

  $(document).on('click', '.js-comment-submit', async function () {
    const _submit_btn = $(this),
          _this = _submit_btn.closest('.js-form-comment'),
          _comment = $('[name="comment"]', _this),
          _nickname = $('[name="author"]', _this),
          _notification = $('.js-comment-notification', _this)

    const post_id = $('[name="comment_post_ID"]', _this).val()

    const form_data = new FormData(_this[0]),
          data_object = Object.fromEntries(form_data.entries())

    _comment.on('input', () => {
      _notification.removeClass('caution').hide()
    })

    if (!is_sending) {

      // ガード（本文が入力されているか確認する）
      if (_comment.val().trim() === '') {
        _notification.addClass('caution').html('コメントが入力されていることをご確認の上、もう一度お試しください。').show()
        return false
      }

      is_sending = true
      _submit_btn.html('<span class="animation-blinker">送信中...</span>')
      $('.js-comment-list').attr('data-id', post_id)

      const response = await fetch('/assets/ajax/parts/post-comment-form.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': CSRF_TOKEN
        },
        body: JSON.stringify(data_object)
      })

      const result = await response.text()

      if (result === 'success') {
        _notification.removeClass('caution').html('コメントありがとうございます！').show()

        // 前後の余白は詰めて、タグは実行しないように文字変換し、改行コードを<br>にする
        let comment = cmn.getNrToBr(_comment.val().trim().replace(/</g, '＜').replace(/>/g, '＞'))
        let nickname = cmn.getNrToBr(_nickname.val().trim().replace(/</g, '＜').replace(/>/g, '＞'))

        // コメント即時反映
        let _comment_list = $('.js-comment-list[data-id="' + post_id + '"]')
        let comment_html = `
          <li class="comment__unit">
            <p class="comment__unit-text">${comment}</p>
            <p class="comment__unit-info">
              <span>${nickname}</span>
              <time>now</time>
            </p>
          </li>
        `

        console.log(_comment_list.length)

        if (_comment_list.length > 0) {
          if ($('li', _comment_list).length > 0) {
            $('li:first-child', _comment_list).before(comment_html)
          } else {
            _comment_list.append(comment_html)
          }
        }

        // コメントリセット
        _comment.val('')
        _nickname.val('')


        // PAGESから削除
        PAGES = PAGES.filter(page => page.data.id !== post_id)
      } else {
        _notification.addClass('caution').html('コメント送信できませんでした。恐れ入りますが、もう一度お試しください。').show()
      }

      is_sending = false
      _submit_btn.html('コメントする')
    }

    return false
  })
})