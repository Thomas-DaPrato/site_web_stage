/*
* Fonction permettant de récuperer les publications d'une année précise stockés dans une base de donnée et de les afficher sur la page publications_annee.html
* Fonction qui utilise une requête ajax vers le fichier php getPublicationsAnnee.php et qui reçoit un tableau au format json contenant toutes les publications de l'année sélectionnée ainsi que leur informations
* */
(function () {
    "use strict";

    let annee_url = document.location.href.split('=')[1];
    annee_url = annee_url.split('_');

    if (annee_url.length < 2) {

        $('#annee_publication').append(" de ",annee_url[0]);
    }
    else {
        $('#annee_publication').append(' ',annee_url[0],' ',annee_url[1]);
    }

    $(() => {
        $.ajax({
            url: "../php/getPublicationsAnnee.php",
            type: "get",
            data: "annee="+document.location.href.split('=')[1],
            dataType: "json"
        }).done(function (data) {
            let annee = data["anneeMax"];

            let $publication_annee = $('#publication_annee');
            $publication_annee.append($('<a />').attr('href','publications_annee.html?annee='+annee).append(annee));
            $publication_annee.append($('<a />').attr('href','publications_annee.html?annee='+(annee-1)).append(annee-1));
            $publication_annee.append($('<a />').attr('href','publications_annee.html?annee='+(annee-2)).append(annee-2));
            $publication_annee.append($('<a />').attr('href','publications_annee.html?annee='+(annee-3)).append(annee-3));
            $publication_annee.append($('<a />').attr('href','publications_annee.html?annee='+(annee-4)).append(annee-4));
            $publication_annee.append($('<a />').attr('href','publications_annee.html?annee='+(annee-5)).append(annee-5));
            $publication_annee.append($('<a />').attr('href','publications_annee.html?annee=avant_'+(annee-5)).append("Avant ",annee-5));

            let $publicationsAnnee = $(".liste_publication");
            for (let publication in data){
                if (publication != "anneeMax") {
                    let $li = $("<li />");
                    let $a = $('<a />').attr('href','https://hal.archives-ouvertes.fr/'+data[publication]['id_hal'])
                        .attr('target','blank');
                    if(data.hasOwnProperty(publication)){
                        if (data[publication].hasOwnProperty('auteurs') && typeof (data[publication]['auteur']) != 'object'){
                            if (data[publication]['auteurs'].length < 100){
                                $a.append(data[publication]['auteurs'], ' ');
                            }
                            else {
                                $a.append(data[publication]['auteurs'].substring(0,data[publication]['auteurs'].indexOf(',',100)-1),' et al.', ' ');
                            }
                        }
                        if (data[publication].hasOwnProperty('titre') && typeof (data[publication]['titre']) != 'object'){
                            $a.append(data[publication]['titre'],'. ');
                        }
                        if (data[publication].hasOwnProperty('titreRevue') && typeof (data[publication]['titreRevue']) != 'object'){
                            $a.append(data[publication]['titreRevue'],', ');
                        }
                        if (data[publication].hasOwnProperty('editeurRevue') && typeof (data[publication]['editeurRevue']) != 'object'){
                            $a.append(data[publication]['editeurRevue'],', ');
                        }
                        if (data[publication].hasOwnProperty('annee') && typeof (data[publication]['annee']) != 'object'){
                            $a.append(data[publication]['annee'],', ');
                        }
                        if (data[publication].hasOwnProperty('volume') && typeof (data[publication]['volume']) != 'object'){
                            $a.append(data[publication]['volume'],', ');
                        }
                        if (data[publication].hasOwnProperty('page') && typeof (data[publication]['page']) != 'object'){
                            $a.append('pp.',data[publication]['page'],'. ');
                        }
                        if (data[publication].hasOwnProperty('doi') && typeof (data[publication]['doi']) != 'object'){
                            $a.append('&#x27E8;',data[publication]['doi'],'&#x27E9;');
                        }
                    }
                    $li.append($a);
                    $publicationsAnnee.append($li);
                }

            }

        }).fail(function (jqXHR,textStatus, errorThrown) {
            alert("une erreur est survenue avec l'ajout des publications");
            let msg = jqXHR.responseText + '\n'+ textStatus + '\n' + errorThrown
            console.log(msg);
        })
    })
}) ()