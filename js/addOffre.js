(function () {
    $.ajax({
        url: '../php/getOffre.php',
        method: 'get',
        dataType : 'json'
    }).done(function (data) {
        let $offre_stage_these = $(".offre_stage_these");
        for (let offre in data){
            let $li = $("<li />");
            $li.append($("<strong />").append(offre,'<br>'));
            let $div_info = $('<div class="information_alumni"/>');
            if (data.hasOwnProperty(offre)) {
                for (let infomartions in data[offre]){
                    if (data[offre].hasOwnProperty(infomartions)){
                        if (infomartions == 'Descriptif') {
                            $div_info.append($('<a />').attr('href','../offre/'+data[offre][infomartions]+'.pdf')
                                .append(data[offre][infomartions]),'<br>');
                        }
                        else {
                            $div_info.append(data[offre][infomartions],'<br>');
                        }

                    }
                    $li.append($div_info);
                }
            }
            $offre_stage_these.append($li);
        }
    }).fail(function (jqXHR,textStatus, errorThrown) {
        alert("une erreur est survenue avec l'ajout des offres");
        let msg = jqXHR.responseText + '\n'+ textStatus + '\n' + errorThrown
        console.log(msg);
    })
}) ()