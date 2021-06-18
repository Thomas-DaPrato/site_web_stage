
function image (nomImg,element) {
    $.ajax({
        url :'/site_web_stage/php/getImage.php',
        method : 'get',
        data : 'nomImg='+nomImg,
        dataType : 'json'
    }).done(function (dataImg) {
        if (document.location.href.includes('/projets/')) {
            element.setAttribute('src','..//img/'+dataImg[0])
        }
        else {
            element.setAttribute('src','img/'+dataImg[0])
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("une erreur est survenue avec l'ajout des photos des membres");
        let msg = jqXHR.responseText + '\n' + textStatus + '\n' + errorThrown
        console.log(msg);
    })
}

let images = document.getElementsByTagName('img');
for (let i = 0 ; i < images.length ; i +=1) {
    image(images[i].getAttribute('alt'),images[i]);
}