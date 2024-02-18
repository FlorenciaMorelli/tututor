<?php

function conectarBase() {
    include "../config/config.php";

    $db = mysqli_connect(DBHOST, DBUSER, DBPASS, DBBASE);

    if (!$db) {
        die("Falló la conexión: " . mysqli_connect_error());
    }

    return $db;
}

function outputJson($data, $codigo = 200)
{
    header('', true, $codigo);
    header('Content-type: application/json');
    print json_encode($data);
    die;
}

$db = conectarBase();

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
        //usuario unico
        $usuario = mysqli_fetch_assoc($result);
        if($usuario['password_hash'] === $password){
            $_SESSION['id_usuario'] = $usuario['id_user'];
            $_SESSION['rol'] = $usuario['rol'];
            $_SESSION['mail'] = $usuario['mail'];
        }
        outputJson($usuario);
    } else {
        echo "Usuario inexistente";
    }
}

/*
    PARA INFORMAR QUE FALTA UN DATO, EN EL INDEX.HTML SE DEBE AGREGAR LO SIGUIENTE:
    <?php if(isset($_GET['error'])){  ?>
        <div class="alert alert-danger" role="alert">
            <?=$_GET['error']?>
        </div>
    <?php } ?>
*/

/* PARA CONECTAR, EN DASHBOARD.HTML PONEMOS
    // Primera linea
    <?php
    session_start();
    if(isset($_SESSION['mail']) && isset($_SESSION['id']) ){ ?>
            //Todo el archivo html, y al final del arhivo ponemos:
        <?php } else {
            header("Location: /index.html"); //Cambiar index.html al login cuando esté desarrollado
        }
    } ?>
*/

//Para definir vista según usuario
/*
<?php
    if($_SESSION['role'] == 'admin'){ ?>
        <!-- HTML para el admin-->
    <?php } ?>
?> 
*/