<?php

$tabPermanents = file("../team/permanents.txt");
for ($i = 0 ; $i < sizeof($tabPermanents); $i+=1) {
    if ($i < sizeof($tabPermanents) -1){
        $tabPermanents[$i] = substr($tabPermanents[$i],0,-2);
    }
    $tabPermanents[$i] = explode(' : ',$tabPermanents[$i]);
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($tabPermanents);

