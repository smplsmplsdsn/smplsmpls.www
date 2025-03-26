<?php
session_start();
header('Content-Type: application/json; charset=UTF-8');

/**
 * エラーレスポンスを返して終了する
 */
function returnErrorResponse($message) {
  echo json_encode([
    'status' => 'fail',
    'message' => $message
  ]);
  exit;
}

// ガード（CSRFトークンの検証）
if (!isset($_SESSION['csrf_token']) || !isset($_SERVER['HTTP_X_CSRF_TOKEN']) || $_SESSION['csrf_token'] !== $_SERVER['HTTP_X_CSRF_TOKEN']) {
  returnErrorResponse('Reload_due_to_invalide_request');
}

// ガード（必須パラメータ情報があるか判別する）
$post_id = $_GET['post_id'] ?? null;

if (!$post_id) {
  returnErrorResponse('invalid_request_method(post_id:' . $post_id) .')';
}

// ファイルのパスを設定
$file_path = 'https://data.simplesimples.com/api2/?class=smplsmplsdsn&filename=post&post_id=' . $post_id;

// // ファイルの最終更新日を取得
// $file_mtime = filemtime($file_path);

// // キャッシュバスティング用のETag生成（更新日時を元に）
// $etag = md5($file_mtime);

// // クライアント側のETagを確認して、更新が必要かを判定
// if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && $_SERVER['HTTP_IF_NONE_MATCH'] === $etag) {
//   // キャッシュが一致している場合、304 Not Modifiedを返して更新しない
//   header('HTTP/1.1 304 Not Modified');
//   exit;
// }

// // クライアントに新しいETagと更新日時を送信
// header('ETag: ' . $etag);
// header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $file_mtime) . ' GMT');

// ファイルのデータを取得する
$data = file_get_contents($file_path);

if ($data && $data != '404') {

  // 取得したデータがJSONであればエンコードして返す
  $json_data = json_decode($data, true);
  if (json_last_error() !== JSON_ERROR_NONE) {
    returnErrorResponse('Invalid JSON data in file');
  }
} else {
  returnErrorResponse('Database disconnected');
}

echo $data;