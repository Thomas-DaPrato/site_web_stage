/*
* Fonction permettant de récuperer toutes les publications stockés dans une base de donnée et de les afficher sur la page index.html
* Fonction qui utilise une requête ajax vers le fichier php publicationBD_to_json.php et qui reçoit un tableau au format json contenant toutes les publications ainsi que leur informations
* */
(function () {
    "use strict";

    $(() => {
        $.ajax({
            url: "php/publicationBD_to_json.php",
            type: "get",
            dataType: "json"
        }).done(function (data) {
            let annee = data["anneeMax"];

            let $annee_N = $('#annee_N').append($('<h3/>').append(annee));
            let $annee_N_1 = $('#annee_N-1').append($('<h3/>').append(annee - 1));
            let $annee_N_2 = $('#annee_N-2').append($('<h3/>').append(annee - 2));
            let $annee_N_3 = $('#annee_N-3').append($('<h3/>').append(annee - 3));
            let $annee_N_4 = $('#annee_N-4').append($('<h3/>').append(annee - 4));
            let $annee_N_5 = $('#annee_N-5').append($('<h3/>').append(annee - 5));
            let $avant_annee_N_5 = $('#avant_annee_N-5').append($('<h3 id="titre_avant_annee_N-5"/>').append($('<span id="paragraphe_avant_annee_n-5"/>').append('Avant'),' ', annee - 5));

            let $art_annee_N = $('<div class="ART"/>').append($('<h4 id="art_annee_N"/>').append('Articles scientifiques')).hide();
            let $art_annee_N_1 = $('<div class="ART"/>').append($('<h4 id="art_annee_N_1"/>').append('Articles scientifiques')).hide();
            let $art_annee_N_2 = $('<div class="ART"/>').append($('<h4 id="art_annee_N_2"/>').append('Articles scientifiques')).hide();
            let $art_annee_N_3 = $('<div class="ART"/>').append($('<h4 id="art_annee_N_3"/>').append('Articles scientifiques')).hide();
            let $art_annee_N_4 = $('<div class="ART"/>').append($('<h4 id="art_annee_N_4"/>').append('Articles scientifiques')).hide();
            let $art_annee_N_5 = $('<div class="ART"/>').append($('<h4 id="art_annee_N_5"/>').append('Articles scientifiques')).hide();
            let $art_AvantAnnee_N_5 = $('<div class="ART"/>').append($('<h4 id="art_anneeAvant_N_5"/>').append('Articles scientifiques')).hide();

            let $comm_annee_N = $('<div class="COMM"/>').append($('<h4 id="comm_annee_N"/>').append('Conférences')).hide();
            let $comm_annee_N_1 = $('<div class="COMM"/>').append($('<h4 id="comm_annee_N_1"/>').append('Conférences')).hide();
            let $comm_annee_N_2 = $('<div class="COMM"/>').append($('<h4 id="comm_annee_N_2"/>').append('Conférences')).hide();
            let $comm_annee_N_3 = $('<div class="COMM"/>').append($('<h4 id="comm_annee_N_3"/>').append('Conférences')).hide();
            let $comm_annee_N_4 = $('<div class="COMM"/>').append($('<h4 id="comm_annee_N_4"/>').append('Conférences')).hide();
            let $comm_annee_N_5 = $('<div class="COMM"/>').append($('<h4 id="comm_annee_N_5"/>').append('Conférences')).hide();
            let $comm_AvantAnnee_N_5 = $('<div class="COMM"/>').append($('<h4 id="comm_anneeAvant_N_5"/>').append('Conférences')).hide();

            let $couv_these_annee_N = $('<div class="COUV_THESE"/>').append($('<h4 id="couv_these_annee_N"/>').append("Chapitres d'ouvrage et thèses")).hide();
            let $couv_these_annee_N_1 = $('<div class="COUV_THESE"/>').append($('<h4 id="couv_these_annee_N_1"/>').append("Chapitres d'ouvrage et thèses")).hide();
            let $couv_these_annee_N_2 = $('<div class="COUV_THESE"/>').append($('<h4 id="couv_these_annee_N_2"/>').append("Chapitres d'ouvrage et thèse")).hide();
            let $couv_these_annee_N_3 = $('<div class="COUV_THESE"/>').append($('<h4 id="couv_these_annee_N_3"/>').append("Chapitres d'ouvrage et thèses")).hide();
            let $couv_these_annee_N_4 = $('<div class="COUV_THESE"/>').append($('<h4 id="couv_these_annee_N_4"/>').append("Chapitres d'ouvrage et thèses")).hide();
            let $couv_these_annee_N_5 = $('<div class="COUV_THESE"/>').append($('<h4 id="couv_these_annee_N_5"/>').append("Chapitres d'ouvrage et thèses")).hide();
            let $couv_these_AvantAnnee_N_5 = $('<div class="COUV_THESE"/>').append($('<h4 id="couv_these_anneeAvant_N_5"/>').append("Chapitres d'ouvrage et thèses")).hide();


            //publications concernant annee N
            let $publicationsArtAnnee_N = $("<table class='liste_publication'/>");
            let $publicationsCommAnnee_N = $("<table class='liste_publication'/>");
            let $publicationsCouvTheseAnnee_N = $("<table class='liste_publication'/>");

            //publications concernant annee N-1
            let $publicationsArtAnnee_N_1 = $("<table class='liste_publication'/>");
            let $publicationsCommAnnee_N_1 = $("<table class='liste_publication'/>");
            let $publicationsCouvTheseAnnee_N_1 = $("<table class='liste_publication'/>");

            //publications concernant annee N-2
            let $publicationsArtAnnee_N_2 = $("<table class='liste_publication'/>");
            let $publicationsCommAnnee_N_2 = $("<table class='liste_publication'/>");
            let $publicationsCouvTheseAnnee_N_2 = $("<table class='liste_publication'/>");

            //publications concernant annee N-3
            let $publicationsArtAnnee_N_3 = $("<table class='liste_publication'/>");
            let $publicationsCommAnnee_N_3 = $("<table class='liste_publication'/>");
            let $publicationsCouvTheseAnnee_N_3 = $("<table class='liste_publication'/>");

            //publications concernant annee N-4
            let $publicationsArtAnnee_N_4 = $("<table class='liste_publication'/>");
            let $publicationsCommAnnee_N_4 = $("<table class='liste_publication'/>");
            let $publicationsCouvTheseAnnee_N_4 = $("<table class='liste_publication'/>");

            //publications concernant annee N-5
            let $publicationsArtAnnee_N_5 = $("<table class='liste_publication'/>");
            let $publicationsCommAnnee_N_5 = $("<table class='liste_publication'/>");
            let $publicationsCouvTheseAnnee_N_5 = $("<table class='liste_publication'/>");

            //publications concernant avant N-5
            let $publicationsArtAvantAnnee_N_5 = $("<table class='liste_publication'/>");
            let $publicationsCommAvantAnnee_N_5 = $("<table class='liste_publication'/>");
            let $publicationsCouvTheseAvantAnnee_N_5 = $("<table class='liste_publication'/>");

            for (let publication in data) {
                let $tr = $("<tr />");
                let $a = $('<a />').attr('target', 'blank').attr("class", "lien_publication_to_hal");
                let $img = $('<a />').attr('target', 'blank');
                if (data.hasOwnProperty(publication)) {
                    if (data[publication].hasOwnProperty('doi')) {
                        if (typeof (data[publication]['doi']) != 'object') {
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
                    if (data[publication].hasOwnProperty('lien_fichier') && typeof (data[publication]['lien_fichier']) != 'object') {
                        $img.attr('href',data[publication]['lien_fichier']).append($('<img />').attr('src','/site_web_stage/img/document.jpg').attr('alt', 'photo document').attr('class', 'img_doc_publication'));
                    }

                    $tr.append($('<td id="td_informations_publication"/>').append($a),$('<td id="td_fichier_publication"/>').append($img));
                    switch (data[publication]['annee']) {
                        case annee.toString():
                            switch (data[publication]['docType']) {
                                case 'ART' :
                                    $publicationsArtAnnee_N.append($tr);
                                    $art_annee_N.show();
                                    break;
                                case 'COMM' :
                                    $publicationsCommAnnee_N.append($tr);
                                    $comm_annee_N.show();
                                    break;
                                default :
                                    $publicationsCouvTheseAnnee_N.append($tr);
                                    $couv_these_annee_N.show()
                            }
                            break;
                        case (annee - 1).toString():
                            switch (data[publication]['docType']) {
                                case 'ART' :
                                    $publicationsArtAnnee_N_1.append($tr);
                                    $art_annee_N_1.show();
                                    break;
                                case 'COMM' :
                                    $publicationsCommAnnee_N_1.append($tr);
                                    $comm_annee_N_1.show();
                                    break;
                                default :
                                    $publicationsCouvTheseAnnee_N_1.append($tr);
                                    $couv_these_annee_N_1.show()
                            }
                            break;
                        case (annee - 2).toString():
                            switch (data[publication]['docType']) {
                                case 'ART' :
                                    $publicationsArtAnnee_N_2.append($tr);
                                    $art_annee_N_2.show();
                                    break;
                                case 'COMM' :
                                    $publicationsCommAnnee_N_2.append($tr);
                                    $comm_annee_N_2.show();
                                    break;
                                default :
                                    $publicationsCouvTheseAnnee_N_2.append($tr);
                                    $couv_these_annee_N_2.show()
                            }
                            break;
                        case (annee - 3).toString():
                            switch (data[publication]['docType']) {
                                case 'ART' :
                                    $publicationsArtAnnee_N_3.append($tr);
                                    $art_annee_N_3.show();
                                    break;
                                case 'COMM' :
                                    $publicationsCommAnnee_N_3.append($tr);
                                    $comm_annee_N_3.show();
                                    break;
                                default :
                                    $publicationsCouvTheseAnnee_N_3.append($tr);
                                    $couv_these_annee_N_3.show()
                            }
                            break;
                        case (annee - 4).toString():
                            switch (data[publication]['docType']) {
                                case 'ART' :
                                    $publicationsArtAnnee_N_4.append($tr);
                                    $art_annee_N_4.show();
                                    break;
                                case 'COMM' :
                                    $publicationsCommAnnee_N_4.append($tr);
                                    $comm_annee_N_4.show();
                                    break;
                                default :
                                    $publicationsCouvTheseAnnee_N_4.append($tr);
                                    $couv_these_annee_N_4.show()
                            }
                            break;
                        case (annee - 5).toString():
                            switch (data[publication]['docType']) {
                                case 'ART' :
                                    $publicationsArtAnnee_N_5.append($tr);
                                    $art_annee_N_5.show();
                                    break;
                                case 'COMM' :
                                    $publicationsCommAnnee_N_5.append($tr);
                                    $comm_annee_N_5.show();
                                    break;
                                default :
                                    $publicationsCouvTheseAnnee_N_5.append($tr);
                                    $couv_these_annee_N_5.show()
                            }
                            break;
                        default:
                            switch (data[publication]['docType']) {
                                case 'ART' :
                                    $publicationsArtAvantAnnee_N_5.append($tr);
                                    $art_AvantAnnee_N_5.show();
                                    break;
                                case 'COMM' :
                                    $publicationsCommAvantAnnee_N_5.append($tr);
                                    $comm_AvantAnnee_N_5.show();
                                    break;
                                default :
                                    $publicationsCouvTheseAvantAnnee_N_5.append($tr);
                                    $couv_these_AvantAnnee_N_5.show()
                            }
                    }
                }
            }

            $art_annee_N.append($publicationsArtAnnee_N);
            $art_annee_N_1.append($publicationsArtAnnee_N_1);
            $art_annee_N_2.append($publicationsArtAnnee_N_2);
            $art_annee_N_3.append($publicationsArtAnnee_N_3);
            $art_annee_N_4.append($publicationsArtAnnee_N_4);
            $art_annee_N_5.append($publicationsArtAnnee_N_5);
            $art_AvantAnnee_N_5.append($publicationsArtAvantAnnee_N_5);

            $comm_annee_N.append($publicationsCommAnnee_N);
            $comm_annee_N_1.append($publicationsCommAnnee_N_1);
            $comm_annee_N_2.append($publicationsCommAnnee_N_2);
            $comm_annee_N_3.append($publicationsCommAnnee_N_3);
            $comm_annee_N_4.append($publicationsCommAnnee_N_4);
            $comm_annee_N_5.append($publicationsCommAnnee_N_5);
            $comm_AvantAnnee_N_5.append($publicationsCommAvantAnnee_N_5);

            $couv_these_annee_N.append($publicationsCouvTheseAnnee_N);
            $couv_these_annee_N_1.append($publicationsCouvTheseAnnee_N_1);
            $couv_these_annee_N_2.append($publicationsCouvTheseAnnee_N_2);
            $couv_these_annee_N_3.append($publicationsCouvTheseAnnee_N_3);
            $couv_these_annee_N_4.append($publicationsCouvTheseAnnee_N_4);
            $couv_these_annee_N_5.append($publicationsCouvTheseAnnee_N_5);
            $couv_these_AvantAnnee_N_5.append($publicationsCouvTheseAvantAnnee_N_5);

            $annee_N.append($art_annee_N, $comm_annee_N, $couv_these_annee_N);
            $annee_N_1.append($art_annee_N_1, $comm_annee_N_1, $couv_these_annee_N_1);
            $annee_N_2.append($art_annee_N_2, $comm_annee_N_2, $couv_these_annee_N_2);
            $annee_N_3.append($art_annee_N_3, $comm_annee_N_3, $couv_these_annee_N_3);
            $annee_N_4.append($art_annee_N_4, $comm_annee_N_4, $couv_these_annee_N_4);
            $annee_N_5.append($art_annee_N_5, $comm_annee_N_5, $couv_these_annee_N_5);
            $avant_annee_N_5.append($art_AvantAnnee_N_5, $comm_AvantAnnee_N_5, $couv_these_AvantAnnee_N_5);

        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("une erreur est survenue avec l'ajout des publications");
            let msg = jqXHR.responseText + '\n' + textStatus + '\n' + errorThrown
            console.log(msg);
        })
    })
})()