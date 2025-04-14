<div class="contact">
  <div class="contact__inner">
    <h1 class="contact__title">お問い合わせ</h1>
    <div class="contact__text">
      <p>シンプルシンプルデザインに興味を持っていただき、ありがとうございます。<br>
      1〜3営業日以内に川上よりご連絡いたします。<br>
      <span class="contact__caution">営業メールは、申し訳ありませんが、返信致しかねますのでご了承ください。<span></p>
      <p>お問い合わせ前に、<a href="/privacy/" class="js-link">プライバシーポリシー</a>を一読いただき、同意のうえで送信してください。<p>
    </div>
    <form class="contact__form js-form-contact" method="post" onsubmit="return false" novalidate>
      <dl>
        <div>
          <dt>
            <span>お問い合わせ内容</span>
          <dt>
          <dd>
            <select name="contact">
              <option value="未選択">選択してください</option>
              <option value="ボランティア参加について">ボランティア参加について</option>
              <option value="プロジェクト参画、案件参画について">プロジェクト参画、案件参画について</option>
              <option value="Webアプリ制作について">Webアプリ制作について</option>
              <option value="映像制作について">映像制作について</option>
              <option value="その他">その他</option>
            </select>
          </dd>
        </div>
        <div>
          <dt>
            <span>会社名</span>
          <dt>
          <dd>
            <input type="text" name="company" value="">
          </dd>
        </div>
        <div>
          <dt>
            <span class="contact__form-required">必須</span>
            <span>お名前</span>
          <dt>
          <dd>
            <input type="text" name="name" value="">
          </dd>
        </div>
        <div>
          <dt>
            <span class="contact__form-required">必須</span>
            <span>メールアドレス</span>
          <dt>
          <dd>
            <input type="email" name="email" value="">
          </dd>
        </div>
        <div>
          <dt>
            <span class="contact__form-required">必須</span>
            <span>お問い合わせ内容</span>
          <dt>
          <dd>
            <textarea name="content"></textarea>
          </dd>
        </div>
      </dl>
      <div class="contact__success js-contact-success" style="display:none;">
        <p class="contact__success-show"><strong>お問い合わせありがとうござます。</strong><br>自動返信メールをお送りしております。メール受信をご確認くださいませ。<br><a class="js-link-contact-noreply">自動返信メールが届かない場合はこちら</a></p>
        <div class="contact__success-hide js-contact-success-hide">
          <p>メールが届かない場合、以下の点をご確認ください。</p>
          <ul>
            <li>入力したメールアドレスに誤りがないか確認してください。</li>
            <li>特定のドメインやメールアドレスからのメールを受信拒否する設定になっている可能性があります。</li>
            <li>迷惑メールフォルダに振り分けられている可能性があります。</li>
            <li>迷惑メールフィルターの設定が、お問い合わせフォームからのメールをブロックしている可能性があります。</li>
          </ul>
          <p>上記をご確認いただいてもメールが届かない場合は、お手数ですが、simplesimplesdesign@gmail.com 担当：川上 宛てに改めてお問い合わせください。</p>
        </div>
      </div>
      <p class="contact__submit">
        <button type="button">送信する</button>
      </p>
    </form>
  </div>
</div>