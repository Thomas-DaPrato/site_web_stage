(function () {
    $.ajax({
        url : '/site_web_stage/php/getAnneeMax.php',
        method: 'get',
        dataType : 'json'
    }).done(function (data) {
        let annee = data["anneeMax"];

        let $publication_annee = $('#lien_publication_annee');
        $publication_annee.append($('<a />').attr('href', '/site_web_stage/publications/publications_annee.html?annee=' + annee).attr("class", "lien_dropdown").append(annee));
        $publication_annee.append($('<a />').attr('href', '/site_web_stage/publications/publications_annee.html?annee=' + (annee - 1)).attr("class", "lien_dropdown").append(annee - 1));
        $publication_annee.append($('<a />').attr('href', '/site_web_stage/publications/publications_annee.html?annee=' + (annee - 2)).attr("class", "lien_dropdown").append(annee - 2));
        $publication_annee.append($('<a />').attr('href', '/site_web_stage/publications/publications_annee.html?annee=' + (annee - 3)).attr("class", "lien_dropdown").append(annee - 3));
        $publication_annee.append($('<a />').attr('href', '/site_web_stage/publications/publications_annee.html?annee=' + (annee - 4)).attr("class", "lien_dropdown").append(annee - 4));
        $publication_annee.append($('<a />').attr('href', '/site_web_stage/publications/publications_annee.html?annee=' + (annee - 5)).attr("class", "lien_dropdown").append(annee - 5));
        $publication_annee.append($('<a />').attr('href', '/site_web_stage/publications/publications_annee.html?annee=avant_' + (annee - 5)).attr("class", "lien_dropdown").append($('<span id="lien_avant_annee_n-5"/>').append('Avant'),' ', annee - 5));

    })
})()