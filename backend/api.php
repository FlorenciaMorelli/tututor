<?php
//include "/../config/config.php";

require_once(__DIR__.'/../config/config.php');

/* $metodo = strtolower($_SERVER['REQUEST_METHOD']);
$accion = explode('/', strtolower($_GET['accion']));
$funcionNombre = $metodo . ucfirst($accion[0]);
$parametros = array_slice($accion, 1);
if (count($parametros) >0 && $metodo == 'get') {
    $funcionNombre = $funcionNombre.'ConParametros';
}
if (function_exists($funcionNombre)) {
    call_user_func_array ($funcionNombre, $parametros);
} else {
    outputError(400);
} */

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

// Funciones para el administrador
function getUsuarios() 
{
    $db = conectarBD();
    $sql = "SELECT * FROM usuarios";
    $result = mysqli_query($db, $sql);
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }
    $ret = [];
    while ($fila = mysqli_fetch_assoc($result)) {
        settype($fila['id'], 'integer');
        $ret[] = $fila;
    }
    mysqli_free_result($result);
    mysqli_close($db);
    outputJson($ret);
}


// Función top 5 materias para banner de inicio
function getTopMaterias(){
    $db = conectarBD();
    $sql = "SELECT m.id_materia, m.nombre, COUNT(am.id_alumno) AS cantidad_alumnos
        FROM materias m
        JOIN alumnos_materias am ON m.id_materia = am.id_materia
        GROUP BY m.id_materia
        ORDER BY cantidad_alumnos DESC
        LIMIT 5";
    $result = mysqli_query($db, $sql);
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }
    $ret = [];
    while ($fila = mysqli_fetch_assoc($result)) {
        $ret[] = $fila;
    }
    mysqli_free_result($result);
    mysqli_close($db);
    outputJson($ret);
}

// Función para agregar una materia que no había
function postMateria(){
    $db = conectarBD();
    $data = json_decode(file_get_contents('php://input'), true);
    $nombre = mysqli_real_escape_string($db, $data['nombre']);
    $sql = "INSERT INTO materias (nombre, icono) VALUES ($nombre, 'https://via.placeholder.com/50')"; //en este caso, sería útil tener un ícono estándar de materia guardado en el proyecto. y después se podría cambiar el ícono desde el admin
    $result = mysqli_query($db, $sql);
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }
    $id = mysqli_insert_id($db);
    mysqli_close($db);
    outputJson(['id' => $id]);
}