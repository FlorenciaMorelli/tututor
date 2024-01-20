<?php

define('DBUSER', 'tututor');
define('DBPASS', 'tututor');
define('DBBASE', 'tututor');
define('DBHOST', '127.0.0.1');
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

function sf__restablecerSql () {
	$sqls = array_map(function ($v) {return trim($v);}, explode(PHP_EOL, file_get_contents(__DIR__ . '/../storage/dump.sql')));
	$nuevoSql = implode(PHP_EOL, array_slice($sqls, array_search('-- #####CORTE#####', $sqls)));
	return $nuevoSql;
}

function postRestablecer () {
    $db = conectarBD();
    $sql = sf__restablecerSql();
    $result = mysqli_multi_query($db, $sql);
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }
    mysqli_close($db);
    outputJson([], 201);
}

$link = conectarBD();