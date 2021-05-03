(function () {
    "use strict";

    $(() => {
        $('.publication').append("chargement");
        $.ajax({
            url: "../php/publicationBD_to_json.php",
            type: "get",
            dataType: "json"
        }).done(function (data) {
            let $publications = $(".liste_publication");
            $publications.empty();
                for (let publication in data){
                    let $li = $("<li />")
                    if(data.hasOwnProperty(publication)){
                        for (let information in data[publication]){
                            if (data[publication].hasOwnProperty(information)){
                                if(information == "titre") {
                                    $li.append($("<strong class='doc_publie'/>")
                                        .append(data[publication][information], " ")
                                    );
                                }
                                else if ((information == "annee" || information == "doi") && data[publication][information] == "null"){
                                    $li.append(" ");
                                }
                                else {
                                    $li.append(data[publication][information], " ");
                                }

                            }
                        }
                    }
                    $publications.append($li);
                }



            let lien_doc = document.getElementsByClassName('doc_publie');
            for (let i = 0; i<lien_doc.length; i++){
                let lien = $(lien_doc[i].innerHTML);
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