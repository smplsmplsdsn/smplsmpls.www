<?php
header('Content-Type: application/json; charset=utf-8');

$id = isset($_GET['id']) && ctype_digit($_GET['id']) ? (int) $_GET['id'] : 0;
$url = 'https://data.simplesimples.com/api2/?class=businessquotes&id=' . $id;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // ローカル環境なら false
curl_setopt($ch, CURLOPT_TIMEOUT, 10); // タイムアウト設定

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($response === false) {
  echo json_encode([
    'error_code' => 'error',
    'error' => 'cURL Error: ' . curl_error($ch)
  ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
  curl_close($ch);
  exit;
}

curl_close($ch);

if ($http_code !== 200) {
  echo json_encode([
    'error_code' => 'error',
    'error' => "HTTP Error: $http_code",
    'response' => $response
  ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
  exit;
}

echo $response;
exit;
