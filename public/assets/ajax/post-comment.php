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

  $target_url = "https://data.simplesimples.com/wp-comments-post.php";
  $ch = curl_init($target_url);

  // データをURLエンコード形式に変換
  $post_data = [
    'comment_post_ID' => $data['comment_post_ID'],
    'comment' => $data['comment'],
    'author' => $data['author'] ?? '',
    'email' => $data['email'] ?? '',
    'url' => $data['url'] ?? '',
    'comment_parent' => $data['comment_parent'] ?? 0
  ];

  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_data)); // URLエンコード形式に変換
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/x-www-form-urlencoded' // フォーム形式を指定
  ]);

  $response = curl_exec($ch);
  curl_close($ch);

  echo "success";
} else {
  echo "error";
}
