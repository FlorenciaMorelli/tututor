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
