(function () {
    "use strict";

    $(() => {
        $.ajax({
            url: "../../php/getPublicationsAnnee.php",
            type: "get",
            data: "annee=" + document.getElementById('annee').innerHTML,
            dataType: "json"
        }).done(function (data) {
            let $publicationsAnnee = $(".publication_annee");
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
                            else if ( information == "doi" && data[publication][information] == "null"){
                                $li.append(" ");
                            }
                            else {
                                $li.append(data[publication][information], " ");
                            }

                        }
                    }
                }
                $publicationsAnnee.append($li);
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
            alert("une erreur est survenue avec l'ajout des publications");
            let msg = jqXHR.responseText + '\n'+ textStatus + '\n' + errorThrown
            console.log(msg);
        })
    })
}) ()