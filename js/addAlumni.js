(function () {
    $.ajax({
        url: '../../php/getAlumni.php',
        method: 'get',
        dataType: 'json'
    }).done(function (data) {
        let $membre_alumni = $(".membre_alumni");
        for (let name in data) {
            let $li = $("<li />");

            let $div_info = $('<div class="information_alumni"/>');
            if (data.hasOwnProperty(name)) {
                if (data[name].hasOwnProperty("photo")) {
                    if (data[name]["photo"] == '') {
                        $li.append($('<img />').attr('src', '../../img/photo_anonyme.jpg').attr('class', 'img_profil').attr('alt', 'photo de la personne'));
                    } else {
                        $li.append($('<img />').attr('src', '../../img/' + data[name]["photo"]).attr('class', 'img_profil').attr('alt', 'photo de la personne'));
                    }
                }
                $div_info.append($("<strong />").append(name));
                if (data[name].hasOwnProperty("Mission") && data[name]["Mission"] != '') {
                    $div_info.append(', ', data[name]["Mission"]);
                }
                if (data[name].hasOwnProperty("Sujet") && data[name]["Sujet"] != '') {
                    $div_info.append(', ', data[name]["Sujet"]);
                }
                if (data[name].hasOwnProperty("Date") && data[name]["Date"] != '') {
                    $div_info.append(', ', data[name]["Date"]);
                }

                $li.append($div_info);
            }
            $membre_alumni.append($li);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("une erreur est survenue avec l'ajout des membres alumni");
        let msg = jqXHR.responseText + '\n' + textStatus + '\n' + errorThrown
        console.log(msg);
    })
})()