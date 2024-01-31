-- Creación del usuario de la base de datos
CREATE USER 'MorelliFinal'@'localhost' IDENTIFIED BY 'ExamenFlorencia';

-- Concesión de privilegios al usuario
GRANT ALL PRIVILEGES ON *.* TO 'MorelliFinal'@'localhost' WITH GRANT OPTION;

-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS tututor;

-- Selección de la base de datos
USE tututor;

-- Cración de tablas
CREATE TABLE IF NOT EXISTS usuarios (
    id_user INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    mail TEXT NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS alumnos (
    id_alumno INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_usuario INT NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT,
    zona TEXT NOT NULL,
    direccion TEXT,
    foto_path TEXT,
    puntuacion FLOAT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_user)
);

CREATE TABLE IF NOT EXISTS profesores (
    id_profesor INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_usuario INT NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    modalidad TEXT NOT NULL,
    zona TEXT NOT NULL,
    direccion TEXT,
    foto_path TEXT,
    archivos_path TEXT,
    puntuacion FLOAT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_user)
);

CREATE TABLE IF NOT EXISTS materias (
    id_materia INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre TEXT NOT NULL,
    icono BLOB NOT NULL
);

CREATE TABLE IF NOT EXISTS alumnos_materias (
    id_alumno INT,
    id_materia INT,
    PRIMARY KEY (id_alumno, id_materia),
    FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno),
    FOREIGN KEY (id_materia) REFERENCES materias(id_materia)
);

CREATE TABLE IF NOT EXISTS profesores_materias (
    id_profesor INT,
    id_materia INT,
    PRIMARY KEY (id_profesor, id_materia),
    FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor),
    FOREIGN KEY (id_materia) REFERENCES materias(id_materia)
);

CREATE TABLE IF NOT EXISTS resenas (
    id_resena INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_usuario_emisor INT NOT NULL,
    id_usuario_receptor INT NOT NULL,
    estrellas INT,
    opinion TEXT,
    FOREIGN KEY (id_usuario_emisor) REFERENCES usuarios(id_user),
    FOREIGN KEY (id_usuario_receptor) REFERENCES usuarios(id_user)
);

CREATE TABLE IF NOT EXISTS alumnos_resenas (
    id_alumno INT,
    id_resena INT,
    PRIMARY KEY (id_alumno, id_resena),
    FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno),
    FOREIGN KEY (id_resena) REFERENCES resenas(id_resena)
);

CREATE TABLE IF NOT EXISTS profesores_resenas (
    id_profesor INT,
    id_resena INT,
    PRIMARY KEY (id_profesor, id_resena),
    FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor),
    FOREIGN KEY (id_resena) REFERENCES resenas(id_resena)
);

-- Inyección de datos de ejemplo
INSERT INTO materias (nombre, icono) VALUES 
('Matemáticas', 'https://via.placeholder.com/150'),
('Historia', 'https://via.placeholder.com/150'),
('Ciencias', 'https://via.placeholder.com/150'),
('Arte', 'https://via.placeholder.com/150'),
('Literatura', 'https://via.placeholder.com/150'),
('Música', 'https://via.placeholder.com/150'),
('Física', 'https://via.placeholder.com/150');

INSERT INTO usuarios (mail, password, rol) VALUES 
('alumno1@email.com', 'contraseña1', 'alumno'),
('alumno2@email.com', 'contraseña2', 'alumno'),
('profesor1@email.com', 'contraseña3', 'profesor'),
('profesor2@email.com', 'contraseña4', 'profesor'),
('admin@email.com', 'contraseña5', 'admin');

INSERT INTO alumnos (id_usuario, nombre, zona, puntuacion) VALUES 
(1, 'Alumno1', 'Zona1', 4.5),
(2, 'Alumno2', 'Zona2', 3.8);

INSERT INTO profesores (id_usuario, nombre, zona, modalidad, puntuacion) VALUES 
(3, 'Profesor1', 'Zona3', 'Presencial', 4.9),
(4, 'Profesor2', 'Zona4', 'Virtual', 4.7);

INSERT INTO alumnos_materias (id_alumno, id_materia) VALUES 
(1, 1), (1, 3), (2, 2), (2, 3);

INSERT INTO profesores_materias (id_profesor, id_materia) VALUES 
(1, 1), (1, 3), (2, 2), (2, 4);

INSERT INTO resenas (id_usuario_emisor, id_usuario_receptor, estrellas, opinion) VALUES 
(1, 3, 5, 'Profesor muy dedicado y excelente en Matemáticas.'),
(2, 4, 4, 'Buen profesor de Historia, explica de manera clara.');