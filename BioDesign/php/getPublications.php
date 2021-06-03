<?php

/*
 * Code permettant d'ouvrir le fichier Publications.csv et de le convertir au format json pour ensuite etre lu par addPublications.js
 * */

$fichierPublications = file('../publications/publications.csv');

$Publications = array();

for($i = 0; $i<sizeof($fichierPublications); $i+=1){
    $fichierPublications[$i] = utf8_encode($fichierPublications[$i]);
}



$infoInitial = explode(';',$fichierPublications[1]);
$infoInitial[sizeof($infoInitial)-1] = substr($infoInitial[sizeof($infoInitial)-1],0,-2);



for ($i = 2; $i <sizeof($fichierPublications); $i +=1){
    $infoPublications = explode(';',$fichierPublications[$i]);
        $tabInfoPublications = array();
        for ($j = 0; $j < sizeof($infoPublications); $j += 1) {
            if ($j == sizeof($infoPublications) - 1) {
                $tabInfoPublications[$infoInitial[$j]] = substr($infoPublications[$j], 0, -2);
            } else {
                $tabInfoPublications[$infoInitial[$j]] = $infoPublications[$j];
            }

        }
        $Publications[] = $tabInfoPublications;
}


header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($Publications);

/*
switch (json_last_error()) {
    case JSON_ERROR_NONE:
        echo ' - Aucune erreur';
        break;
    case JSON_ERROR_DEPTH:
        echo ' - Profondeur maximale atteinte';
        break;
    case JSON_ERROR_STATE_MISMATCH:
        echo ' - Inadéquation des modes ou underflow';
        break;
    case JSON_ERROR_CTRL_CHAR:
        echo ' - Erreur lors du contrôle des caractères';
        break;
    case JSON_ERROR_SYNTAX:
        echo ' - Erreur de syntaxe ; JSON malformé';
        break;
    case JSON_ERROR_UTF8:
        echo ' - Caractères UTF-8 malformés, probablement une erreur d\'encodage';
        break;
    default:
        echo ' - Erreur inconnue';
        break;
}*/
