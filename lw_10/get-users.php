<?php

header('Content-Type: application/json');

// $files = scandir('./data');
$files_list = array();
$files = preg_grep('/^[^.]/', scandir('./data'));
foreach($files as $file) {
  $txt = json_decode(file_get_contents("./data/$file"), true);
  // array_push($files_list, [$file => $txt]);
  array_push($files_list, $txt);
}

echo json_encode($files_list);