<?php
require_once(__DIR__.'/../config/config.php');

$metodo = strtolower($_SERVER['REQUEST_METHOD']);
$accion = isset($_GET['accion']) ? explode('/', strtolower($_GET['accion'])) : [];
$funcionNombre = $metodo . (isset($accion[0]) ? ucfirst($accion[0]) : '');
$parametros = array_slice($accion, 1);

if (count($parametros) > 0 && $metodo == 'get') {
    $funcionNombre = $funcionNombre.'ConParametros';
}

if (function_exists($funcionNombre)) {
    call_user_func_array($funcionNombre, $parametros);
} else {
    outputError(400);
}


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
        settype($fila['id_user'], 'integer');
        $ret[] = $fila;
    }
    mysqli_free_result($result);
    mysqli_close($db);
    outputJson($ret);
}

function getUsuariosConParametros($id){
    $db = conectarBD();
    $sql = "SELECT * FROM usuarios WHERE id_user = $id";
    $result = mysqli_query($db, $sql);
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }
    $ret = [];
    while ($fila = mysqli_fetch_assoc($result)) {
        settype($fila['id_user'], 'integer');
        $ret[] = $fila;
    }
    mysqli_free_result($result);
    mysqli_close($db);
    outputJson($ret);
}

function getAlumnos(){
    $db = conectarBD();
    $sql = "SELECT * FROM alumnos";
    $result = mysqli_query($db, $sql);
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }
    $ret = [];
    while ($fila = mysqli_fetch_assoc($result)) {
        settype($fila['id_alumno'], 'integer');
        $ret[] = $fila;
    }
    mysqli_free_result($result);
    mysqli_close($db);
    outputJson($ret);
}

function getAlumnosConParametros($id){
    $db = conectarBD();
    $sql = "SELECT * FROM alumnos WHERE id_alumno = $id";
    $result = mysqli_query($db, $sql);
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }
    $ret = [];
    while ($fila = mysqli_fetch_assoc($result)) {
        settype($fila['id_alumno'], 'integer');
        $ret[] = $fila;
    }
    mysqli_free_result($result);
    mysqli_close($db);
    outputJson($ret);
}

function getProfesores(){
    $db = conectarBD();
    $sql = "SELECT * FROM profesores";
    $result = mysqli_query($db, $sql);
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }
    $ret = [];
    while ($fila = mysqli_fetch_assoc($result)) {
        settype($fila['id_profesor'], 'integer');
        $ret[] = $fila;
    }
    mysqli_free_result($result);
    mysqli_close($db);
    outputJson($ret);
}

function getProfesoresConParametros($id){
    $db = conectarBD();
    $sql = "SELECT * FROM profesores WHERE id_profesor = $id";
    $result = mysqli_query($db, $sql);
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }
    $ret = [];
    while ($fila = mysqli_fetch_assoc($result)) {
        settype($fila['id_profesor'], 'integer');
        $ret[] = $fila;
    }
    mysqli_free_result($result);
    mysqli_close($db);
    outputJson($ret);
}

function getMaterias(){
    $db = conectarBD();
    $sql = "SELECT * FROM materias";
    $result = mysqli_query($db, $sql);
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }
    $ret = [];
    while ($fila = mysqli_fetch_assoc($result)) {
        settype($fila['id_materia'], 'integer');
        $ret[] = $fila;
    }
    mysqli_free_result($result);
    mysqli_close($db);
    outputJson($ret);
}

function getMateriasConParametros($id){
    $db = conectarBD();
    $sql = "SELECT * FROM materias WHERE id_materia = $id";
    $result = mysqli_query($db, $sql);
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }
    $ret = [];
    while ($fila = mysqli_fetch_assoc($result)) {
        settype($fila['id_materia'], 'integer');
        $ret[] = $fila;
    }
    mysqli_free_result($result);
    mysqli_close($db);
    outputJson($ret);
}

// Función top 5 materias para banner de inicio
function getTopMaterias(){
    $db = conectarBD();
    $sql = "SELECT m.nombre, m.icono
        FROM materias m
        INNER JOIN alumnos_materias am ON m.id_materia = am.id_materia
        GROUP BY m.id_materia
        ORDER BY COUNT(am.id_alumno) DESC
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
function postUsuarios(){
    $db = conectarBD();
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['mail']) || !isset($data['password']) || !isset($data['rol'])) {
        outputError(400);
    }

    $mail = mysqli_real_escape_string($db, $data['mail']);
    $password = mysqli_real_escape_string($db, $data['password']);
    $rol = mysqli_real_escape_string($db, $data['rol']);
    $sql = "INSERT INTO usuarios (mail, password, rol) VALUES ('$mail', '$password', '$rol')";
    $result = mysqli_query($db, $sql);
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }
    $id = mysqli_insert_id($db);
    mysqli_close($db);
    outputJson(['id_user' => $id]);
}

function postAlumnos(){
    $db = conectarBD();
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id_usuario']) || !isset($data['nombre']) || !isset($data['apellido']) || !isset($data['zona']) || !isset($data['direccion']) || !isset($data['foto_path']) || !isset($data['puntuacion'])) {
        outputError(400);
    }
    
    $id_usuario = mysqli_real_escape_string($db, $data['id_usuario']);
    $nombre = mysqli_real_escape_string($db, $data['nombre']);
    $apellido = mysqli_real_escape_string($db, $data['apellido']);
    $zona = mysqli_real_escape_string($db, $data['zona']);
    $direccion = mysqli_real_escape_string($db, $data['direccion']);
    $foto_path = mysqli_real_escape_string($db, $data['foto_path']);
    $puntuacion = mysqli_real_escape_string($db, $data['puntuacion']);

    $sql = "INSERT INTO alumnos (id_usuario, nombre, apellido, zona, direccion, foto_path, puntuacion) VALUES ('$id_usuario', '$nombre', '$apellido', '$zona', '$direccion', '$foto_path', '$puntuacion')";
    $result = mysqli_query($db, $sql);
    
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }

    $id = mysqli_insert_id($db);
    mysqli_close($db);
    outputJson(['id_alumno' => $id]);
}


function postProfesores(){
    $db = conectarBD();
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id_usuario']) || !isset($data['nombre']) || !isset($data['apellido']) || !isset($data['modalidad']) || !isset($data['zona']) || !isset($data['direccion']) || !isset($data['foto_path']) || !isset($data['archivos_path']) || !isset($data['puntuacion'])) {
        outputError(400);
    }

    $id_usuario = mysqli_real_escape_string($db, $data['id_usuario']);
    $nombre = mysqli_real_escape_string($db, $data['nombre']);
    $apellido = mysqli_real_escape_string($db, $data['apellido']);
    $modalidad = mysqli_real_escape_string($db, $data['modalidad']);
    $zona = mysqli_real_escape_string($db, $data['zona']);
    $direccion = mysqli_real_escape_string($db, $data['direccion']);
    $foto_path = mysqli_real_escape_string($db, $data['foto_path']);
    $archivos_path = mysqli_real_escape_string($db, $data['archivos_path']);
    $puntuacion = mysqli_real_escape_string($db, $data['puntuacion']);

    $sql = "INSERT INTO profesores (id_usuario, nombre, apellido, modalidad, zona, direccion, foto_path, archivos_path, puntuacion) VALUES ('$id_usuario', '$nombre', '$apellido', '$modalidad', '$zona', '$direccion', '$foto_path', '$archivos_path', '$puntuacion')";
    $result = mysqli_query($db, $sql);

    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }

    $id = mysqli_insert_id($db);
    mysqli_close($db);
    outputJson(['id_profesor' => $id]);
}


// Función para agregar una materia que no había
function postMaterias(){
    $db = conectarBD();
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['nombre'])) {
        outputError(400);
    }

    $nombre = mysqli_real_escape_string($db, $data['nombre']);
    $sql = "INSERT INTO materias (nombre, icono) VALUES ('$nombre', 'https://via.placeholder.com/50')";
    
    $result = mysqli_query($db, $sql);
    
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }

    $id = mysqli_insert_id($db);
    mysqli_close($db);
    outputJson(['id_materia' => $id]);
}

function patchUsuarios($id){
    $db = conectarBD();
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data)) {
        outputError(400); // No hay datos proporcionados para actualizar
    }

    $cambios = [];

    if (isset($data['mail'])) {
        $mail = mysqli_real_escape_string($db, $data['mail']);
        $cambios[] = "mail = '$mail'";
    }

    if (isset($data['password'])) {
        $password = mysqli_real_escape_string($db, $data['password']);
        $cambios[] = "password = '$password'";
    }

    if (isset($data['rol'])) {
        $rol = mysqli_real_escape_string($db, $data['rol']);
        $cambios[] = "rol = '$rol'";
    }

    $seteador = implode(", ", $cambios);

    $sql = "UPDATE usuarios SET $seteador WHERE id_user = $id";
    $result = mysqli_query($db, $sql);

    if ($result === false) {
        print mysqli_error($db);
        outputError(500);
    }

    mysqli_close($db);
    outputJson(['id_user' => $id]);
}

function patchAlumnos($id){
    global $alumnos;
    $db = conectarBD();
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (empty($data)) {
        outputError(400); // No hay datos proporcionados para actualizar
    }
    
    $cambios = [];
    
    if (isset($data['nombre'])) {
        $nombre = mysqli_real_escape_string($db, $data['nombre']);
        $cambios[] = "nombre = '$nombre'";
    }

    if (isset($data['apellido'])) {
        $apellido = mysqli_real_escape_string($db, $data['apellido']);
        $cambios[] = "apellido = '$apellido'";
    }

    if (isset($data['zona'])) {
        $zona = mysqli_real_escape_string($db, $data['zona']);
        $cambios[] = "zona = '$zona'";
    }

    if (isset($data['direccion'])) {
        $direccion = mysqli_real_escape_string($db, $data['direccion']);
        $cambios[] = "direccion = '$direccion'";
    }

    if (isset($data['foto_path'])) {
        $foto_path = mysqli_real_escape_string($db, $data['foto_path']);
        $cambios[] = "foto_path = '$foto_path'";
    }

    if (isset($data['puntuacion'])) {
        $puntuacion = mysqli_real_escape_string($db, $data['puntuacion']);
        $cambios[] = "puntuacion = '$puntuacion'";
    }

    $seteador = implode(", ", $cambios);
    
    $sql = "UPDATE alumnos SET $seteador WHERE id_alumno = $id";
    $result = mysqli_query($db, $sql);
    
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }
    mysqli_close($db);
    outputJson(['id_alumno' => $id]);
}

function patchProfesores($id){
    $db = conectarBD();
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data)) {
        outputError(400); // No hay datos proporcionados para actualizar
    }

    $cambios = [];

    if (isset($data['nombre'])) {
        $nombre = mysqli_real_escape_string($db, $data['nombre']);
        $cambios[] = "nombre = '$nombre'";
    }

    if (isset($data['apellido'])) {
        $apellido = mysqli_real_escape_string($db, $data['apellido']);
        $cambios[] = "apellido = '$apellido'";
    }

    if (isset($data['modalidad'])) {
        $modalidad = mysqli_real_escape_string($db, $data['modalidad']);
        $cambios[] = "modalidad = '$modalidad'";
    }

    if (isset($data['zona'])) {
        $zona = mysqli_real_escape_string($db, $data['zona']);
        $cambios[] = "zona = '$zona'";
    }

    if (isset($data['direccion'])) {
        $direccion = mysqli_real_escape_string($db, $data['direccion']);
        $cambios[] = "direccion = '$direccion'";
    }

    if (isset($data['foto_path'])) {
        $foto_path = mysqli_real_escape_string($db, $data['foto_path']);
        $cambios[] = "foto_path = '$foto_path'";
    }

    if (isset($data['archivos_path'])) {
        $archivos_path = mysqli_real_escape_string($db, $data['archivos_path']);
        $cambios[] = "archivos_path = '$archivos_path'";
    }

    if (isset($data['puntuacion'])) {
        $puntuacion = mysqli_real_escape_string($db, $data['puntuacion']);
        $cambios[] = "puntuacion = '$puntuacion'";
    }

    $seteador = implode(", ", $cambios);

    $sql = "UPDATE profesores SET $seteador WHERE id_profesor = $id";
    $result = mysqli_query($db, $sql);

    if ($result === false) {
        print mysqli_error($db);
        outputError(500);
    }

    mysqli_close($db);
    outputJson(['id_profesor' => $id]);
}


function patchMaterias($id){
    $db = conectarBD();
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data)) {
        outputError(400); // No hay datos proporcionados para actualizar
    }

    $cambios = [];

    if (isset($data['nombre'])) {
        $nombre = mysqli_real_escape_string($db, $data['nombre']);
        $cambios[] = "nombre = '$nombre'";
    }

    $seteador = implode(", ", $cambios);

    $sql = "UPDATE materias SET $seteador WHERE id_materia = $id";
    $result = mysqli_query($db, $sql);

    if ($result === false) {
        print mysqli_error($db);
        outputError(500);
    }

    mysqli_close($db);
    outputJson(['id_materia' => $id]);
}

// Función para eliminar un Usuario y sus relaciones
function deleteUsuarios($id) {
    $db = conectarBD();
    // Eliminar registros de alumnos_resenas y profesores_resenas
    $sqlAlumnoRes = "DELETE FROM alumnos_resenas WHERE id_alumno IN (SELECT id_alumno FROM alumnos WHERE id_usuario = $id)";
    $resultAlumnoRes = mysqli_query($db, $sqlAlumnoRes);

    if ($resultAlumnoRes === false) {
        print mysqli_error($db);
        outputError(500);
    }

    // Eliminar registros de profesores_resenas
    $sqlProfRes = "DELETE FROM profesores_resenas WHERE id_profesor IN (SELECT id_profesor FROM profesores WHERE id_usuario = $id)";
    $resultProfRes = mysqli_query($db, $sqlProfRes);

    if ($resultProfRes === false) {
        print mysqli_error($db);
        outputError(500);
    }

    // Eliminar registros de alumnos_materias
    $sqlAlumnoMat = "DELETE FROM alumnos_materias WHERE id_alumno IN (SELECT id_alumno FROM alumnos WHERE id_usuario = $id)";
    $resultAlumnoMat = mysqli_query($db, $sqlAlumnoMat);

    if ($resultAlumnoMat === false) {
        print mysqli_error($db);
        outputError(500);
    }

    // Eliminar registros de profesores_materias
    $sqlProfMat = "DELETE FROM profesores_materias WHERE id_profesor IN (SELECT id_profesor FROM profesores WHERE id_usuario = $id)";
    $resultProfMat = mysqli_query($db, $sqlProfMat);

    if ($resultProfMat === false) {
        print mysqli_error($db);
        outputError(500);
    }

    // Eliminar registros de alumnos
    $sqlAlumno = "DELETE FROM alumnos WHERE id_usuario = $id";
    $resultAlumno = mysqli_query($db, $sqlAlumno);

    if ($resultAlumno === false) {
        print mysqli_error($db);
        outputError(500);
    }

    // Eliminar registros de profesores
    $sqlProfesor = "DELETE FROM profesores WHERE id_usuario = $id";
    $resultProfesor = mysqli_query($db, $sqlProfesor);

    if ($resultProfesor === false) {
        print mysqli_error($db);
        outputError(500);
    }

    // Finalmente, eliminar el usuario
    $sqlUsuario = "DELETE FROM usuarios WHERE id_user = $id";
    $resultUsuario = mysqli_query($db, $sqlUsuario);

    if ($resultUsuario === false) {
        print mysqli_error($db);
        outputError(500);
    }

    mysqli_close($db);
    outputJson(['id_user' => $id]);
}

// Función para eliminar un Alumno y sus relaciones
function deleteAlumnos($id) {
    $db = conectarBD();

    // Eliminar registros de alumnos_resenas
    $sqlAlumnoRes = "DELETE FROM alumnos_resenas WHERE id_alumno IN (SELECT id_alumno FROM alumnos WHERE id_usuario = $id)";
    $resultAlumnoRes = mysqli_query($db, $sqlAlumnoRes);

    if ($resultAlumnoRes === false) {
        print mysqli_error($db);
        outputError(500);
    }

    $sqlProfRes = "DELETE FROM profesores_resenas WHERE id_profesor IN (SELECT id_profesor FROM profesores WHERE id_usuario = $id)";
    $resultProfRes = mysqli_query($db, $sqlProfRes);

    if ($resultProfRes === false) {
        print mysqli_error($db);
        outputError(500);
    }

    // Eliminar registros de alumnos_materias
    $sqlAlumnoMat = "DELETE FROM alumnos_materias WHERE id_alumno IN (SELECT id_alumno FROM alumnos WHERE id_usuario = $id)";
    $resultAlumnoMat = mysqli_query($db, $sqlAlumnoMat);

    if ($resultAlumnoMat === false) {
        print mysqli_error($db);
        outputError(500);
    }

    // Eliminar registros de profesores_materias
    $sqlProfMat = "DELETE FROM profesores_materias WHERE id_profesor IN (SELECT id_profesor FROM profesores WHERE id_usuario = $id)";
    $resultProfMat = mysqli_query($db, $sqlProfMat);

    if ($resultProfMat === false) {
        print mysqli_error($db);
        outputError(500);
    }

    // Eliminar registros de alumnos
    $sqlAlumno = "DELETE FROM alumnos WHERE id_usuario = $id";
    $resultAlumno = mysqli_query($db, $sqlAlumno);

    if ($resultAlumno === false) {
        print mysqli_error($db);
        outputError(500);
    }

    // Finalmente, eliminar el usuario
    $sqlUsuario = "DELETE FROM usuarios WHERE id_user = $id";
    $resultUsuario = mysqli_query($db, $sqlUsuario);

    if ($resultUsuario === false) {
        print mysqli_error($db);
        outputError(500);
    }

    mysqli_close($db);
    outputJson(['id_alumno' => $id]);
}

// Función para eliminar un Profesor y sus relaciones
function deleteProfesores($id) {
    if (empty($id) || !is_numeric($id)) {
        outputError(400); // Bad Request, ID no válido
    }

    $db = conectarBD();

    // Eliminar registros de profesores_resenas
    $sqlProfRes = "DELETE FROM profesores_resenas WHERE id_profesor = $id";
    $resultProfRes = mysqli_query($db, $sqlProfRes);

    if ($resultProfRes === false) {
        print mysqli_error($db);
        outputError(500);
    }

    // Eliminar registros de profesores_materias
    $sqlProfMat = "DELETE FROM profesores_materias WHERE id_profesor = $id";
    $resultProfMat = mysqli_query($db, $sqlProfMat);

    if ($resultProfMat === false) {
        print mysqli_error($db);
        outputError(500);
    }

    // Finalmente, eliminar el profesor
    $sqlProf = "DELETE FROM profesores WHERE id_profesor = $id";
    $resultProf = mysqli_query($db, $sqlProf);

    if ($resultProf === false) {
        print mysqli_error($db);
        outputError(500);
    }

    mysqli_close($db);
    outputJson(['id_profesor' => $id]);
}

// Función para eliminar una Materia y sus relaciones
function deleteMaterias($id) {
    $db = conectarBD();

    // Eliminar registros de alumnos_materias y profesores_materias
    $sqlAlumnoMat = "DELETE FROM alumnos_materias WHERE id_materia = $id";
    $resultAlumnoMat = mysqli_query($db, $sqlAlumnoMat);

    if ($resultAlumnoMat === false) {
        print mysqli_error($db);
        outputError(500);
    }

    $sqlProfMat = "DELETE FROM profesores_materias WHERE id_materia = $id";
    $resultProfMat = mysqli_query($db, $sqlProfMat);

    if ($resultProfMat === false) {
        print mysqli_error($db);
        outputError(500);
    }

    // Finalmente, eliminar la materia
    $sqlMateria = "DELETE FROM materias WHERE id_materia = $id";
    $resultMateria = mysqli_query($db, $sqlMateria);

    if ($resultMateria === false) {
        print mysqli_error($db);
        outputError(500);
    }

    mysqli_close($db);
    outputJson(['id_materia' => $id]);
}
