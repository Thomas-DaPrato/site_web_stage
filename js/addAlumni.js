/*
* Fonction permettant de récuperer les membres alumnis stockés dans un fichier au format csv et de les afficher sur la page alumni.html
* Fonction qui utilise une requête ajax vers le fichier php getAlumni.php et qui reçoit un tableau au format json contenant tous les membres alumnis
* */
function addAlumni(langue) {
    $.ajax({
        url: 'php/getAlumni.php',
        method: 'get',
        data: 'langueAlumni=' + langue,
        dataType: 'json'
    }).done(function (data) {
        let $membre_actuels = $(".membres_actuels").empty();
        let $ancien_membres = $('.ancien_membres').empty();
        let $liste_membre = $('.liste_membre').empty();
        for (let name in data) {
            let $liActuel = $("<li />");
            let $li = $("<li />");
            let $tr1 = $('<tr class="tr_normal"/>');
            let $tr2 = $('<tr class="tr_responsive"/>');
            let $div_info = $('<div class="information_alumni"/>');

            if (data.hasOwnProperty(name)) {
                if (data[name].hasOwnProperty("Ancien") && data[name]["Ancien"] != 'oui') {

                    $li.append(name);
                    $liste_membre.append($li);

                    if (data[name].hasOwnProperty("Photo")) {
                        if (data[name]["Photo"] == '') {
                            $liActuel.append($('<img />').attr('src', 'img/membres/photo_anonyme.jpg').attr('class', 'img_profil').attr('alt', 'photo de la personne'));
                        } else {
                            $.ajax({
                                url: 'php/getImage.php',
                                method: 'get',
                                data: 'nomImg=' + data[name]["Photo"],
                                dataType: 'json'
                            }).done(function (dataImg) {
                                $liActuel.prepend($('<img />').attr('src', 'img/membres/' + dataImg[0]).attr('class', 'img_profil').attr('alt', 'photo de la personne'));
                            }).fail(function (jqXHR, textStatus, errorThrown) {
                                alert("une erreur est survenue avec l'ajout des photos des membres");
                                let msg = jqXHR.responseText + '\n' + textStatus + '\n' + errorThrown
                                console.log(msg);
                            })
                        }
                    }

                    $div_info.append($("<strong />").append(name));
                    if (data[name].hasOwnProperty("Mission") && data[name]["Mission"] != '') {
                        $div_info.append('<br>', data[name]["Mission"]);
                    }
                    if (data[name].hasOwnProperty("Sujet") && data[name]["Sujet"] != '') {
                        $div_info.append('<br>', data[name]["Sujet"]);
                    }
                    if (data[name].hasOwnProperty("Date") && data[name]["Date"] != '') {
                        $div_info.append('<br>', data[name]["Date"]);
                    }
                    if (data[name].hasOwnProperty("Id ORCID") && data[name]["Id ORCID"] != '') {
                        $div_info.append('<br>', 'ORCID : ', $('<a />').attr('href', 'https://orcid.org/' + data[name]["Id ORCID"]).attr('class', 'lien_orcid').attr('target', '_blank').append(data[name]["Id ORCID"]));
                    }
                    $liActuel.append($div_info);
                    $membre_actuels.append($liActuel);
                } else {
                    $tr1.append($('<td class="td_nom" />').append($("<strong />").append(name)));
                    if (data[name].hasOwnProperty("Mission") && data[name]["Mission"] != '') {
                        $tr1.append($('<td class="td_mission" />').append(data[name]["Mission"]));
                    }
                    if (data[name].hasOwnProperty("Sujet") && data[name]["Sujet"] != '') {
                        if (window.screen.width <= 900) {
                            $tr2.append($('<td class="td_sujet" />').append(data[name]["Sujet"]));
                        } else {
                            $tr1.append($('<td class="td_sujet" />').append(data[name]["Sujet"]));
                        }
                    }
                    if (data[name].hasOwnProperty("Date") && data[name]["Date"] != '') {
                        if (window.screen.width <= 900) {
                            $tr2.append($('<td class="td_date" />').append(data[name]["Date"]));
                        } else {
                            $tr1.append($('<td class="td_date" />').append(data[name]["Date"]));
                        }
                    }
                    if (data[name].hasOwnProperty("Id ORCID") && data[name]["Id ORCID"] != '') {
                        if (window.screen.width <= 900) {
                            $tr2.append($('<td class="td_orcid"/>').append('ORCID : ', $('<a />').attr('href', 'https://orcid.org/' + data[name]["Id ORCID"]).attr('class', 'lien_orcid').attr('target', '_blank').append(data[name]["Id ORCID"])));
                        } else {
                            $tr1.append($('<td class="td_orcid"/>').append('ORCID : ', $('<a />').attr('href', 'https://orcid.org/' + data[name]["Id ORCID"]).attr('class', 'lien_orcid').attr('target', '_blank').append(data[name]["Id ORCID"])));
                        }
                    }
                    if (data[name].hasOwnProperty("Document") && data[name]["Document"] != '') {
                        if (window.screen.width <= 900) {
                            $tr2.append($('<td class="td_document" />').append($('<a />').attr('href', 'team/documents/' + data[name]["Document"] + '.pdf')
                                .attr('target', '_blank').append($('<img />').attr('src', 'img/document.jpg')
                                    .attr('alt', 'photo document').attr('class', 'img_doc_anciens_membres'))));
                        } else {
                            $tr1.append($('<td class="td_document" />').append($('<a />').attr('href', 'team/documents/' + data[name]["Document"] + '.pdf')
                                .attr('target', '_blank').append($('<img />').attr('src', 'img/document.jpg')
                                    .attr('alt', 'photo document').attr('class', 'img_doc_anciens_membres'))));
                        }
                    }
                    $ancien_membres.append($tr1, $tr2);
                }
            }


        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("une erreur est survenue avec l'ajout des membres");
        let msg = jqXHR.responseText + '\n' + textStatus + '\n' + errorThrown
        console.log(msg);
    })
}


document.getElementById('switch_langage_fr').addEventListener("click", function () {
    addAlumni("fr");
})
document.getElementById('switch_langage_en').addEventListener("click", function () {
    addAlumni("en");
})
addAlumni('fr');