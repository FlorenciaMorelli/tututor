<?php
include "../config/config.php";

session_start();

if(isset($_SESSION["loggedUserId"])){
    $db = conectarBD();
    $sql = "SELECT * FROM usuarios
            WHERE id = {$_SESSION["loggedUserId"]}";
    $result = $db->query($sql);
    $usuario = $result->fetch_assoc();
}

/*

if(isset($usuario)){

} else {

} 

*/