<?php

// リファラ情報の有無による簡易分岐
$referer = $_SERVER['HTTP_REFERER'] ?? '';
if (strpos($referer, "simplesimples") === false) {
  exit();
}
?>
<div class="rx100">
  <div class="rx100__data js-rx100-table">
    <?php
    $content = file_get_contents('https://docs.google.com/spreadsheets/d/e/2PACX-1vRnfpGndQZPiYfwmoLWU5XFuGa0V1Eq0Xp5twe5AOoswDXaqJPgvZ_bceww67z1hzeY49Ad_1BzE-5-/pubhtml?gid=1267728074&single=true');

    if ($content) {
      $content = preg_split('/<table/', $content)[1];
      $content = preg_split('/<\/table/', $content)[0];
      $content = '<table'.$content.'</table>';

      echo $content;
    }
    ?>
  </div>

  <ul class="rx100__ex">
    <li>*1 最大画素数読み出し時<li>
    <li>*2 光学ズームを含む、ワイド端からのズームです。（RX1シリーズを除く）<li>
    <li>*3 推奨露光指数<li>
    <li>*4 ISO感度が3200より大きくなると、シャッタースピードが1/4より遅くなりません。1/4より遅くしたい場合は、ISO感度を3200以下にしてください。（DSC-RX0、DSC-RX1、DSC-RX10、DSC-RX100シリーズを除く）<li>
    <li>*5 撮影モードによっては連写できない場合があります。<li>
    <li>*6 カメラ内蔵および外部フラッシュ発光時の連写速度は低下します。<li>
    <li>*7 動画撮影時には、本機対応（記録メディアの項参照）のSDHCカードClass4以上、SDXCカード（対応機種のみ）、メモリースティックデュオ（Mark2)、PRO-HGデュオが使用可能<li>
    <li>*8 液晶画面をON、ズームをW側、T側、それぞれ交互に端点まで移動を繰り返し、2回に1回フラッシュを発光、10回に1回電源をON/OFFして、30秒ごとに1回撮影<li>
    <li>*9 連続で撮影できる時間は約29分です。(商品仕様による制限、出荷設定時。DSC-RX0、DSC-RX0M2、DSC-RX100M7除く)<li>
    <li>*10 撮影、ズーム(DSC-RX1、DSC-RX0シリーズ除く)、撮影スタンバイ、電源ON/OFFを繰り返したときの撮影時間の目安。<li>
    <li>*11 静止画/動画の広色域記録対応、かつHDMI広色域伝送対応機種。広色域色空間は、静止画：sRGB規格（色域sYCC）、AdobeRGB規格、動画：xvYCC規格 を指す。<li>
    <li>*12 撮影間隔は最大画像サイズ時<li>
    <li>*13 カメラに表示、またExifに記録される値<li>
    <li>*14 重ね合わせ連写を使って実現しています。<li>
    <li>*15 「全画素超解像」技術および重ね合わせ連写を使って実現しています。<li>
    <li>*16 1度の撮影枚数は7枚です。<li>
    <li>*17 連写は途中から遅くなります。<li>
    <li>*18 セルフタイマー併用可<li>
    <li>*19 アダプター使用時（別売）<li>
    <li>*20 この商品にはマイクロUSB規格に対応した機器をつなぐことができます。<li>
    <li>*21 音声は再生時のみ出力されます。<li>
    <li>*22 連続撮影の制限により撮影が終了しても、撮影を続けた場合の撮影時間。その他の操作はしない。<li>
    <li>*23 シューティンググリップキット「DSC-RX100M7G」に付属。「DSC-RX100M7」には付属しておりません<li>
  </ul>
</div>
