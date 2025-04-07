cmn.getNormalizeText = str => {
  return str
    // 全角英数字 → 半角に変換（Ａ〜Ｚ、ａ〜ｚ、０〜９）
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, s =>
      String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
    )
    // 全角記号 → 半角記号（例: ，→,、．→.、：→:、；→;）
    .replace(/[！-～]/g, s =>
      String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
    )
    // ダッシュ類を半角ハイフンに正規化
    .replace(/[\u2010-\u2015\u30FC\uFF0D\u2212]/g, '-')
    // 全角スペース → 半角スペース
    .replace(/\u3000/g, ' ')
    // クォート類の正規化（“ ” ‘ ’ → " '）
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
}