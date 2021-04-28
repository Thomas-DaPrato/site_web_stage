(function () {
    "use strict";

    $(() => {
        $('.publication').append("chargement");
        $.ajax({
            url: "../php/recherchePublications.php",
            type: "get",
            dataType: "json"
        }).done(function (data) {
            alert("publication en cours d'ajout");
            let $publications = $(".publication");
            $publications.empty();
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

            let lien_doc = document.getElementsByClassName('doc_publie');
            for (let i = 0; i<lien_doc.length; i++){
                let lien = $(lien_doc[i].innerHTML);
                lien = lien.attr("target","blank");
                let oldLink = lien.attr('href');
                let newLink = lien.attr('href',"https://hal.archives-ouvertes.fr" + oldLink + "/document");
                lien_doc[i].innerHTML = lien_doc[i].innerHTML.replace(oldLink,newLink.attr('href'));
                lien_doc[i].innerHTML = lien_doc[i].innerHTML.replace('<a','<a target="blank"');
            }
        }).fail(function (jqXHR,textStatus, errorThrown) {
            alert("une erreur est survenue");
            let msg = jqXHR.responseText + '\n'+ textStatus + '\n' + errorThrown
            console.log(msg);
        })
    })
}) ()