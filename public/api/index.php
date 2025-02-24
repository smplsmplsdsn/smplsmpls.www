<?php
// 'class' が設定されていなければ 404 を表示
if (!isset($_GET['class']) || !preg_match('/^[a-zA-Z0-9_-]+$/', $_GET['class'])) {
  echo '404';
  exit();
}

include_once(__DIR__ . '/' . $_GET['class'] . '.php');
