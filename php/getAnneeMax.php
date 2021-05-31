<?php

$BD = mysqli_connect("127.0.0.1","root","Ba\$eDonneeCBI") or die("erreur de connexion");
mysqli_select_db($BD,"cbi-publication") or die("erreur de connexion a la base de donnée");
$tabAnneeMax = array();

$querryAnneeMax = 'select max(annee) from publications';
$resultQuerryAnneeMax = mysqli_query($BD,$querryAnneeMax);
while ($result = mysqli_fetch_assoc($resultQuerryAnneeMax)) {
    $tabAnneeMax["anneeMax"] = $result["max(annee)"];
}

//final output
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($tabAnneeMax);
