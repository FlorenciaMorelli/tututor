<?php
session_start();
include "../config/config.php";

function checkLogin(){
    if(isset($_POST['mail']) && isset($_POST['password']) && isset($_POST['role']) ){
        function test_input($data) {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        $mail = test_input($_POST['mail']);
        $password = test_input($_POST['password']);
        $role = test_input($_POST['role']); //Lo dejo para referencia para el sign up, pero no debería preguntar el rol en el login
        
        if(empty($mail)){
            header("Location: /index.html?error=User Name is Required"); //Cambiar index.html al login cuando esté desarrollado
        } else if(empty($password)){
            header("Location: /index.html?error=Password is Required"); //Cambiar index.html al login cuando esté desarrollado
        } else {
            // Hash
            $password = md5($password);
            
            $sql = "SELECT * FROM usuarios WHERE mail='$mail' AND password='$password'";
            $result = mysqli_query($link, $sql);

            if(mysqli_num_rows($result) === 1){
                //usuario unico
                $row = mysqli_fetch_assoc($result);
                if($row['password'] === $password && $row['role'] == $role){
                    $_SESSION['name'] = $row ['name'];
                    $_SESSION['id'] = $row ['id'];
                    $_SESSION['role'] = $row ['role'];
                    $_SESSION['mail'] = $row ['mail'];

                    header("Location: /dashboard.html"); //Cambiar dashboard.html al login cuando esté desarrollado
                }
            } else {
                header("Location: /index.html?error=Mail o Contrasena Incorrectos"); //Cambiar index.html al login cuando esté desarrollado
            }
        }
    } else {
        header("Location: /index.html"); //Cambiar index.html al login cuando esté desarrollado
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