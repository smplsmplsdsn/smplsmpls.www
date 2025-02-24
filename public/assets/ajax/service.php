<?php
if (isset($_GET['paths'])) {
  switch ($_GET['paths']) {
    case 'service/service1':
    case 'service/service2':
    case 'service/service3':
      $filename = './' . $_GET['paths'] . '.php';
      break;
    case 'service':
      $filename = './service/index.php';
      break;
    default:
      $filename = './404.php';
  }
} else {
  $filename = './404.php';
}

include_once($filename);

