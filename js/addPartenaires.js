(function () {
    $.ajax({
        url :'php/getPartenaires.php',
        method : 'get',
        dataType :'json'
    }).done(function (data) {
        let $collaborationsUniversitaire = $('#collaborations_universitaires');
        let $collaborationsRechercheAppliques = $('#collaborations_recherche_appliques');
        let $professeurInvite = $('#professeur_invite');


        for (let typePartenaire in data) {
            if (data.hasOwnProperty(typePartenaire)) {
                for (let partenaire in data[typePartenaire]) {
                    let $li = $('<li />');
                    let $divInfoPartenaire = $('<div class="div_info_partenaires"/>');
                    if (data[typePartenaire].hasOwnProperty(partenaire)) {
                        if (data[typePartenaire][partenaire].hasOwnProperty('logo')){
                            $li.append($('<img class="img_logo"/>').attr('src','img/logos/'+data[typePartenaire][partenaire]['logo']).attr('alt','logo'));
                        }
                        if (data[typePartenaire][partenaire].hasOwnProperty('université')){
                            $divInfoPartenaire.append(data[typePartenaire][partenaire]['université']);
                        }
                        if (data[typePartenaire][partenaire].hasOwnProperty('localisation')){
                            $divInfoPartenaire.append($('<br>'), data[typePartenaire][partenaire]['localisation']);
                        }
                        if (data[typePartenaire][partenaire].hasOwnProperty('responsable')){
                            $divInfoPartenaire.append($('<br>'), data[typePartenaire][partenaire]['responsable']);
                        }
                        if (data[typePartenaire][partenaire].hasOwnProperty('nom')){
                            $divInfoPartenaire.append(data[typePartenaire][partenaire]['nom']);
                        }
                        if (data[typePartenaire][partenaire].hasOwnProperty('Professeur')){
                            $li.append(data[typePartenaire][partenaire]['Professeur']);
                        }
                        $li.append($divInfoPartenaire);
                    }
                    switch (typePartenaire) {
                        case 'Collaborations universitaires' :
                            $collaborationsUniversitaire.append($li);
                            break;
                        case 'Collaborations recherche apliquées' :
                            $collaborationsRechercheAppliques.append($li);
                            break;
                        default :
                            $professeurInvite.append($li);
                    }
                }
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("une erreur est survenue avec l'ajout des membres");
        let msg = jqXHR.responseText + '\n' + textStatus + '\n' + errorThrown
        console.log(msg);
    })
})()