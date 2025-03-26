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

// ガード（POSTデータ判別）
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
  returnErrorResponse('invalid_request_method');
}

$post_data = json_decode(file_get_contents('php://input'), true);

// ガード（ファイルがあるか確認する）
if (!(isset($post_data['filename']) && is_file(__DIR__ . '/../assets/json/' . $post_data['filename']))) {
  returnErrorResponse('Create a new file from https://data.simplesimples.com/api2/?class=smplsmplsdsn&filename=' . str_replace('.json', '', $post_data['filename']));
}

// ファイルのパスを設定
$file_path = __DIR__ . '/../assets/json/' . $post_data['filename'];

// ファイルの最終更新日を取得
$file_mtime = filemtime($file_path);

// キャッシュバスティング用のETag生成（更新日時を元に）
$etag = md5($file_mtime);

// クライアント側のETagを確認して、更新が必要かを判定
if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && $_SERVER['HTTP_IF_NONE_MATCH'] === $etag) {
  // キャッシュが一致している場合、304 Not Modifiedを返して更新しない
  header('HTTP/1.1 304 Not Modified');
  exit;
}

// クライアントに新しいETagと更新日時を送信
header('ETag: ' . $etag);
header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $file_mtime) . ' GMT');

// ファイルのデータを取得する
$data = file_get_contents($file_path);

// 取得したデータがJSONであればエンコードして返す
$json_data = json_decode($data, true);
if (json_last_error() !== JSON_ERROR_NONE) {
  returnErrorResponse('Invalid JSON data in file');
}

// 新しいデータをクライアントに返す
echo $data;