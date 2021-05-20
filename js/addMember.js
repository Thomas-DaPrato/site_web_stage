/*
* Fonction permettant de récuperer les membres de l'année en cours stockés dans un fichier au format txt et de les afficher sur la page index.html
* Fonction qui utilise une requête ajax vers le fichier php getMember.php et qui reçoit un tableau au format json contenant tous les membres de l'année en cours
* */
(function () {
    "use strict";

    $(() => {
        $.ajax({
            url: "php/getMember.php",
            type: "get",
            dataType: "json"
        }).done(function (data) {
            let $listeMembre = $('.liste_membre');
            for (let key in data) {
                let $li = $("<li />");
                if (data.hasOwnProperty(key)){
                    $li.append(data[key]);
                }
                $listeMembre.append($li);
            }
        }).fail(function (jqXHR,textStatus, errorThrown) {
            alert("une erreur est survenue avec l'ajout des membres");
            let msg = jqXHR.responseText + '\n'+ textStatus + '\n' + errorThrown
            console.log(msg);
        })
    })
}) ()