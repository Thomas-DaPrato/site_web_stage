<?php

/*
 * Code permettant d'ouvrir le fichier offre.csv et de le convertir au format json pour enuite etre lu par addOffre.js
 * */

if (isset($_GET['langueOffre'])) {

    $fichierOffre = array();
    if ($_GET['langueOffre'] == 'fr') {
        $fichierOffre = file('../offre/offre_fr.csv');
    }
    else
    {
        $fichierOffre = file('../offre/offre_en.csv');
    }

    $offre = array();

    for ($i = 0; $i < sizeof($fichierOffre); $i += 1) {
        $fichierOffre[$i] = utf8_encode($fichierOffre[$i]);
    }

    $infoInitial = explode(';', $fichierOffre[1]);
    $infoInitial[sizeof($infoInitial) - 1] = substr($infoInitial[sizeof($infoInitial) - 1], 0, -2);


    for ($i = 2; $i < sizeof($fichierOffre); $i += 1) {
        $infoOffre = explode(';', $fichierOffre[$i]);
        $nomOffre = array_shift($infoOffre);
        if ($nomOffre != '') {
            $tabInfoOffre = array();
            for ($j = 0; $j < sizeof($infoOffre); $j += 1) {
                if ($j == sizeof($infoOffre) - 1) {
                    $tabInfoOffre[$infoInitial[$j + 1]] = substr($infoOffre[$j], 0, -2);
                } else {
                    $tabInfoOffre[$infoInitial[$j + 1]] = $infoOffre[$j];
                }

            }
            $offre[$nomOffre] = $tabInfoOffre;
        } else {
            if ($_GET['langueOffre'] == 'fr'){
                $offre['aucune_offre'] = 'Aucune offre disponible pour le moment';
            }
            else {
                $offre['aucune_offre'] = 'No offer avaibable at the moment';
            }
        }
    }

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($offre);

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
}
