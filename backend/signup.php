<?php
function conectarBase() {
    include "../config/config.php";

    $db = mysqli_connect(DBHOST, DBUSER, DBPASS, DBBASE);

    if (!$db) {
        die("Falló la conexión: " . mysqli_connect_error());
    }

    return $db;
}

$db = conectarBase();

if(!filter_var($_POST['newMail'], FILTER_VALIDATE_EMAIL)){
    echo '<div class="alert alert-primary" role="alert">
                El mail ingresado no tiene un formato válido.
            </div>';
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['newMail']) || !isset($data['newPassword']) || !isset($data['newConfirmPassword']) || !isset($data['newRole'])) {
    outputError(400); // Bad Request, Datos faltantes
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
    /* 
        1. Adjust it by modifying {8,}
        2. You can remove this condition by removing (?=.*?[A-Z])
        3. You can remove this condition by removing (?=.*?[a-z])
        4. You can remove this condition by removing (?=.*?[0-9])
        5. You can remove this condition by removing (?=.*?[#?!@$%^&*-])");
    */
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
    header("Location: /");
} else {
    if($db->errno === 1062){
        die("El mail que ingresaste ya está registrado");
    } else {
        die($db->error . " " . $db->errno);
    }
}

mysqli_close($db);