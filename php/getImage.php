<?php
$img = array();

$fichierImages = scandir('../img');
$fichierImagesMembres = scandir('../img/membres');
$fichierImagesLogo = scandir('../img/logos');

if (isset($_GET['nomImg'])) {
    
    foreach ($fichierImages as $nomImages) {
        if (strpos($nomImages,$_GET['nomImg']) !== false) {
            $img[] = $nomImages;
        }
    }
    foreach ($fichierImagesMembres as $nomImages) {
        if (strpos($nomImages,$_GET['nomImg']) !== false) {
            $img[] = 'membres/'.$nomImages;
        }
    }
    foreach ($fichierImagesLogo as $nomImages) {
        if (strpos($nomImages,$_GET['nomImg']) !== false) {
            $img[] = 'logos/'.$nomImages;
        }
    }

}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($img);