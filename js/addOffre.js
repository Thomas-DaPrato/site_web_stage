/*
* Fonction permettant de récuperer les offres stockés dans un fichier au format csv et de les afficher sur la page index.html
* Fonction qui utilise une requête ajax vers le fichier php getOffre.php et qui reçoit un tableau au format json contenant toutes les offres aisni que leur informations
* */
function addOffre (langue) {
    $.ajax({
        url: 'php/getOffre.php',
        method: 'get',
        data : 'langueOffre='+langue,
        dataType: 'json'
    }).done(function (data) {
        let $offre_stage_these = $("#contenu_offres_stage_these");
        $offre_stage_these.empty();
        let $tab_offre_PostDoc = $('<table />').append($('<th/>').append($('<h3 />').append("Post Doct / ATER")));
        let $tab_offre_These = $('<table />').append($('<th/>').append($('<h3 id="titre_these"/>').append("Thèse")));
        let $tab_offre_M2 = $('<table />').append($('<th/>').append($('<h3 />').append("M2 / PFE")));
        let $tab_offre_M1 = $('<table />').append($('<th/>').append($('<h3 />').append("M1 / L3 / DUT")));


        $tab_offre_PostDoc.hide();
        $tab_offre_These.hide();
        $tab_offre_M2.hide();
        $tab_offre_M1.hide();

        if (!(data.hasOwnProperty('aucune_offre'))) {
            for (let offre in data) {
                let $tr1 = $("<tr />");
                let $tr2 = $("<tr />");
                let $Mission = $("<td class='information_offre'/>");
                let $CAL = $("<td class='information_offre'/>");
                let $Sujet = $("<td class='information_offre_sujet' rowspan='2'/>");
                let $Descriptif = $("<td rowspan='2'/>");
                if (data.hasOwnProperty(offre)) {
                    $Mission.append($("<strong />").append(offre));
                    if (data[offre].hasOwnProperty("Sujet")) {
                        $Sujet.append(data[offre]["Sujet"]);
                    }
                    if (data[offre].hasOwnProperty(Object.keys(data[offre])[1])) {
                        $CAL.append(Object.keys(data[offre])[1]," : ", data[offre][Object.keys(data[offre])[1]]);
                    }
                    if (data[offre].hasOwnProperty("Descriptif") && data[offre]["Descriptif"] != '') {
                        $Descriptif.append($('<a />').attr('href', 'offre/' + data[offre]["Descriptif"] + '.pdf').attr("target", "_blank")
                            .append($('<img />').attr('src', 'img/document.jpg').attr('alt', 'photo document').attr('class', 'img_doc_offre')))
                    } else {
                        $Descriptif.append('Aucun descriptif donné');
                    }
                    $tr1.append($Mission, $Sujet, $Descriptif);
                    $tr2.append($CAL);
                }
                if (offre.search('Postdoct') != -1 || offre.search('ATER') != -1) {
                    $tab_offre_PostDoc.append($tr1, $tr2, $("<tr/>"), $("<tr/>"));
                    $tab_offre_PostDoc.show();
                }
                if (offre.search('Thèse') != -1) {
                    $tab_offre_These.append($tr1, $tr2, $("<tr/>"), $("<tr/>"));
                    $tab_offre_These.show();
                }
                if (offre.search('M2') != -1 || offre.search('PFE') != -1) {
                    $tab_offre_M2.append($tr1, $tr2, $("<tr/>"), $("<tr/>"));
                    $tab_offre_M2.show();
                }
                if (offre.search('M1') != -1 || offre.search('L3') != -1 || offre.search('DUT') != -1) {
                    $tab_offre_M1.append($tr1, $tr2, $("<tr/>"), $("<tr/>"));
                    $tab_offre_M1.show();
                }
                $offre_stage_these.append($tab_offre_PostDoc, $tab_offre_These, $tab_offre_M2, $tab_offre_M1);
            }
        }
        else {
            $offre_stage_these.append(data['aucune_offre']);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("une erreur est survenue avec l'ajout des offres");
        let msg = jqXHR.responseText + '\n' + textStatus + '\n' + errorThrown
        console.log(msg);
    })
}

document.getElementById('switch_langage_fr').addEventListener("click", function () {
    addOffre("fr");
})
document.getElementById('switch_langage_en').addEventListener("click", function () {
    addOffre("en");
})
addOffre('fr');