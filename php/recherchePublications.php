<?php

session_start();

$publications = array();

// Lecture du fichier permanents.txt pour pouvoir aller chercher leurs publications
// Récupère le nom du chercheur ainsi qu'un lien vers la page contenant ses publications
// Stocke toutes les publications du chercheur dans un tableau associatif avec les auteurs de la publications,
//      son titre, son année et son DOI

$tabPermanents = file("../team/permanents.txt");
for ($i = 0 ; $i < sizeof($tabPermanents); $i+=1) {
    if ($i < sizeof($tabPermanents) -1){
        $tabPermanents[$i] = substr($tabPermanents[$i],0,-2);
    }
    $tabPermanents[$i] = explode(' : ',$tabPermanents[$i]);
}

//fonction qui récupère les publications sur HAL en fonction de l'url de chaque permanent
function getPublications ($url) {
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
            $out2["auteurs"] = str_replace('\'','&apos;',strip_tags($out2["auteurs"][0]));
        }

        if (isset($out2["titre"][0])){
            $out2["titre"] = str_replace('\'','&apos;',strip_tags($out2["titre"][0],'<a>'));
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

// ajoute au tableau associatif $publications le nom du chercheur avec un son tableau de publications
foreach ($tabPermanents as $name) {
    if (isset($name[1])) {
        $publications[$name[0]] = getPublications($name[1]);
    }
}


//gestion base de donnée


$BD = mysqli_connect("127.0.0.1","root","Ba\$eDonneeCBI") or die("erreur de connexion");
mysqli_select_db($BD,"cbi-publication") or die("erreur de connexion a la base de donnée");
if (mysqli_query($BD, 'TRUNCATE TABLE publications')){
    echo 'requete truncate reussi','<br>';
}
else {
    echo 'requet truncate pas reussi';
}

// Insere dans la base de donée les publications
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

// Cherche dans la base de donnée les doublons de publication. Puis on les supprime jusqu'à avoir un exemplaire de chaque publications
function suppr_doublon ($BD, $type) {
    $requete_cherche_doublons = 'SELECT count(*) as nb_doublons,'.$type. ' FROM (SELECT * FROM publications) AS t2 WHERE '.$type.' 
    is not null GROUP BY ' . $type.' HAVING COUNT(*) > 1';

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
            AS t1 where '.$type.'=\''.$tabResult[$type].'\')';
            if(mysqli_query($BD,$requete_suppr_doublons)) {
                echo 'requete suppr doublons reussi','<br>';
            }
            else {
                echo 'requete suppr doublons pas reussi : ' .$requete_suppr_doublons,'<br>';
            }
        }
    }
}

suppr_doublon($BD, 'doi');
suppr_doublon($BD, 'titre');


echo 'fini';


/*
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($publications);*/

