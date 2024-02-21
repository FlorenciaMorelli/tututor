<?php
require_once(__DIR__.'../config.php');

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE');

header("Access-Control-Allow-Headers: X-Requested-With");

function conectarBD()
{
    $link = mysqli_connect(DBHOST, DBUSER, DBPASS, DBBASE);
    if (!$link) {
        print "Falló la conexión: " . mysqli_connect_error();
        outputError(500);
    }
    mysqli_set_charset($link, 'utf8');
    return $link;
}

function outputJson($data, $codigo = 200)
{
    header('', true, $codigo);
    header('Content-type: application/json');
    print json_encode($data);
    die;
}

function outputError($codigo = 500)
{
    switch ($codigo) {
        case 400:
            header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad request", true, 400);
            die;
        case 404:
            header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found", true, 404);
            die;
        default:
            header($_SERVER["SERVER_PROTOCOL"] . " 500 Internal Server Error", true, 500);
            die;
            break;
    }
}