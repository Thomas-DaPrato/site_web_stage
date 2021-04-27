(function () {
    "use strict";
    alert("coucou");
    $(() => {
        $.ajax({
            url: "https://scholar.google.fr/scholar?hl=fr&as_sdt=0%2C5&q=santiago+arroyave-tobon&btnG=&oq=sant",
            method:"get",
            data:"html"
        }).done(function (data) {
            console.log(data);
        })
    })
}) ()