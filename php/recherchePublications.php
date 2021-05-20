<?php

session_start();


// Lecture du fichier permanents.txt pour pouvoir aller chercher leurs publications
// Récupère le nom du chercheur ainsi qu'un lien vers la page contenant ses publications
// Stocke toutes les publications du chercheur dans un tableau associatif avec les auteurs de la publications,
//      son titre, son année,son DOI, son id de document, le titre de la revue, l'editeur de la revue, le volume, la page, son identifiant hal, son type de document

$tabPermanents = file("../team/permanents.txt");
for ($i = 0; $i < sizeof($tabPermanents); $i += 1) {
    if ($i < sizeof($tabPermanents) - 1) {
        $tabPermanents[$i] = substr($tabPermanents[$i], 0, -2);
    }
    $tabPermanents[$i] = explode(' : ', $tabPermanents[$i]);
}

$BD = mysqli_connect("127.0.0.1", "root", "Ba\$eDonneeCBI") or die("erreur de connexion");
mysqli_select_db($BD, "cbi-publication") or die("erreur de connexion a la base de donnée");


function getPublications($BD, $name)
{
    $fichierPublications = json_decode(file_get_contents("https://api.archives-ouvertes.fr/search/?wt=json&rows=100&fl=docid,publicationDateY_i,doiId_s,authFullName_s,journalTitle_s,title_s,journalPublisher_s,volume_s,page_s,halId_s,docType_s&q=*&authFullName_s=" . $name));
    $fichierPublications = (array)$fichierPublications;
    foreach ($fichierPublications as $publication) {
        $publication = (array)$publication;
        foreach ($publication["docs"] as $infoPubli) {
            $infoPubli = (array)$infoPubli;
            $requete = 'Insert into publications (doc_id,';
            $suiteRequete = ' values (' . $infoPubli['docid'] . ',';
            if (isset($infoPubli["doiId_s"])) {
                $requete .= 'doi,';
                $suiteRequete .= '"' . $infoPubli["doiId_s"] . '",';
            }
            if (isset($infoPubli["docType_s"])) {
                $requete .= 'docType,';
                $suiteRequete .= '"' . $infoPubli["docType_s"] . '",';
            }
            if (isset($infoPubli["publicationDateY_i"])) {
                $requete .= 'annee,';
                $suiteRequete .= '' . $infoPubli["publicationDateY_i"] . ',';
            }
            if (isset($infoPubli["authFullName_s"])) {
                $infoPubli["authFullName_s"] = implode(', ', $infoPubli["authFullName_s"]) . '.';
                $requete .= 'auteurs,';
                $suiteRequete .= '"' . $infoPubli["authFullName_s"] . '",';
            }
            if (isset($infoPubli["title_s"])) {
                $infoPubli["title_s"] = implode(' ', $infoPubli["title_s"]);
                $requete .= 'titre,';
                $suiteRequete .= '"' . $infoPubli["title_s"] . '",';
            }
            if (isset($infoPubli["journalTitle_s"])) {
                $requete .= 'titreRevue,';
                $suiteRequete .= '"' . $infoPubli["journalTitle_s"] . '",';
            }
            if (isset($infoPubli["journalPublisher_s"])) {
                $requete .= 'editeurRevue,';
                $suiteRequete .= '"' . $infoPubli["journalPublisher_s"] . '",';
            }
            if (isset($infoPubli["volume_s"])) {
                $requete .= 'volume,';
                $suiteRequete .= '"' . $infoPubli["volume_s"] . '",';
            }
            if (isset($infoPubli["page_s"])) {
                $requete .= 'page,';
                $suiteRequete .= '"' . $infoPubli["page_s"] . '",';
            }
            $requete .= 'id_hal)';
            $suiteRequete .= '"' . $infoPubli["halId_s"] . '")';
            $requete .= $suiteRequete;
            if (mysqli_query($BD, $requete)) {
                echo 'requete insert reussi', '<br>';
            } else {
                echo 'requete insert pas réussi : ', $requete, '<br>';

            }
        }
    }
}

// Cherche dans la base de donnée les doublons de publication. Puis on les supprime jusqu'à avoir un exemplaire de chaque publications
function suppr_doublon($BD, $type)
{
    $requete_cherche_doublons = 'SELECT count(*) as nb_doublons,' . $type . ' FROM (SELECT * FROM publications) AS t2 '
        . ' GROUP BY ' . $type . ' HAVING COUNT(*) > 1';

    $result_cherche_doublons = mysqli_query($BD, $requete_cherche_doublons);


    if ($result_cherche_doublons) {
        echo 'requete cherche doublons reussi', '<br>';
    } else {
        echo 'requete cherche doublons pas reussi : ' . $result_cherche_doublons, '<br>';
    }

    while ($tabResult = mysqli_fetch_assoc($result_cherche_doublons)) {
        for ($i = 0; $i < $tabResult['nb_doublons'] - 1; $i += 1) {
            $requete_suppr_doublons = 'delete from publications where id in (select max(id) from (SELECT * FROM publications)
            AS t1 where ' . $type . '=\'' . $tabResult[$type] . '\')';
            if (mysqli_query($BD, $requete_suppr_doublons)) {
                echo 'requete suppr doublons reussi', '<br>';
            } else {
                echo 'requete suppr doublons pas reussi : ' . $requete_suppr_doublons, '<br>';
            }
        }
    }
}

foreach ($tabPermanents as $name) {
    if (isset($name[1])) {
        getPublications($BD, str_replace(' ', '%', $name[0]));
    }
}


suppr_doublon($BD, 'doc_id');


echo 'fini';


/*
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($publications);*/

