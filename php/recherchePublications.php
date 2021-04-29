<?php

session_start();

$publications = array();
$tabPersonnes = array();

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
        if (isset($out2["auteurs"][0])){
            $out2["auteurs"] = str_replace('\'','\\\'',strip_tags($out2["auteurs"][0]));
        }

        if (isset($out2["titre"][0])){
            $out2["titre"] = str_replace('\'','\\\'',strip_tags($out2["titre"][0],'<a>'));
        }

        if (isset($out2["doi"][0])){
            $out2["doi"] = strip_tags($out2["doi"][0]);
        }  

        $result[$i+=1] = $out2;
    }

    return $result;
}

$publications["santiago"] = getPublication("https://hal.archives-ouvertes.fr/search/index/?q=santiago+arroyave+tobon&submit=&docType_s=ART+OR+COMM+OR+OUV+OR+COUV+OR+DOUV+OR+OTHER+OR+UNDEFINED+OR+REPORT+OR+THESE+OR+HDR+OR+LECTURE");
$publications["loic"] = getPublication("https://hal.archives-ouvertes.fr/search/index?q=loic+tadrist");
$publications["jean-marc"] = getPublication("https://hal.archives-ouvertes.fr/search/index/?q=jean+marc+linares&submit=");

$tabPersonnes[] = 'santiago';
$tabPersonnes[] = 'loic';
$tabPersonnes[] = 'jean-marc';

$BD = mysqli_connect("127.0.0.1","root","") or die("erreur de connexion");
mysqli_select_db($BD,"cbi-publication") or die("erreur de connexion a la base de donnée");


foreach ($publications as $name) {
    foreach ($name as $publication) {
        $requetes = 'Insert into publications (DOI,Auteurs,Titre) values (\'';
        if (gettype($publication["doi"]) == "string"){
            $requetes.= $publication["doi"].'\',\'';
        }
        else {
            $requetes.= 'null\',\'';
        }
        $requetes.= $publication["auteurs"].'\',\''.$publication["titre"].'\')';
        if(mysqli_query($BD,$requetes)) {
            echo 'requete reussi','<br>';
        }
        else {
            echo 'requete pas réussi : ',$requetes,'<br>';

        }

    }
}


$requete_suppr_doublons = "delete from publications where id IN (SELECT Max(id) FROM (SELECT * FROM publications) AS t1 WHERE doi IN 
(SELECT doi FROM (SELECT * FROM publications) AS t2 WHERE doi != 'null' GROUP BY doi HAVING COUNT(*) > 1));";
for ($i = 0; $i < sizeof($tabPersonnes) - 1; $i++) {
    if(mysqli_query($BD,$requete_suppr_doublons)) {
        echo 'requete suppr doublon reussi','<br>';
    }
    else {
        echo 'requete suppr doublon pas réussi : ',$requetes,'<br>';

    }
}


