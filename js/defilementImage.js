let i = 0;
let tabPhoto = ['img/logo_cbi.png','img/paysage_fantastique_1.jpg',
    'img/paysage_fantastique_2.jpg','img/paysage_fantastique_3.jpg'];


(function () {
    "use strict";
    let $div_cercle = $("#div_cercle");
    for (let img in tabPhoto) {
        $div_cercle.append($('<span />').attr('class','rond_img_courante'));
    }
}) ()

let point_img = document.getElementsByClassName('rond_img_courante');
point_img[0].style.opacity = '1';

function changeImageTimeOut(image_courante) {
    for (let point = 0; point < point_img.length; point +=1) {
        point_img[point].style.opacity = '0.25';
    }
    i+=1;
    if (i == 4) {
        i = 0
    }
    image_courante.setAttribute('src',tabPhoto[i]);
    point_img[i].style.opacity = '1';
}

function changeImage () {
    let image_courante = document.getElementById('img_courante');
    let $self = $(image_courante);
    $self.fadeOut(1000);
    setTimeout(changeImageTimeOut,1000,image_courante);
    $self.fadeIn(1000);
}

function clickFlecheGauche () {
    switch (i) {
        case 0 :
            i = 2;
            break;
        case 1:
            i = 3
            break;
        case 2 :
            i = 0;
            break;
        case 3 :
            i = 1;
    }
    changeImage();

}

function clickFlecheDroite () {
    changeImage();
}



document.getElementById('fleche_gauche').onclick = clickFlecheGauche;
document.getElementById('fleche_droite').onclick = clickFlecheDroite;
setInterval(changeImage,10000);