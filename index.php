<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include "./backend/api.php"; ?>
    <title>Document</title>
</head>
<body>
    <h1>Las materias más populares</h1>
    <div>
        <?php
            echo getTopMaterias();
        ?>
    </div>
</body>
</html>