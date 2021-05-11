<?php

$file = file_get_contents("http://api.archives-ouvertes.fr/search/?q=*:*&wt=json");
$tab =  json_decode($file);
echo '<pre>';
var_dump($tab);
echo '<pre/>';


/*
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo $file;*/

