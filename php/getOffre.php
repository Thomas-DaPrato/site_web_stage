<?php

$fichierOffre = file('../offre/offre.csv');


$offre = array();
$infoInitial = explode(';',$fichierOffre[0]);
$infoInitial[sizeof($infoInitial)-1] = substr($infoInitial[sizeof($infoInitial)-1],0,-2);

for ($i = 1; $i <sizeof($fichierOffre); $i +=1){
    $infoOffre = explode(';',$fichierOffre[$i]);
    $nomOffre = array_shift($infoOffre);
    $tabInfoOffre = array();
    for ($j =0 ; $j <sizeof($infoOffre); $j+=1){
        if ($j == sizeof($infoOffre) -1) {
            $tabInfoOffre[$infoInitial[$j+1]] = substr($infoOffre[$j],0,-2);
        }
        else {
            $tabInfoOffre[$infoInitial[$j+1]] = $infoOffre[$j];
        }

    }
    $offre[$nomOffre] = $tabInfoOffre;

}


header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($offre);
