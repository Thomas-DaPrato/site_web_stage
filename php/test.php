<?php

$tab = array();

$BD = mysqli_connect("127.0.0.1","root","Ba\$eDonneeCBI") or die("erreur de connexion");
mysqli_select_db($BD,"cbi-publication") or die("erreur de connexion a la base de donnée");

function getPublications ($BD,$name) {
    $fichierPublications = json_decode(file_get_contents("https://api.archives-ouvertes.fr/search/?wt=json&rows=100&fl=docid,publicationDateY_i,doiId_s,authFullName_s,journalTitle_s,title_s,journalPublisher_s,volume_s,page_s,halId_s,docType_s&q=".$name));
    echo '<pre>';
    var_dump($fichierPublications);
    echo '<pre/>';
}


$querry = 'select * from publications where id=1';
$resultQuerry = mysqli_query($BD,$querry);
while ($result = mysqli_fetch_assoc($resultQuerry)){
    $tab[] =  $result['auteurs'];
}



header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($tab);

