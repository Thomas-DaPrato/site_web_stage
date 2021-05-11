(function () {
    $.ajax({
        url: 'http://api.archives-ouvertes.fr/search/?q=*:*&wt=json',
        method: 'get',
        dataType : 'json'
    }).done(function (data) {
        console.log(data);
    }).fail(function (jqXHR,textStatus, errorThrown) {
        alert("une erreur est survenue");
        let msg = jqXHR.responseText + '\n'+ textStatus + '\n' + errorThrown
        console.log(msg);
    })
}) ()