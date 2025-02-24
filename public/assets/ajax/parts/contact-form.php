<?php
session_start();
header('Content-Type: application/json');

$mail_host = 'smtp.gmail.com';
$mail_address = 'simplesimplesdesign@gmail.com';
$mail_pass = 'nekj fpxb lwzt esvl';
$mail_port = 587;
$mail_secure = 'tls';
$mail_address_name = 'シンプルシンプルデザイン運営事務局';
$mail_domain = '@gmail.com';
$mail_expires = 1;

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

// POSTデータ判別
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
  returnErrorResponse('invalid_request_method');
}

require_once(__DIR__ . '/../../../../vendor/autoload.php');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

$post_data = json_decode(file_get_contents('php://input'), true);
$post_subject = $post_data['subject'] ?? 'NO SUBJECT';
$post_address = $post_data['email'] ?? $mail_address;
$post_body = $post_data['body'] ?? '';
$post_altbody = $post_data['altbody'] ?? '';

try {

  // デバッグ情報を表示しない
  $mail->SMTPDebug = 0;

  // Mailerヘッダーを非表示にする
  $mail->XMailer = '';
  $mail->addCustomHeader('X-Mailer', '');

  // SMTP設定
  $mail->isSMTP();
  $mail->Host = $mail_host;
  $mail->SMTPAuth = true;
  $mail->Username = $mail_address;
  $mail->Password = $mail_pass;
  $mail->SMTPSecure = $mail_secure;
  $mail->Port = $mail_port;

  $mail->CharSet = 'UTF-8';
  $mail->Encoding = 'base64';

  // 送信者情報
  $mail->setFrom($mail_address, $mail_address_name);
  $mail->addAddress($post_address);
  $mail->addAddress('simplesimplesdesign@gmail.com');

  // メール内容
  $mail->isHTML(true); // HTML形式を使用
  $mail->Subject = $post_subject;
  $mail->Body = $post_body;

  if ($post_altbody != '') {
    $mail->AltBody = $post_altbody;
  }

  // メールを送信
  $mail->send();

  echo json_encode([
    'status' => 'success'
  ]);
} catch (Exception $e) {
  echo json_encode([
    'status' => 'fail',
    'message' => "Error {$mail->ErrorInfo}"
  ]);
}
