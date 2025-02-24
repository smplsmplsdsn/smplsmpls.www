<?php
function file_get_contents_custom($url) {
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // HTTPSの検証を無効化（必要に応じて）
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // リダイレクトを許可
  curl_setopt($ch, CURLOPT_TIMEOUT, 10); // タイムアウト（秒）

  $source = curl_exec($ch);
  $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE); // HTTPステータスコード取得
  $error = curl_error($ch); // エラーメッセージ取得
  curl_close($ch);

  if ($source === false) {
    return "cURL Error: " . $error; // エラーがある場合、エラーメッセージを返す
  }

  if ($http_code !== 200) {
    return "HTTP Error: " . $http_code; // HTTPエラーならステータスコードを返す
  }

  return $source;
}
