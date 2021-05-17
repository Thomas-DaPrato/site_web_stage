(function () {
    "use strict";

    $(() => {
        $.ajax({
            url: "../php/publicationBD_to_json.php",
            type: "get",
            dataType: "json"
        }).done(function (data) {
            let annee = data["anneeMax"];

            let $publication_annee = $('#publication_annee');
            $publication_annee.append($('<a />').attr('href','publications/publications_annee.html?annee='+annee).append(annee));
            $publication_annee.append($('<a />').attr('href','publications/publications_annee.html?annee='+(annee-1)).append(annee-1));
            $publication_annee.append($('<a />').attr('href','publications/publications_annee.html?annee='+(annee-2)).append(annee-2));
            $publication_annee.append($('<a />').attr('href','publications/publications_annee.html?annee='+(annee-3)).append(annee-3));
            $publication_annee.append($('<a />').attr('href','publications/publications_annee.html?annee='+(annee-4)).append(annee-4));
            $publication_annee.append($('<a />').attr('href','publications/publications_annee.html?annee='+(annee-5)).append(annee-5));
            $publication_annee.append($('<a />').attr('href','publications/publications_annee.html?annee=avant_'+(annee-5)).append("Avant ",annee-5));

            let $annee_N = $('#annee_N').append(annee);
            let $annee_N_1 = $('#annee_N-1').append(annee-1);
            let $annee_N_2 = $('#annee_N-2').append(annee-2);
            let $annee_N_3 = $('#annee_N-3').append(annee-3);
            let $annee_N_4 = $('#annee_N-4').append(annee-4);
            let $annee_N_5 = $('#annee_N-5').append(annee-5);
            let $avant_annee_N_5 = $('#avant_annee_N-5').append('avant ',annee-5);

            let $publicationsAnnee_N = $("<ul class='liste_publication'/>");
            let $publicationsAnnee_N_1 = $("<ul class='liste_publication'/>");
            let $publicationsAnnee_N_2 = $("<ul class='liste_publication'/>");
            let $publicationsAnnee_N_3 = $("<ul class='liste_publication'/>");
            let $publicationsAnnee_N_4 = $("<ul class='liste_publication'/>");
            let $publicationsAnnee_N_5 = $("<ul class='liste_publication'/>");
            let $publicationsAvantAnnee_N_5 = $("<ul class='liste_publication'/>");

            for (let publication in data){
                if(publication != "anneeMax") {
                    let $li = $("<li />");
                    let $a = $('<a />').attr('href','https://hal.archives-ouvertes.fr/'+data[publication]['id_hal'])
                        .attr('target','blank');
                    if(data.hasOwnProperty(publication) ) {
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
                    }
                    $li.append($a);
                    switch (data[publication]['annee']) {
                        case annee.toString():
                            $publicationsAnnee_N.append($li);
                            break;
                        case (annee-1).toString():
                            $publicationsAnnee_N_1.append($li);
                            break;
                        case (annee-2).toString():
                            $publicationsAnnee_N_2.append($li);
                            break;
                        case (annee-3).toString():
                            $publicationsAnnee_N_3.append($li);
                            break;
                        case (annee-4).toString():
                            $publicationsAnnee_N_4.append($li);
                            break;
                        case (annee-5).toString():
                            $publicationsAnnee_N_5.append($li);
                            break;
                        default:
                            $publicationsAvantAnnee_N_5.append($li);
                    }
                }
            }

            $annee_N.append($publicationsAnnee_N);
            $annee_N_1.append($publicationsAnnee_N_1);
            $annee_N_2.append($publicationsAnnee_N_2);
            $annee_N_3.append($publicationsAnnee_N_3);
            $annee_N_4.append($publicationsAnnee_N_4);
            $annee_N_5.append($publicationsAnnee_N_5);
            $avant_annee_N_5.append($publicationsAvantAnnee_N_5);

        }).fail(function (jqXHR,textStatus, errorThrown) {
            alert("une erreur est survenue avec l'ajout des publications");
            let msg = jqXHR.responseText + '\n'+ textStatus + '\n' + errorThrown
            console.log(msg);
        })
    })
}) ()