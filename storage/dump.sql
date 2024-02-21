-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS tututor;

-- Selección de la base de datos
USE tututor;

-- Cración de tablas
CREATE TABLE IF NOT EXISTS usuarios (
    id_user INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    mail TEXT NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'alumno', 'profesor') NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL
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
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_user) ON DELETE CASCADE
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
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_user) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS materias (
    id_materia INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre TEXT NOT NULL,
    icono TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS alumnos_materias (
    id_alumno INT,
    id_materia INT,
    PRIMARY KEY (id_alumno, id_materia),
    FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno) ON DELETE CASCADE,
    FOREIGN KEY (id_materia) REFERENCES materias(id_materia) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS profesores_materias (
    id_profesor INT,
    id_materia INT,
    PRIMARY KEY (id_profesor, id_materia),
    FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor) ON DELETE CASCADE,
    FOREIGN KEY (id_materia) REFERENCES materias(id_materia) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS resenas (
    id_resena INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_usuario_emisor INT NOT NULL,
    id_usuario_receptor INT NOT NULL,
    estrellas INT,
    opinion TEXT,
    FOREIGN KEY (id_usuario_emisor) REFERENCES usuarios(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario_receptor) REFERENCES usuarios(id_user) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS alumnos_resenas (
    id_alumno INT,
    id_resena INT,
    PRIMARY KEY (id_alumno, id_resena),
    FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno) ON DELETE CASCADE,
    FOREIGN KEY (id_resena) REFERENCES resenas(id_resena) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS profesores_resenas (
    id_profesor INT,
    id_resena INT,
    PRIMARY KEY (id_profesor, id_resena),
    FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor) ON DELETE CASCADE,
    FOREIGN KEY (id_resena) REFERENCES resenas(id_resena) ON DELETE CASCADE
);

-- Inyección de datos de ejemplo
INSERT INTO materias (nombre, icono) VALUES 
('Matemática', 'matematica.png'),
('Literatura', 'literatura.png'),
('Inglés', 'ingles.png'),
('Cívica', 'civica.png'),
('Biología', 'biologia.png'),
('Linguística', 'linguistica.png'),
('Física', 'fisica.png'),
('Química', 'quimica.png');

INSERT INTO usuarios (mail, password_hash, rol) VALUES 
('alumno1@email.com', 'contrasena1', 'alumno'),
('alumno2@email.com', 'contrasena2', 'alumno'),
('profesor1@email.com', 'contrasena3', 'profesor'),
('profesor2@email.com', 'contrasena4', 'profesor'),
('admin@email.com', 'contrasena5', 'admin');

INSERT INTO alumnos (id_usuario, nombre, zona, puntuacion) VALUES 
(1, 'Alumno1', 'Buenos Aires Zona Norte', 4.5),
(2, 'Alumno2', 'Buenos Aires Zona Sur', 3.8);

INSERT INTO profesores (id_usuario, nombre, apellido, zona, modalidad, puntuacion) VALUES 
(3, 'Profesor1', 'Apellido1', 'CABA', 'En casa', 4.9),
(4, 'Profesor2', 'Apellido2', 'Buenos Aires Interior', 'Punto de encuentro', 4.7);

INSERT INTO alumnos_materias (id_alumno, id_materia) VALUES 
(1, 1), (1, 3), (2, 2), (2, 3);

INSERT INTO profesores_materias (id_profesor, id_materia) VALUES 
(1, 1), (1, 3), (2, 2), (2, 4);

INSERT INTO resenas (id_usuario_emisor, id_usuario_receptor, estrellas, opinion) VALUES 
(1, 3, 5, 'Profesor muy dedicado y excelente en Matemáticas.'),
(2, 4, 4, 'Buen profesor de Historia, explica de manera clara.');