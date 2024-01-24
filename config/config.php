<?php

define('DBUSER', 'MorelliFinal');
define('DBPASS', 'ExamenFlorencia');
define('DBBASE', 'tututor');
define('DBHOST', 'localhost');

/* function sf__restablecerSql () {
	$sqls = array_map(function ($v) {return trim($v);}, explode(PHP_EOL, file_get_contents(__DIR__ . '/../storage/dump.sql')));
	$nuevoSql = implode(PHP_EOL, array_slice($sqls, array_search('-- #####CORTE#####', $sqls)));
	return $nuevoSql;
} */