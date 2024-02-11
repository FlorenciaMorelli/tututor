-- Creación del usuario de la base de datos
CREATE USER 'MorelliFinal'@'localhost' IDENTIFIED BY 'ExamenFlorencia';

-- Concesión de privilegios al usuario
GRANT ALL PRIVILEGES ON *.* TO 'MorelliFinal'@'localhost' WITH GRANT OPTION;
