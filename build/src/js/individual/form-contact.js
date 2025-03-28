$(() => {
  let is_sending = false

  const showError = (text) => {
    $('.js-form-contact button[type="button"]').before('<p class="contact__error js-contact-error">' + text + '</p>')
  }

  $(document).on('click', '.js-form-contact button[type="button"]', async function () {
    const _this = $(this),
          _form = _this.closest('.js-form-contact'),
          _contact_error = $('.js-contact-error', _form),
          _contact_success = $('.js-contact-success', _form),
          _contact_success_hide = $('.js-contact-success-hide', _form)

    $('.js-link-contact-noreply', _form).on('click', () => {
      _contact_success_hide.toggle()
      return false
    })

    if (!is_sending) {
      _contact_error.remove()
      _contact_success.hide()

      const formData = new FormData(_form.get(0))
      const data = {}

      formData.forEach((value, key) => {
        data[key] = value
      })

      if (data.name.trim() === '') {
        showError('お名前を入力してください。')
        return false
      }

      if (!(/\S+@\S+\.\S+/.test(data.email))) {
        showError('メールアドレスを入力してください。')
        return false
      }

      if (data.content.trim() === '') {
        showError('お問い合わせ内容を入力してください。')
        return false
      }

      is_sending = true

      _this.html('<span class="animation-blinker">送信中...</span>')


      const email = data.email,
            subject = '【シンプルシンプルデザイン】お問い合わせありがとうございます',
            body = `
<p>【こちらは自動返信メールです】</p>
<p>このたびは、数ある同業社の中から、シンプルシンプルデザインにお問い合わせいただき、誠にありがとうございます。<br>内容を確認させていただいた後、3営業日以内に担当者からご連絡いたします。<br>申し訳ありませんが、営業メールには返信致しかねますので予めご了承くださいませ。</p>
<p>
<strong>お問い合わせ内容</strong><br>
${data.contact.trim()}
</p>
<p>
<strong>会社名</strong><br>
${data.company.trim()}
</p>
<p>
<strong>お名前</strong><br>
${data.name.trim()}
</p>
<p>
<strong>メールアドレス</strong><br>
${data.email}
</p>
<p>
<strong>お問い合わせ内容詳細</strong><br>
${data.content.trim()}
</p>
            `,
            altbody = `
【こちらは自動返信メールです】\n\n
このたびは、数ある同業社の中から、シンプルシンプルデザインにお問い合わせいただき、誠にありがとうございます。\n内容を確認させていただいた後、3営業日以内に担当者からご連絡いたします。\n申し訳ありませんが、営業メールには返信致しかねますので予めご了承くださいませ。\n\n
お問い合わせ内容\n
${data.contact.trim()}\n\n
会社名\n
${data.company.trim()}\n\n
お名前\n
${data.name.trim()}\n\n
お問い合わせ内容詳細\n
${data.content.trim()}
            `

      const response = await fetch('/assets/ajax/contact-form.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': CSRF_TOKEN
        },
        body: JSON.stringify({ email, subject, body, altbody })
      })

      const result = await response.json()

      if (result.status === 'fail') {
        switch (result.message) {
          case 'Reload_due_to_invalide_request':
            showError('送信できませんでした。')
            break
          case 'Error Message body empty':
            showError('入力不備により、送信できませんでした。')
            break
        }
      } else {
        _contact_success_hide.hide()
        _contact_success.show()
        $('[name="name"]').val('')
      }

      is_sending = false
      _this.html('送信する')
    }

    return false
  })

  // 値に変更があった場合、ストレージに保存する
  $(document).on('change', '.js-form-contact input, .js-form-contact textarea, .js-form-contact select', () => {
    cmn.saveFormData('.js-form-contact')
  })
})