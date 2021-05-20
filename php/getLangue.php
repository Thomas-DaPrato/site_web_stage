<?php
/*
 * Code permettant d'ouvrir un fichier de langue voulue et de le convertir au format json pour ensuite etre lu par switchLangage.js
 * */

$fichier =array();

if (isset($_GET['langue']) && isset($_GET["fichier"])){
      $fichier = file($_SERVER['DOCUMENT_ROOT'].'/contenu/'.$_GET['langue'].'/'.$_GET['fichier']);
    for ($i = 0 ; $i < sizeof($fichier); $i+=1) {
        if ($i < sizeof($fichier) -1){
            $fichier[$i] = substr($fichier[$i],0,-2);
        }
        $fichier[$i] = explode(' : ',$fichier[$i]);
    }


}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($fichier);





