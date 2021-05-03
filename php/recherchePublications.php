<?php


session_start();


$publications = array();

function getPublication ($url) {
    $fichier = file_get_contents($url);
    $fichier = stristr($fichier,"<tbody>");
    $fichier = stristr($fichier,"</tbody>",true);
    $fichier = $fichier . "</tbody>";
    $out = array();
    $out2 = array();
    $result = array();
    $i = 0;
    preg_match_all("/<td colspan=\"2\"[^>]*>(.*)<\/td>/isU",$fichier,$out);


    foreach ($out[0] as $elem) {
        preg_match("/<span class=\"ref-authors\"[^>]*>(.*)<\/span>/isU", $elem, $out2["auteurs"]);
        preg_match("/<strong[^>]*>(.*)<\/strong>/isU", $elem, $out2["titre"]);
        preg_match("/<a target=\"_blank\"[^>]*>(.*)<\/a>/isU", $elem, $out2["doi"]);
        preg_match("/(,( |([a-z]|[A-Z]))* \d{4})/isU",$elem,$out2["annee"]);

        if (isset($out2["auteurs"][0])){
            $out2["auteurs"] = str_replace('\'','\\\'',strip_tags($out2["auteurs"][0]));
        }

        if (isset($out2["titre"][0])){
            $out2["titre"] = str_replace('\'','\\\'',strip_tags($out2["titre"][0],'<a>'));
        }

        if (isset($out2["doi"][0])){
            $out2["doi"] = strip_tags($out2["doi"][0]);
        }

        if (isset($out2["annee"][0])){
            $out2["annee"] = substr($out2["annee"][0],-4);
        }

        $result[$i+=1] = $out2;
    }

    return $result;
}


$publications["santiago"] = getPublication("https://hal.archives-ouvertes.fr/search/index/?q=%2A&authIdHal_s=santiago-arroyave-tobon");
$publications["loic"] = getPublication("https://hal.archives-ouvertes.fr/search/index/?q=%2A&authFullName_s=Loic+Tadrist&rows=100");
$publications["jean-marc"] = getPublication("https://hal.archives-ouvertes.fr/search/index/?q=%2A&authFullName_s=Jean-Marc+Linares&rows=100");
$publications["julien"] = getPublication("https://hal.archives-ouvertes.fr/search/index/?q=%2A&authIdHal_s=julien-chaves-jacob&rows=100");
$publications["jean-michel"] = getPublication("https://hal.archives-ouvertes.fr/search/index/?q=%2A&authFullName_s=Jean-Michel+Sprauel&rows=100");


$BD = mysqli_connect("127.0.0.1","root","") or die("erreur de connexion");
mysqli_select_db($BD,"cbi-publication") or die("erreur de connexion a la base de donnée");
if (mysqli_query($BD, 'TRUNCATE TABLE publications')){
    echo 'requete truncate reussi','<br>';
}
else {
    echo 'requet truncate pas reussi';
}

foreach ($publications as $name) {
    foreach ($name as $publication) {
        $requetes = 'Insert into publications (DOI,Auteurs,Titre, annee) values (';
        if (gettype($publication["doi"]) == "string"){
            $requetes.= '\''.$publication["doi"].'\',\'';
        }
        else {
            $requetes.= 'null,\'';
        }
        $requetes.= $publication["auteurs"].'\',\''.$publication["titre"].'\',';
        if (gettype($publication["annee"]) == "string"){
            $requetes.= '\''.$publication["annee"].'\')';
        }
        else {
            $requetes.= 'null)';
        }
        if(mysqli_query($BD,$requetes)) {
            echo 'requete insert reussi','<br>';
        }
        else {
            echo 'requete insert pas réussi : ',$requetes,'<br>';

        }

    }
}


$requete_cherche_doublons = 'SELECT count(*) as nb_doublons, doi FROM (SELECT * FROM publications) AS t2 WHERE doi is not null GROUP BY doi HAVING COUNT(*) > 1';

$result_cherche_doublons = mysqli_query($BD,$requete_cherche_doublons);


if($result_cherche_doublons) {
    echo 'requete cherche doublons reussi','<br>';
}
else {
    echo 'requete cherche doublons pas reussi','<br>';
}

while ($tabResult = mysqli_fetch_assoc($result_cherche_doublons)){
    for ($i = 0 ; $i< $tabResult['nb_doublons']-1;$i+=1) {
        $requete_suppr_doublons = 'delete from publications where id in (select max(id) from (SELECT * FROM publications)
            AS t1 where doi=\''.$tabResult['doi'].'\')';
        if(mysqli_query($BD,$requete_suppr_doublons)) {
            echo 'requete suppr doublons reussi','<br>';
        }
        else {
            echo 'requete suppr doublons pas reussi','<br>';
        }
    }
}

echo 'fini';
/*
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($publications);*/

