<?php
header('Content-Type: application/json; charset=UTF-8');

$url = "https://data.simplesimples.com/api2/?class=blog-type&{$_SERVER['QUERY_STRING']}";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Accept: application/json'
]);

$json = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
  echo $json;
} else {
  echo json_encode([
    'success' => false,
    'message' => 'データの取得に失敗しました'
  ]);
}
