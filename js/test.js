(function () {
    $.ajax({
        url: 'php/test.php',
        method: 'get',
        dataType : 'json'
    }).done(function (data) {
        let $2 = $("<ul />");
        $2.append($('<li/>').append('slt'));
        console.log($2);
    }).fail(function (jqXHR,textStatus, errorThrown) {
        alert("une erreur est survenue");
        let msg = jqXHR.responseText + '\n'+ textStatus + '\n' + errorThrown
        console.log(msg);
    })
}) ()