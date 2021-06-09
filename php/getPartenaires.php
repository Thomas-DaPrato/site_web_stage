<?php

$fichierPartenaires = file('../team/partenaires.csv');

for ($i = 0; $i < sizeof($fichierPartenaires); $i += 1) {
    $fichierPartenaires[$i] = utf8_encode($fichierPartenaires[$i]);
}

$tabPartenaires = array();
$typePartenaires = "";
$infoInitales = array();
$tabTypePartenaires = array();

for ($i = 1; $i < sizeof($fichierPartenaires); $i += 1) {
    $partenaire = array();
    $infoPartenaires = explode(';', $fichierPartenaires[$i]);
    if ($infoPartenaires[0] == '' && $infoPartenaires[1] == '') {
        continue;
    }
    for ($j = 0; $j < sizeof($infoPartenaires); $j += 1) {
        if ($j == sizeof($infoPartenaires) - 1) {
            $infoPartenaires[$j] = substr($infoPartenaires[$j], 0, -2);
        }
    }
    if ($infoPartenaires[0] != '' && $infoPartenaires[1] == '') {
        $typePartenaires = $infoPartenaires[0];
        $tabPartenaires = array();
    } else if ($infoPartenaires[0] == 'informations initiales') {
        $infoInitales = array();
        for ($j = 1; $j < sizeof($infoPartenaires); $j += 1) {
            if ($infoPartenaires[$j] != '') {
                $infoInitales[$j - 1] = $infoPartenaires[$j];
            }
        }
    } else if ($infoPartenaires[0] == '') {
        for ($j = 1; $j < sizeof($infoPartenaires); $j += 1) {
            if ($infoPartenaires[$j] != '') {
                $partenaire[$infoInitales[$j - 1]] = $infoPartenaires[$j];
            }
        }
        $tabPartenaires[] = $partenaire;
    }
    $tabTypePartenaires[$typePartenaires] = $tabPartenaires;

}


header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($tabTypePartenaires);
