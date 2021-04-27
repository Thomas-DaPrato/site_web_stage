(function () {
    "use strict";

    $(() => {
        $.ajax({
            url: "../php/recherchePublications.php",
            type: "get",
            dataType: "json"
        }).done(function (data) {
            let $publications = $(".publication");
            if(data.hasOwnProperty("santiago")){
                for (let publication in data.santiago){
                    let $li = $("<li />")
                    if(data.santiago.hasOwnProperty(publication)){
                        for (let information in data.santiago[publication]){
                            if (data.santiago[publication].hasOwnProperty(information)){
                                $li.append(data.santiago[publication][information], " ");
                            }

                        }
                    }
                    $publications.append($li);
                }
            }
        }).fail(function (jqXHR,textStatus, errorThrown) {
            alert("une erreur est survenue");
            let msg = jqXHR.responseText + '\n'+ textStatus + '\n' + errorThrown
            console.log(msg);
        })
    })
}) ()