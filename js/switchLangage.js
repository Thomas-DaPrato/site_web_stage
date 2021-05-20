/*
* Code permettant de changer de langue grâce a un changement de fichier où est stocké tous le contenu du site
* */
function switchLangage() {
    let nom = document.location.pathname;
    nom = nom.substring(nom.lastIndexOf('/')+1);
    nom = nom.replace('.html','.txt');
    if(nom == "") {
        nom = 'index.txt';
    }
    $(() => {
        $.ajax({
            url: '/php/getLangue.php',
            type: 'get',
            data: 'langue='+document.getElementById('switch_langage').innerHTML.toLowerCase()+'&fichier='+nom,
            dataType: 'json'
        }).done(function (data) {
            for (let contenu in data){
                if(data[contenu].length > 1){
                    document.getElementById(data[contenu][0]).innerHTML = data[contenu][1];
                }
            }
        }).fail(function (jqXHR,textStatus, errorThrown) {
            alert("une erreur est survenue avec la traduction du document");
            let msg = jqXHR.responseText + '\n'+ textStatus + '\n' + errorThrown
            console.log(msg);
        })
    })
}


document.getElementById('switch_langage').onclick = switchLangage;
