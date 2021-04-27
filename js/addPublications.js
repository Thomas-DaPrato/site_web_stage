(function () {
    "use strict";

    $(() => {
        $.ajax({
            url: "../php/recherchePublications.php",
            type: "get",
            dataType: "json"
        }).done(function (data) {
            let $publications = $(".publication");
            for (let name in data){
                if(data.hasOwnProperty(name)){
                    for (let publication in data[name]){
                        let $li = $("<li />")
                        if(data[name].hasOwnProperty(publication)){
                            for (let information in data[name][publication]){
                                if (data[name][publication].hasOwnProperty(information)){
                                    if(information == "titre") {
                                        $li.append($("<strong class='doc_publie'/>")
                                            .append(data[name][publication][information], " ")
                                        );
                                    }
                                    else {
                                        $li.append(data[name][publication][information], " ");
                                    }
                                }
                            }
                        }
                        $publications.append($li);
                    }
                }
            }
            let lien_doc = document.getElementsByClassName("doc_publie");
            for (let lien in lien_doc){
                let doc = $(lien_doc[lien].innerHTML);
                doc.attr('href',"https://hal.archives-ouvertes.fr" + doc.attr('href') +'/document');
                let $doc_publie = $('.doc_publie');
                $doc_publie.append(doc);
            }
        }).fail(function (jqXHR,textStatus, errorThrown) {
            alert("une erreur est survenue");
            let msg = jqXHR.responseText + '\n'+ textStatus + '\n' + errorThrown
            console.log(msg);
        })
    })
}) ()