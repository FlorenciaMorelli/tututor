<?php
require_once(__DIR__.'/../config/generals.php');

function iniciarSesion($usuario) {
    session_start();
    $_SESSION['id_user'] = $usuario['id_user'];
    $_SESSION['mail'] = $usuario['mail'];
    $_SESSION['rol'] = $usuario['rol'];
}

function cerrarSesion() {
    session_start();
    session_destroy();
    header('Location: /');
}

function estaAutenticado() {
    session_start();
    return isset($_SESSION['id_user']);
}

function getUsuarioAutenticado() {
    if (estaAutenticado()) {
        $db = conectarBD();
        $stmt = $db->prepare("SELECT * FROM usuarios WHERE id_user = :id_user");
        $stmt->execute(['id_user' => $_SESSION['id_user']]);
        return $stmt->fetch();
    }
    return null;
}

function registrarUsuario($mail, $password, $rol) {
    $db = conectarBD();
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $db->prepare("INSERT INTO usuarios (mail, password_hash, rol, fecha_creacion) VALUES (:mail, :password_hash, :rol, NOW())");
    $stmt->execute(['mail' => $mail, 'password_hash' => $passwordHash, 'rol' => $rol]);
    return mysqli_insert_id($db);
}