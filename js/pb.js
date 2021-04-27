let header = document.getElementsByTagName('header');
$('.lien_menu').click(function(event){
    event.preventDefault();
});

function click() {
    let lien = this.getAttribute('href');
    if (document.location.href.search('index') == -1) {
        document.location.href = lien;
        lien = lien.split("#")[1];
    }
    else {
        lien = lien.replace('#',"");
    }

    scrollTo(0,document.getElementById(lien).offsetTop - header[0].offsetHeight + 10);
}

let liens = document.getElementsByClassName("lien_menu");
for (let i = 0; i<liens.length; i++){
    liens[i].onclick = click;
}