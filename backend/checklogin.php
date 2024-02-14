<?php
include "../config/config.php";

$link = conectarBD();

if(isset($_POST['mail']) && isset($_POST['password'])){
    $mail = $_POST['mail'];
    $password = $_POST['password'];
    
    
    $sql = "SELECT * FROM usuarios WHERE mail='$mail'";
    $result = mysqli_query($link, $sql);

    if(mysqli_num_rows($result) === 1){
        //usuario unico
        $usuario = mysqli_fetch_assoc($result);
        if($usuario['password_hash'] === $password){
            $_SESSION['id_usuario'] = $usuario['id_user'];
            $_SESSION['rol'] = $usuario['rol'];
            $_SESSION['mail'] = $usuario['mail'];

            header("Location: /dashboard");
        }
    } else {
        header("Location: /error=Mail o Contrasena Incorrectos");
    }
} else {
    if(empty($mail)){
        echo '<div class="alert alert-primary" role="alert">
                Debe ingresar un correo electrónico
            </div>';
    } else if(empty($password)){
        echo '<div class="alert alert-primary" role="alert">
                Debe ingresar una contraseña válida
            </div>';
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