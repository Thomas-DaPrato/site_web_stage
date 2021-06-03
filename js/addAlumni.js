/*
* Fonction permettant de récuperer les membres alumnis stockés dans un fichier au format csv et de les afficher sur la page alumni.html
* Fonction qui utilise une requête ajax vers le fichier php getAlumni.php et qui reçoit un tableau au format json contenant tous les membres alumnis
* */
(function () {
    $.ajax({
        url: 'php/getAlumni.php',
        method: 'get',
        dataType: 'json'
    }).done(function (data) {
        let $membre_actuels = $(".membres_actuels");
        let $ancien_membres = $('.ancien_membres');
        for (let name in data) {
            let $li = $("<li />");
            let $tr = $('<tr/>');
            let $div_info = $('<div class="information_alumni"/>');

            if (data.hasOwnProperty(name)) {
                if (data[name].hasOwnProperty("Ancien") && data[name]["Ancien"] != 'oui') {

                    if (data[name].hasOwnProperty("Photo")) {
                        if (data[name]["Photo"] == '') {
                            $li.append($('<img />').attr('src', 'img/membres/photo_anonyme.jpg').attr('class', 'img_profil').attr('alt', 'photo de la personne'));
                        } else {
                            $li.append($('<img />').attr('src', 'img/membres/' + data[name]["Photo"]).attr('class', 'img_profil').attr('alt', 'photo de la personne'));
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
                    $li.append($div_info);
                    $membre_actuels.append($li);
                }
                else {
                    $tr.append($('<td class="td_nom" />').append($("<strong />").append(name)));
                    if (data[name].hasOwnProperty("Mission") && data[name]["Mission"] != '') {
                        $tr.append($('<td class="td_mission" />').append(data[name]["Mission"]));
                    }
                    if (data[name].hasOwnProperty("Sujet") && data[name]["Sujet"] != '') {
                        $tr.append($('<td class="td_sujet" />').append(data[name]["Sujet"]));
                    }
                    if (data[name].hasOwnProperty("Date") && data[name]["Date"] != '') {
                        $tr.append($('<td class="td_date" />').append(data[name]["Date"]));
                    }
                    if (data[name].hasOwnProperty("Id ORCID") && data[name]["Id ORCID"] != '') {
                        $tr.append($('<td class="td_orcid"/>').append('ORCID : ', $('<a />').attr('href', 'https://orcid.org/' + data[name]["Id ORCID"]).attr('class', 'lien_orcid').attr('target', '_blank').append(data[name]["Id ORCID"])));
                    }
                    if (data[name].hasOwnProperty("Document") && data[name]["Document"] != '') {
                        $tr.append($('<td class="td_document" />').append($('<a />').attr('href', 'team/documents/' + data[name]["Document"] + '.pdf')
                            .attr('target', '_blank').append($('<img />').attr('src', 'img/document.jpg')
                                .attr('alt', 'photo document').attr('class', 'img_doc_offre'))));
                    }
                     $ancien_membres.append($tr);
                }
            }


        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("une erreur est survenue avec l'ajout des membres");
        let msg = jqXHR.responseText + '\n' + textStatus + '\n' + errorThrown
        console.log(msg);
    })
})()