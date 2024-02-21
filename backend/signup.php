<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, X-Auth-Token");
header('Access-Control-Allow-Methods: POST, GET, PATCH, DELETE');
header("Allow: GET, POST, PATCH, DELETE");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
    return 0;    
}

require_once(__DIR__.'/../config/generals.php');

$db = conectarBD();

if(!filter_var($_POST['newMail'], FILTER_VALIDATE_EMAIL)){
    echo '<div class="alert alert-primary" role="alert">
                El mail ingresado no tiene un formato válido.
            </div>';
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['newMail']) || !isset($data['newPassword']) || !isset($data['newConfirmPassword']) || !isset($data['newRole'])) {
    outputError(400);
    if(empty($data['newMail'])) {
        echo '<div class="alert alert-primary" role="alert">
                Debe ingresar un correo electrónico
            </div>';
    } else if($data['newPassword']){
        echo '<div class="alert alert-primary" role="alert">
                Debe ingresar una contraseña válida
            </div>';
    } else if($data['newConfirmPassword']){
        echo '<div class="alert alert-primary" role="alert">
                Debe ingresar una contraseña válida
            </div>';
    } else {
        echo '<div class="alert alert-primary" role="alert">
                Debe elegir un rol
            </div>';
    }
}

$mail = mysqli_real_escape_string($db, $data['newMail']);
$password = mysqli_real_escape_string($db, $data['newPassword']);
$password_confirm = mysqli_real_escape_string($db, $data['newConfirmPassword']);
$rol = mysqli_real_escape_string($db, $data['newRole']);

$password_regex = "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/"; 

if(preg_match($password_regex, $password)){
    echo '<div class="alert alert-primary" role="alert">
            La contraseña debe:\n
            \tTener mínimo 8 caracteres.
            \tTener al menos una mayúscula.
            \tTener al menos una minúscula.
            \tTener al menos un dígito.
            \tTener al menos 1 caracter especial."
            </div>';
}

if($password != $password_confirm){
    echo '<div class="alert alert-primary" role="alert">
                Las contraseñas no coinciden.
            </div>';
}

$password_hash = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios (mail, password_hash, rol) VALUES (?, ?, ?)";

$stmt = $db->stmt_init();

if(!$stmt->prepare($sql)){
    die("SQL error: " . $db->error);
}

$stmt->bind_param("sss",
                    $mail,
                    $password_hash,
                    $rol);

if($stmt->execute()){
    outputJson('success', 'Usuario creado correctamente');
} else {
    if($db->errno === 1062){
        die("El mail que ingresaste ya está registrado");
    } else {
        die($db->error . " " . $db->errno);
    }
}

mysqli_close($db);