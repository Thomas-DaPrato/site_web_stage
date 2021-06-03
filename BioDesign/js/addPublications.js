/*
* Fonction permettant de récuperer toutes les publications stockés dans une base de donnée et de les afficher sur la page index.html
* Fonction qui utilise une requête ajax vers le fichier php publicationBD_to_json.php et qui reçoit un tableau au format json contenant toutes les publications ainsi que leur informations
* */
(function () {
    "use strict";

    $(() => {
        $.ajax({
            url: "php/getPublications.php",
            type: "get",
            dataType: "json"
        }).done(function (data) {
            let $publications = $('<table class="liste_publication"/>');
            for (let publication in data) {
                let $tr = $("<tr />");
                let $a = $('<a />').attr('target', 'blank').attr("class", "lien_publication_to_hal");
                let $img = $('<a />').attr('target', 'blank');
                if (data.hasOwnProperty(publication)) {
                    if (data[publication].hasOwnProperty('doi')) {
                        if (data[publication]['doi'] != '') {
                            $a.attr('href', 'https://dx.doi.org/' + data[publication]['doi']);
                        } else {
                            $a.attr('href', 'https://hal.archives-ouvertes.fr/' + data[publication]['id_hal']);
                        }
                    }
                    if (data[publication].hasOwnProperty('citation') && data[publication]['citation'] != '') {
                        $a.append(data[publication]['citation'], ' ');
                    }

                    if (data[publication].hasOwnProperty('lien_fichier') && data[publication]['lien_fichier'] != '') {
                        $img.attr('href', data[publication]['lien_fichier']).append($('<img />').attr('src', '/site_web_stage/img/document.jpg').attr('alt', 'photo document').attr('class', 'img_doc_publication'));
                    }

                    $tr.append($('<td id="td_informations_publication"/>').append($a), $('<td id="td_fichier_publication"/>').append($img));
                }
                $publications.append($tr);
            }
            $('#publications').append($publications);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("une erreur est survenue avec l'ajout des publications");
            let msg = jqXHR.responseText + '\n' + textStatus + '\n' + errorThrown
            console.log(msg);
        })
    })
})()