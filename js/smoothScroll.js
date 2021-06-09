/*
* Code permettant d'ajouter la hauteur du header pour que les ancres ne se retrouve pas sous le bandeau
* */
let header = document.getElementsByTagName('header');

if(document.location.href.includes('index.html')) {
    $('.disable').click(function(event){
        event.preventDefault();
    });
}


function clickOnIndex() {
    let lien = this.getAttribute('href');
    console.log(lien);
    lien = lien.split('#')[1];
    scrollTo(0,document.getElementById(lien).offsetTop - header[0].offsetHeight);
}

function clickOnAnotherPage() {
    let lien = document.location.href;
    lien = lien.split('#')[1];
    scrollTo(0,document.getElementById(lien).offsetTop - header[0].offsetHeight);
}

if(document.location.href.includes('#')) {
    setTimeout(clickOnAnotherPage,100);
}

let liens = document.getElementsByClassName("disable");
for (let i = 0; i<liens.length; i++){
    liens[i].onclick = clickOnIndex;
}