<?php

$fichierAlumni = file('../team/alumni.csv');



$membre = array();
$infoInitial = explode(';',$fichierAlumni[0]);
$infoInitial[sizeof($infoInitial)-1] = substr($infoInitial[sizeof($infoInitial)-1],0,-2);

for ($i = 1; $i <sizeof($fichierAlumni); $i +=1){
    $infoMembre = explode(';',$fichierAlumni[$i]);
    $nomMembre = array_shift($infoMembre);
    $tabInfoMembre = array();
    for ($j =0 ; $j <sizeof($infoMembre); $j+=1){
        if ($j == sizeof($infoMembre)-1) {
            $tabInfoMembre[$infoInitial[$j+1]] = substr($infoMembre[$j],0,-2);
        }
        else {
            $tabInfoMembre[$infoInitial[$j+1]] = $infoMembre[$j];
        }

    }
    $membre[$nomMembre] = $tabInfoMembre;

}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($membre);
