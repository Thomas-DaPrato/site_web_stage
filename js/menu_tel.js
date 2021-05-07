let isOnMenuTel = false;
let isOnFleche = [false,false];

function clickMenuShow () {
    if (isOnMenuTel) {
        document.getElementById('nav_barre').style.display = "none";
        isOnMenuTel = false;
    }
    else {

        document.getElementById('nav_barre').style.display = "flex";
        isOnMenuTel = true;
    }
}
let fleches = document.getElementsByClassName('fleche_bas');

function clickDropDown(i) {
    let lienDropdown = document.getElementsByClassName('dropdown-content');
    if (isOnFleche[i]) {
        lienDropdown[i].style.display = "none";
        fleches[i].style.transform = "initial";
        isOnFleche[i] = false;
    }
    else {
        lienDropdown[i].style.display = "flex";
        fleches[i].style.transform = "rotate(0.5turn)";
        isOnFleche[i] = true;
    }
}

document.getElementById('menu_tel').onclick = clickMenuShow;


for (let i = 0; i<fleches.length; i++){
    fleches[i].onclick = function () {
        clickDropDown(i)
    };
}

