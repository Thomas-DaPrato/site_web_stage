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
    if ($_GET["annee"] != "avant_2015"){
        $querry = 'select * from publications where annee =\''.$_GET["annee"].'\'';
    }
    else {
        $querry = 'SELECT * FROM publications WHERE annee < 2015 ORDER BY annee DESC';
    }
    $resultQuerry = mysqli_query($BD,$querry);

    while ($tabPublicationsAnnee = mysqli_fetch_assoc($resultQuerry)) {
        $publications["auteurs"] = substr($tabPublicationsAnnee["auteurs"],0,-1).':<br>';
        $publications["titre"] = $tabPublicationsAnnee["titre"];
        $publications["doi"] = $tabPublicationsAnnee["doi"];
        $publications["annee"] = $tabPublicationsAnnee["annee"];
        $resultPublicationsAnnee[$i+=1] = $publications;
    }

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    echo json_encode($resultPublicationsAnnee);
}


