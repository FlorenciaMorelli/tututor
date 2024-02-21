<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, X-Auth-Token");
header('Access-Control-Allow-Methods: POST, GET, PATCH, DELETE');
header("Allow: GET, POST, PATCH, DELETE");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
    return 0;    
}

require_once(__DIR__.'/../config/generals.php');

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

function postRestablecer () {
    $db = conectarBD();
    $tables = array(
        'alumnos_resenas',
        'profesores_resenas',
        'resenas',
        'alumnos_materias',
        'profesores_materias',
        'alumnos',
        'profesores',
        'materias',
        'usuarios'
    );
    
    foreach ($tables as $table) {
        $sql = "DROP TABLE IF EXISTS $table";
        if ($db->query($sql) === FALSE) {
            echo "Error al eliminar la tabla $table: " . $db->error . "<br>";
        }
    }
    
    $sql = file_get_contents('../storage/dump.sql');
    if ($db->multi_query($sql) === TRUE) {
        echo "Tablas creadas correctamente<br>";
    } else {
        echo "Error al crear las tablas: " . $db->error . "<br>";
    }
    
    mysqli_close($db);
    outputJson([], 201);
}


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

function getAlumnosusuarioConParametros($idUsuario){
    $db = conectarBD();
    $sql = "SELECT * FROM alumnos WHERE id_usuario = '$idUsuario'";
    $result = mysqli_query($db, $sql);
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }
    $ret = [];
    while ($fila = mysqli_fetch_assoc($result)) {
        settype($fila['id_alumno'], 'integer');
        settype($fila['id_usuario'], 'integer');
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

function getProfesoresConParametros($idProfesor){
    $db = conectarBD();
    $sql = "SELECT * FROM profesores WHERE id_profesor = '$idProfesor'";
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

function getProfesoresusuarioConParametros($idUsuario){
    $db = conectarBD();
    $sql = "SELECT * FROM profesores WHERE id_usuario = '$idUsuario'";
    $result = mysqli_query($db, $sql);
    if ($result===false) {
        print mysqli_error($db);
        outputError(500);
    }
    $ret = [];
    while ($fila = mysqli_fetch_assoc($result)) {
        settype($fila['id_profesor'], 'integer');
        settype($fila['id_usuario'], 'integer');
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

function getAlumnosmateriasConParametros($idUsuario){
    $db = conectarBD();
    $sql = "SELECT m.nombre, m.icono 
        FROM materias m
        INNER JOIN alumnos_materias am ON m.id_materia = am.id_materia
        INNER JOIN alumnos a ON am.id_alumno = a.id_alumno
        WHERE a.id_alumno IN (SELECT id_alumno FROM alumnos WHERE id_usuario = '$idUsuario')
        GROUP BY m.id_materia";
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

function getAlumnosresenasdadasConParametros($id){
    $db = conectarBD();
    $sql = "SELECT r.id_resena, p.foto_path, p.nombre AS nombre_profesor, p.apellido AS apellido_profesor, r.estrellas, r.opinion
        FROM resenas r
        INNER JOIN profesores p ON r.id_usuario_receptor = p.id_usuario
        WHERE r.id_usuario_emisor = '$id'";
    
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

function getAlumnosresenasrecibidasConParametros($id){
    $db = conectarBD();
    $sql = "SELECT r.id_resena, a.nombre AS nombre_alumno, r.estrellas, r.opinion
        FROM resenas r
        INNER JOIN alumnos a ON r.id_usuario_receptor = a.id_usuario
        WHERE r.id_usuario_receptor = '$id'";
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

function getProfesoresmateriasConParametros($idUsuario){
    $db = conectarBD();
    $sql = "SELECT m.nombre, m.icono 
        FROM materias m
        INNER JOIN profesores_materias am ON m.id_materia = am.id_materia
        INNER JOIN profesores p ON am.id_profesor = p.id_profesor
        WHERE p.id_profesor IN (SELECT id_profesor FROM profesores WHERE id_usuario = '$idUsuario')
        GROUP BY m.id_materia";
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

function getProfesoresresenasdadasConParametros($id){
    $db = conectarBD();
    $sql = "SELECT r.id_resena, a.nombre AS nombre_alumno, r.estrellas, r.opinion
        FROM resenas r
        INNER JOIN alumnos a ON r.id_usuario_receptor = a.id_usuario
        WHERE r.id_usuario_emisor = '$id'";
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

function getProfesoresresenasrecibidasConParametros($id){
    $db = conectarBD();
    $sql = "SELECT r.id_resena, a.nombre AS nombre_alumno, r.estrellas, r.opinion
        FROM resenas r
        INNER JOIN alumnos a ON r.id_usuario_emisor = a.id_usuario
        WHERE r.id_usuario_receptor = '$id'";
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


function postMaterias(){
    $db = conectarBD();
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['nombre'])) {
        outputError(400);
    }

    $nombre = mysqli_real_escape_string($db, $data['nombre']);
    $sql = "INSERT INTO materias (nombre, icono) VALUES ('$nombre', 'materia.png')";
    
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
        outputError(400);
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
    $db = conectarBD();
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (empty($data)) {
        outputError(400);
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
        outputError(400);
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
        outputError(400);
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
    return getMateriasConParametros($id);
}


function deleteUsuarios($id) {
    $db = conectarBD();
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

    $sqlAlumnoMat = "DELETE FROM alumnos_materias WHERE id_alumno IN (SELECT id_alumno FROM alumnos WHERE id_usuario = $id)";
    $resultAlumnoMat = mysqli_query($db, $sqlAlumnoMat);

    if ($resultAlumnoMat === false) {
        print mysqli_error($db);
        outputError(500);
    }

    $sqlProfMat = "DELETE FROM profesores_materias WHERE id_profesor IN (SELECT id_profesor FROM profesores WHERE id_usuario = $id)";
    $resultProfMat = mysqli_query($db, $sqlProfMat);

    if ($resultProfMat === false) {
        print mysqli_error($db);
        outputError(500);
    }

    $sqlAlumno = "DELETE FROM alumnos WHERE id_usuario = $id";
    $resultAlumno = mysqli_query($db, $sqlAlumno);

    if ($resultAlumno === false) {
        print mysqli_error($db);
        outputError(500);
    }

    $sqlProfesor = "DELETE FROM profesores WHERE id_usuario = $id";
    $resultProfesor = mysqli_query($db, $sqlProfesor);

    if ($resultProfesor === false) {
        print mysqli_error($db);
        outputError(500);
    }

    $sqlUsuario = "DELETE FROM usuarios WHERE id_user = $id";
    $resultUsuario = mysqli_query($db, $sqlUsuario);

    if ($resultUsuario === false) {
        print mysqli_error($db);
        outputError(500);
    }

    mysqli_close($db);
    outputJson(['id_user' => $id]);
}

function deleteAlumnos($id_alumno) {
    $db = conectarBD();

    $sqlAlumnoRes = "DELETE FROM alumnos_resenas WHERE id_alumno = '$id_alumno'";
    $resultAlumnoRes = mysqli_query($db, $sqlAlumnoRes);

    if ($resultAlumnoRes === false) {
        print mysqli_error($db);
        outputError(500);
    }

    $sqlAlumnoMat = "DELETE FROM alumnos_materias WHERE id_alumno = '$id_alumno'";
    $resultAlumnoMat = mysqli_query($db, $sqlAlumnoMat);

    if ($resultAlumnoMat === false) {
        print mysqli_error($db);
        outputError(500);
    }

    $sqlUsuario = "DELETE FROM usuarios WHERE id_user IN (SELECT id_usuario FROM alumnos WHERE id_alumno = '$id_alumno')";
    $resultUsuario = mysqli_query($db, $sqlUsuario);

    if ($resultUsuario === false) {
        print mysqli_error($db);
        outputError(500);
    }

    $sqlAlumno = "DELETE FROM alumnos WHERE id_usuario = '$id_alumno'";
    $resultAlumno = mysqli_query($db, $sqlAlumno);

    if ($resultAlumno === false) {
        print mysqli_error($db);
        outputError(500);
    }

    mysqli_close($db);
    outputJson(['id_alumno' => $id_alumno]);
}

function deleteProfesores($id_profesor) {
    if (empty($id_profesor) || !is_numeric($id_profesor)) {
        outputError(400);
    }

    $db = conectarBD();

    $sqlProfRes = "DELETE FROM profesores_resenas WHERE id_profesor = $id_profesor";
    $resultProfRes = mysqli_query($db, $sqlProfRes);

    if ($resultProfRes === false) {
        print mysqli_error($db);
        outputError(500);
    }

    $sqlProfMat = "DELETE FROM profesores_materias WHERE id_profesor = $id_profesor";
    $resultProfMat = mysqli_query($db, $sqlProfMat);

    if ($resultProfMat === false) {
        print mysqli_error($db);
        outputError(500);
    }

    $sqlProf = "DELETE FROM profesores WHERE id_profesor = $id_profesor";
    $resultProf = mysqli_query($db, $sqlProf);

    if ($resultProf === false) {
        print mysqli_error($db);
        outputError(500);
    }

    $sqlUsuario = "DELETE FROM usuarios WHERE id_user IN (SELECT id_usuario FROM profesor WHERE id_profesor = '$id_profesor')";
    $resultUsuario = mysqli_query($db, $sqlUsuario);

    if ($resultUsuario === false) {
        print mysqli_error($db);
        outputError(500);
    }

    mysqli_close($db);
    outputJson(['id_profesor' => $id_profesor]);
}

function deleteMaterias($id) {
    $db = conectarBD();

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

    $sqlMateria = "DELETE FROM materias WHERE id_materia = $id";
    $resultMateria = mysqli_query($db, $sqlMateria);

    if ($resultMateria === false) {
        print mysqli_error($db);
        outputError(500);
    }

    mysqli_close($db);
    outputJson(['id_materia' => $id]);
}

function postLogin() {
    $db = conectarBD();
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['mail']) || !isset($data['password'])) {
        outputError(400);
    }

    $mail = mysqli_real_escape_string($db, $data['mail']);
    $password = mysqli_real_escape_string($db, $data['password']);

    $sql = "SELECT * FROM usuarios WHERE mail = '$mail' AND password = '$password'";
    $result = mysqli_query($db, $sql);

    if ($result === false) {
        print mysqli_error($db);
    }

    $user = mysqli_fetch_assoc($result);

    if (!$user) {
        outputError(401);
    }

    mysqli_close($db);
    outputJson($user);
}
