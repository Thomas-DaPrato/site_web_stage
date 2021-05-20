/*
* Code permettant d'ajouter la hauteur du header pour que les ancres ne se retrouve pas sous le bandeau
* */
let header = document.getElementsByTagName('header');
$('.lien_menu').click(function(event){
    event.preventDefault();
});

function click() {
    let lien = this.getAttribute('href');
    lien = lien.replace('#',"");
    scrollTo(0,document.getElementById(lien).offsetTop - header[0].offsetHeight + 10);
}

let liens = document.getElementsByClassName("lien_menu");
for (let i = 0; i<liens.length; i++){
    liens[i].onclick = click;
}