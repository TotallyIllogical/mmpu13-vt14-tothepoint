<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.themoviedb.org/3/movie/550?api_key=c9ec56f0f1ccf916a4baa2b711e5ce29/3/search/movie");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json"));
$response = curl_exec($ch);
curl_close($ch);

var_dump($response);