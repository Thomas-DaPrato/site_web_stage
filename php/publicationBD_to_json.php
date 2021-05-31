<?php
/*
 * Code permettant de récuperer toutes les publications stockées dans la base de données et de les convertir au format json pour enuite etre lu par addPublications.js
 * */

//gestion base de donnée

$BD = mysqli_connect("127.0.0.1","root","Ba\$eDonneeCBI") or die("erreur de connexion");
mysqli_select_db($BD,"cbi-publication") or die("erreur de connexion a la base de donnée");
$querry = 'select * from publications order by annee desc';

$publications = array();
$resultPublications = array();
$i = 0;

// Recupère toute les publications de la base de donnée trié par ordre decroissant

$resultQuerry = mysqli_query($BD,$querry);
while ($tabPublications = mysqli_fetch_assoc($resultQuerry)){
    $publications["auteurs"] = $tabPublications["auteurs"];
    $publications["titre"] = $tabPublications["titre"];
    $publications["doi"] = $tabPublications["doi"];
    $publications["annee"] = $tabPublications["annee"];
    $publications["volume"] = $tabPublications["volume"];
    $publications["page"] = $tabPublications["page"];
    $publications["titreRevue"] = $tabPublications["titreRevue"];
    $publications["editeurRevue"] = $tabPublications["editeurRevue"];
    $publications["id_hal"] = $tabPublications["id_hal"];
    $publications["docType"] = $tabPublications["docType"];
    $publications["lien_fichier"] = $tabPublications["lien_fichier"];
    $resultPublications[$i+=1] = $publications;
}

$querryAnneeMax = 'select max(annee) from publications';
$resultQuerryAnneeMax = mysqli_query($BD,$querryAnneeMax);
while ($result = mysqli_fetch_assoc($resultQuerryAnneeMax)) {
    $resultPublications["anneeMax"] = $result["max(annee)"];
}

/*
echo '<pre>';
var_dump($resultPublications);
echo '<pre/>';*/

//final output
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultPublications);

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
