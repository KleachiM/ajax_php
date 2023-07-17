<?php

header('Content-Type: application/json');

$request_body = file_get_contents('php://input');
$request_arr = json_decode($request_body, true);
$mail = $request_arr['email'];
$resp = array('mail' => $mail);

$file = "./data/$mail.txt";
// $file = "./data/$mail.txtt"; // для тестирования несуществующего файла

try {

  if (file_exists($file)) {
    $resp = array(302 => 'File already exist');
  } else {
    $f = fopen($file, 'w');
    fwrite($f, $request_body);
    fclose($f);
    $resp = array(200 => 'OK');
  }
} catch (Exception $e) {
  $resp = array(400 => $e->getMessage());
}

echo json_encode($resp);
