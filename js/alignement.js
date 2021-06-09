function alignement() {
    let divMembre = document.getElementsByClassName('div_info_projet');
    let maxHeight = 0;

    for (let i = 0; i < divMembre.length; i += 1) {
        if (divMembre[i].offsetHeight > maxHeight) {
            maxHeight = divMembre[i].offsetHeight;
        }
    }

    for (let i = 0; i < divMembre.length; i += 1) {
        divMembre[i].style.height = maxHeight + 'px';
    }
}

if (window.screen.width > 900) {
    setTimeout(alignement, 500);
}