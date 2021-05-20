<?php

$file = scandir('./');
foreach ($file as $fichier) {
    echo $fichier,' ';
    echo gettype($fichier),'<br>';
}


