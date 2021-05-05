let num_image = 1;

function changeImageTimeOut(image_courante) {
    if (num_image == 3) {
        image_courante.setAttribute('src',image_courante.getAttribute('src').replace(num_image,1));
        num_image = 1;
    }
    else {
        num_image += 1;
        image_courante.setAttribute('src',image_courante.getAttribute('src').replace(num_image-1,num_image));
    }
}

function changeImage () {
    let image_courante = document.getElementById('img_courante');
    let $self = $(image_courante);
    $self.fadeOut(1000);
    setTimeout(changeImageTimeOut,1000,image_courante);
    $self.fadeIn(1000);
}

setInterval(changeImage,10000);