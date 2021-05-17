<?php

//gestion base de donnée

$BD = mysqli_connect("127.0.0.1","root","Ba\$eDonneeCBI") or die("erreur de connexion");
mysqli_select_db($BD,"cbi-publication") or die("erreur de connexion a la base de donnée");

$resultPublicationsAnnee = array();
$publications = array();
$querry = '';
$i = 0;


// Recupère toute les publications d'une même année

if(isset($_GET["annee"])) {
    $annee = explode('_',$_GET['annee']);
    if (!isset($annee[1])){
        $querry = 'select * from publications where annee ='.$annee[0];
    }
    else {
        $querry = 'SELECT * FROM publications WHERE annee < '.$annee[1].' ORDER BY annee DESC';
    }

    $resultQuerry = mysqli_query($BD,$querry);


    while ($tabPublicationsAnnee = mysqli_fetch_assoc($resultQuerry)) {
        $publications["auteurs"] = $tabPublicationsAnnee["auteurs"];
        $publications["titre"] = $tabPublicationsAnnee["titre"];
        $publications["doi"] = $tabPublicationsAnnee["doi"];
        $publications["annee"] = $tabPublicationsAnnee["annee"];
        $publications["volume"] = $tabPublicationsAnnee["volume"];
        $publications["page"] = $tabPublicationsAnnee["page"];
        $publications["titreRevue"] = $tabPublicationsAnnee["titreRevue"];
        $publications["editeurRevue"] = $tabPublicationsAnnee["editeurRevue"];
        $publications["id_hal"] = $tabPublicationsAnnee["id_hal"];
        $resultPublicationsAnnee[$i+=1] = $publications;
    }

    $querryAnneeMax = 'select max(annee) from publications';
    $resultQuerryAnneeMax = mysqli_query($BD,$querryAnneeMax);
    while ($result = mysqli_fetch_assoc($resultQuerryAnneeMax)) {
        $resultPublicationsAnnee["anneeMax"] = $result["max(annee)"];
    }


}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultPublicationsAnnee);


