<?php
require_once(__DIR__.'/../config/generals.php');

$db = conectarBD();

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['mail']) || !isset($data['password_hash'])) {
    if(empty($data['mail'])) {
        echo '<div class="alert alert-primary" role="alert">
                Debe ingresar un correo electrónico
            </div>';
    } else if($data['password_hash']){
        echo '<div class="alert alert-primary" role="alert">
                Debe ingresar una contraseña válida
            </div>';
    }
} else {
    $mail = mysqli_real_escape_string($db, $data['mail']);
    $password = mysqli_real_escape_string($db, $data['password_hash']);
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    
    
    $sql = "SELECT * FROM usuarios WHERE mail='$mail'";
    $result = mysqli_query($db, $sql);
    
    if(mysqli_num_rows($result) === 1){
        $usuario = mysqli_fetch_assoc($result);
        if($usuario['password_hash'] === $password){
            iniciarSesion($usuario);
        }
        outputJson($usuario);
    } else {
        outputError(403);
    }
}