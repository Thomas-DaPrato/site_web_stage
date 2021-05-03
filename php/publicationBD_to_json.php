<?php


$BD = mysqli_connect("127.0.0.1","root","") or die("erreur de connexion");
mysqli_select_db($BD,"cbi-publication") or die("erreur de connexion a la base de donnée");
$querry = 'select * from publications';

$publications = array();
$resultPublications = array();
$i = 0;

$resultQuerry = mysqli_query($BD,$querry);
while ( $tabPublications = mysqli_fetch_assoc($resultQuerry)){
    $publications["auteurs"] = $tabPublications["auteurs"];
    $publications["titre"] = $tabPublications["titre"];
    $publications["doi"] = $tabPublications["doi"];
    $publications["annee"] = $tabPublications["annee"];
    $resultPublications[$i+=1] = $publications;
}

//final output
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultPublications);

