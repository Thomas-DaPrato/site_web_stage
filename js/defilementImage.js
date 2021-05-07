let i = 0;
let tabPhoto = ['../img/paysage_fantastique_1.jpg','../img/paysage_fantastique_2.jpg','../img/paysage_fantastique_3.jpg']

function changeImageTimeOut(image_courante) {
    i+=1;
    if (i == 3) {
        i = 0
    }
    image_courante.setAttribute('src',tabPhoto[i]);
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
            i = 1
            break;
        case 1:
            i = 2
            break;
        case 2 :
            i = 0;
            break;
    }
    changeImage();

}

function clickFlecheDroite () {
    changeImage();
}

document.getElementById('fleche_gauche').onclick = clickFlecheGauche;
document.getElementById('fleche_droite').onclick = clickFlecheDroite;
setInterval(changeImage,10000);