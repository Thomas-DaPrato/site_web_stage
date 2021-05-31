/*
* Fonction permettant de récuperer les publications d'une année précise stockés dans une base de donnée et de les afficher sur la page publications_annee.html
* Fonction qui utilise une requête ajax vers le fichier php getPublicationsAnnee.php et qui reçoit un tableau au format json contenant toutes les publications de l'année sélectionnée ainsi que leur informations
* */
(function () {
    "use strict";

    let annee_url = document.location.href.split('=')[1];
    annee_url = annee_url.split('_');

    if (annee_url.length < 2) {

        $('#annee_publication').append(" de ", annee_url[0]);
    } else {
        $('#annee_publication').append(' ', annee_url[0], ' ', annee_url[1]);
    }

    $(() => {
        $.ajax({
            url: "../php/getPublicationsAnnee.php",
            type: "get",
            data: "annee=" + document.location.href.split('=')[1],
            dataType: "json"
        }).done(function (data) {
            let $publicationsAnnee = $("#liste_publications_annee");

            let $publicationsArtAnnee = $("<ul class='liste_publication'/>");
            let $publicationsCommAnnee = $("<ul class='liste_publication'/>");
            let $publicationsCouvTheseAnnee = $("<ul class='liste_publication'/>");

            let $art_annee = $('<div class="ART"/>').append($('<h4 id="art_annee"/>').append('Articles scientifiques')).hide();
            let $comm_annee = $('<div class="COMM"/>').append($('<h4 id="comm_annee"/>').append('Conférences')).hide();
            let $couv_these_annee = $('<div class="COUV_THESE"/>').append($('<h4 id="couv_these_annee"/>').append("Chapitres d'ouvrage et thèses")).hide();

            for (let publication in data) {
                let $li = $("<li />");
                let $a = $('<a />').attr('target', 'blank').attr("class", "lien_publication_to_hal");
                if (data.hasOwnProperty(publication)) {
                    if (data[publication].hasOwnProperty('lien_fichier')) {
                        if (typeof (data[publication]['lien_fichier']) != 'object') {
                            $a.attr('href', data[publication]['lien_fichier']);
                        } else if (data[publication].hasOwnProperty('doi') && typeof (data[publication]['doi']) != 'object') {
                            $a.attr('href', 'https://dx.doi.org/' + data[publication]['doi']);
                        } else {
                            $a.attr('href', 'https://hal.archives-ouvertes.fr/' + data[publication]['id_hal']);
                        }
                    }
                    if (data[publication].hasOwnProperty('auteurs') && typeof (data[publication]['auteur']) != 'object') {
                        $a.append(data[publication]['auteurs'], ' ');
                    }
                    if (data[publication].hasOwnProperty('titre') && typeof (data[publication]['titre']) != 'object') {
                        $a.append(data[publication]['titre'], '. ');
                    }
                    if (data[publication].hasOwnProperty('titreRevue') && typeof (data[publication]['titreRevue']) != 'object') {
                        $a.append(data[publication]['titreRevue'], ', ');
                    }
                    if (data[publication].hasOwnProperty('editeurRevue') && typeof (data[publication]['editeurRevue']) != 'object') {
                        $a.append(data[publication]['editeurRevue'], ', ');
                    }
                    if (data[publication].hasOwnProperty('annee') && typeof (data[publication]['annee']) != 'object') {
                        $a.append(data[publication]['annee'], ', ');
                    }
                    if (data[publication].hasOwnProperty('volume') && typeof (data[publication]['volume']) != 'object') {
                        $a.append(data[publication]['volume'], ', ');
                    }
                    if (data[publication].hasOwnProperty('page') && typeof (data[publication]['page']) != 'object') {
                        $a.append('pp.', data[publication]['page'], '. ');
                    }
                    if (data[publication].hasOwnProperty('doi') && typeof (data[publication]['doi']) != 'object') {
                        $a.append('&#x27E8;', data[publication]['doi'], '&#x27E9;');
                    }
                    if (data[publication].hasOwnProperty('docType') && typeof (data[publication]['docType']) != 'object') {
                        $a.append('    ', data[publication]['docType']);
                    }
                }
                $li.append($a);
                switch (data[publication]['docType']) {
                    case 'ART' :
                        $publicationsArtAnnee.append($li);
                        $art_annee.show();
                        break;
                    case 'COMM' :
                        $publicationsCommAnnee.append($li);
                        $comm_annee.show();
                        break;
                    default :
                        $publicationsCouvTheseAnnee.append($li);
                        $couv_these_annee.show()
                }
                $art_annee.append($publicationsArtAnnee);
                $comm_annee.append($publicationsCommAnnee);
                $couv_these_annee.append($publicationsCouvTheseAnnee);

                $publicationsAnnee.append($art_annee,$comm_annee,$couv_these_annee);
            }

        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("une erreur est survenue avec l'ajout des publications");
            let msg = jqXHR.responseText + '\n' + textStatus + '\n' + errorThrown
            console.log(msg);
        })
    })
})()