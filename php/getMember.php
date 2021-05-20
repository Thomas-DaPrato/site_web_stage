<?php
/*
 * Code permettant d'ouvrir le equipe_en_cours.txt et de le convertir au format json pour enuite etre lu par addMember.js
 * */

$fichierMembers = file('../team/equipe_en_cours.txt');

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($fichierMembers);