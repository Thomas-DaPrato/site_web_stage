(function () {
    $.ajax({
        url: '../../php/getAlumni.php',
        method: 'get',
        dataType : 'json'
    }).done(function (data) {
        console.log(data);
        let $membre_alumni = $(".membre_alumni");
        for (let name in data){
            let $li = $("<li />");
            $li.append($("<strong />").append(name,'<br>'));
            let $div_info = $('<div class="information_alumni"/>');
            if (data.hasOwnProperty(name)) {
                for (let infomartions in data[name]){
                    if (data[name].hasOwnProperty(infomartions)){
                        $div_info.append(data[name][infomartions],'<br>')
                    }
                    $li.append($div_info)
                }
            }
            $membre_alumni.append($li);
        }
    }).fail(function (jqXHR,textStatus, errorThrown) {
        alert("une erreur est survenue avec l'ajout des membres alumni");
        let msg = jqXHR.responseText + '\n'+ textStatus + '\n' + errorThrown
        console.log(msg);
    })
}) ()