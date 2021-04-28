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
        if (isset($out2["auteurs"][0])){
            $out2["auteurs"] = strip_tags($out2["auteurs"][0]);
        }

        if (isset($out2["titre"][0])){
            $out2["titre"] = strip_tags($out2["titre"][0],'<a>');
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

$BD = mysqli_connect("127.0.0.1","root","") or die("erreur1");
mysqli_select_db($BD,"cbi-publication") or die("erreur2");


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
        mysqli_query($BD,$requetes);
    }
}


/*//final output
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($publications);*/

