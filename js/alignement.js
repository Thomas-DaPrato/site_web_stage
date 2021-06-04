function alignement() {
    let divMembre = document.getElementsByClassName('div_info_projet');
    let maxHeight = 0;

    for (let i = 0; i < divMembre.length; i += 1) {
        if (divMembre[i].offsetHeight > maxHeight) {
            maxHeight = divMembre[i].offsetHeight;
        }
        console.log(maxHeight);
    }

    for (let i = 0; i < divMembre.length; i += 1) {
        divMembre[i].style.height = maxHeight + 'px';
    }
}
setTimeout(alignement,500);