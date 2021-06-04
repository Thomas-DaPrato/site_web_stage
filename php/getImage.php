<?php
if (isset($_GET['nomImg'])) {
    $img = array();
    $fichierMembres = scandir('../img/membres');
    foreach ($fichierMembres as $nomMembre) {
        if (strpos($nomMembre,$_GET['nomImg']) !== false) {
            $img[] = $nomMembre;
        }
    }


    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($img);
}