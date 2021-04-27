<?php

session_start();

$publication = array();

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
        preg_match("/<span class=\"ref-authors\"[^>]*>(.*)<\/span>/isU", $elem, $out2["auteur"]);
        preg_match("/<strong[^>]*>(.*)<\/strong>/isU", $elem, $out2["titre"]);
        preg_match("/<a target=\"_blank\"[^>]*>(.*)<\/a>/isU", $elem, $out2["doi"]);
        if (isset($out2["auteur"][0])){
            $out2["auteur"] = strip_tags($out2["auteur"][0]);
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

$publication["santiago"] = getPublication("https://hal.archives-ouvertes.fr/search/index/?q=santiago+arroyave+tobon&submit=&docType_s=ART+OR+COMM+OR+OUV+OR+COUV+OR+DOUV+OR+OTHER+OR+UNDEFINED+OR+REPORT+OR+THESE+OR+HDR+OR+LECTURE");
$publication["loic"] = getPublication("https://hal.archives-ouvertes.fr/search/index?q=loic+tadrist");

//final output
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($publication);

