<?php
session_start();

header('Content-Type: text/html; charset=UTF-8');

// ガード（CSRFトークンの検証）
if (!isset($_SESSION['csrf_token']) || !isset($_SERVER['HTTP_X_CSRF_TOKEN']) || $_SESSION['csrf_token'] !== $_SERVER['HTTP_X_CSRF_TOKEN']) {
  echo 'error token';
  exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['comment'])) {

  $target_url = "https://data.simplesimples.com/wp-json/wp/v2/comments";
  $ch = curl_init($target_url);

  // データをURLエンコード形式に変換
  $post_data = [
    'post' => $data['comment_post_ID'],
    'content' => $data['comment'],
    'author_name' => $data['author'] ?? '',
    'author_email' => $data['email'] ?? '',
    'author_url' => $data['url'] ?? '',
    'parent' => $data['comment_parent'] ?? 0
  ];

  // cURL オプション設定
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post_data)); // JSON 形式に変更
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json' // JSON を指定
  ]);

  $response = curl_exec($ch);
  curl_close($ch);

  echo "success";
} else {
  echo "error";
}
