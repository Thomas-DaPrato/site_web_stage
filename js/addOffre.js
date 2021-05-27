/*
* Fonction permettant de récuperer les offres stockés dans un fichier au format csv et de les afficher sur la page index.html
* Fonction qui utilise une requête ajax vers le fichier php getOffre.php et qui reçoit un tableau au format json contenant toutes les offres aisni que leur informations
* */
(function () {
    $.ajax({
        url: 'php/getOffre.php',
        method: 'get',
        dataType: 'json'
    }).done(function (data) {
        let $offre_stage_these = $(".offre_stage_these");
        for (let offre in data) {
            let $li = $("<li />");
            let $div_info = $('<div class="information_offre"/>');
            if (data.hasOwnProperty(offre)) {
                $div_info.append($("<strong />").append(offre, '<br>'));
                if (data[offre].hasOwnProperty("Sujet")) {
                    $div_info.append($("<p/>").append("Sujet : ",data[offre]["Sujet"], '<br>'));
                }
                if (data[offre].hasOwnProperty("Date limite de candidature")) {
                    $div_info.append($("<p/>").append("Date limite de candidature : ",data[offre]["Date limite de candidature"], '<br>'));
                }
                if (data[offre].hasOwnProperty("Descriptif") && data[offre]["Descriptif"] != '') {
                    $div_info.append("Descriptif : ",$('<a />').attr('href', 'offre/' + data[offre]["Descriptif"] + '.pdf')
                        .append($('<img />').attr('src', 'img/document.jpg').attr('alt', 'photo document').attr('class', 'img_doc')), '<br>')
                } else {
                    $div_info.append('Aucun descriptif donné', '<br>');
                }
                if (data[offre].hasOwnProperty("Contact")) {
                    $div_info.append("Contact : ",$('<a />').attr('href','mailto:'+data[offre]["Contact"]).attr("class","lien_contact").append(data[offre]["Contact"]));
                }
                $li.append($div_info);
            }
            $offre_stage_these.append($li);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("une erreur est survenue avec l'ajout des offres");
        let msg = jqXHR.responseText + '\n' + textStatus + '\n' + errorThrown
        console.log(msg);
    })
})()