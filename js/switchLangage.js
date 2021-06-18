/*
* Code permettant de changer de langue grâce a un changement de fichier où est stocké tous le contenu du site
* */

function switchLangage(langue) {
    let nom = document.location.pathname;
    nom = nom.substring(nom.lastIndexOf('/')+1);
    nom = nom.replace('.html','.txt');
    if(nom == "") {
        nom = 'index.txt';
    }
    $(() => {
        $.ajax({
            url: '/site_web_stage/php/getLangue.php',
            type: 'get',
            data: 'langue='+langue+'&fichier='+nom,
            dataType: 'json'
        }).done(function (data) {
            for (let contenu in data){
                if(data[contenu].length > 1){
                    if (data[contenu][0] == 'texte_titre_annee') {
                        if (document.getElementById(data[contenu][0]).innerHTML == 'de' || document.getElementById(data[contenu][0]).innerHTML == 'of') {
                            document.getElementById(data[contenu][0]).innerHTML = data[contenu][1];
                        }
                        else {
                            document.getElementById(data[contenu][0]).innerHTML = data[contenu][2];
                        }
                    }
                    else {
                        document.getElementById(data[contenu][0]).innerHTML = data[contenu][1];
                    }
                }
            }
        }).fail(function (jqXHR,textStatus, errorThrown) {
            alert("une erreur est survenue avec la traduction du document");
            let msg = jqXHR.responseText + '\n'+ textStatus + '\n' + errorThrown
            console.log(msg);
        })
    })

    if (langue == 'fr') {
        document.getElementById('switch_langage_fr').style.textDecoration = "underline";
        document.getElementById('switch_langage_en').style.textDecoration = "none";
    }
    else {
        document.getElementById('switch_langage_fr').style.textDecoration = "none";
        document.getElementById('switch_langage_en').style.textDecoration = "underline";
    }
}

setTimeout(switchLangage("fr"),1000);

document.getElementById('switch_langage_fr').addEventListener("click",function () {
        switchLangage("fr");
})
document.getElementById('switch_langage_en').addEventListener("click",function () {
        switchLangage("en");
})
