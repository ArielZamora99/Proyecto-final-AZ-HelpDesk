/*
=============================================================
 PROYECTO: HELP DESK AZ
 TABLAS DE BASE DE DATOS:
 AUTOR: ARIEL ZAMORA
 FECHA: 28-07-2026
=============================================================
*/

-- ==========================================================
-- TABLA ROLES
-- ==========================================================

CREATE TABLE roles(

    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL UNIQUE,
    descripcion VARCHAR(150),
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

);

-- ==========================================================
-- TABLA USUARIOS
-- ==========================================================

CREATE TABLE usuarios(

    id_usuario SERIAL PRIMARY KEY,
    nombres VARCHAR(80) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    correo VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    id_rol INTEGER NOT NULL,

    CONSTRAINT fk_usuario_rol
        FOREIGN KEY(id_rol)
        REFERENCES roles(id_rol)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

);

-- ==========================================================
-- TABLA CATEGORIAS
-- ==========================================================

CREATE TABLE categorias(

    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(200),
    activo BOOLEAN NOT NULL DEFAULT TRUE

);

-- ==========================================================
-- TABLA PRIORIDADES
-- ==========================================================

CREATE TABLE prioridades(

    id_prioridad SERIAL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL UNIQUE,
    nivel SMALLINT NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT chk_prioridad
    CHECK(nivel BETWEEN 1 AND 4)

);

-- ==========================================================
-- TABLA ESTADOS
-- ==========================================================

CREATE TABLE estados(

    id_estado SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL UNIQUE,
    descripcion VARCHAR(200),
    activo BOOLEAN NOT NULL DEFAULT TRUE
);

-- ==========================================================
-- TABLA TICKETS
-- ==========================================================

CREATE TABLE tickets(

    id_ticket SERIAL PRIMARY KEY,
    codigo VARCHAR(15) NOT NULL UNIQUE,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP,
    fecha_cierre TIMESTAMP,
    id_usuario INTEGER NOT NULL,
    id_tecnico INTEGER,
    id_categoria INTEGER NOT NULL,
    id_prioridad INTEGER NOT NULL,
    id_estado INTEGER NOT NULL,

    CONSTRAINT fk_ticket_usuario
        FOREIGN KEY(id_usuario)
        REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_ticket_tecnico
        FOREIGN KEY(id_tecnico)
        REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_ticket_categoria
        FOREIGN KEY(id_categoria)
        REFERENCES categorias(id_categoria)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_ticket_prioridad
        FOREIGN KEY(id_prioridad)
        REFERENCES prioridades(id_prioridad)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_ticket_estado
        FOREIGN KEY(id_estado)
        REFERENCES estados(id_estado)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

);

-- ==========================================================
-- TABLA HISTORIAL
-- ==========================================================

CREATE TABLE historial_tickets(

    id_historial SERIAL PRIMARY KEY,
    id_ticket INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    accion VARCHAR(100) NOT NULL,
    observacion TEXT,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_historial_ticket
        FOREIGN KEY(id_ticket)
        REFERENCES tickets(id_ticket)
        ON DELETE CASCADE,

    CONSTRAINT fk_historial_usuario
        FOREIGN KEY(id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE RESTRICT

);

-- ==========================================================
-- TABLA COMENTARIOS
-- ==========================================================

CREATE TABLE comentarios(

    id_comentario SERIAL PRIMARY KEY,

    id_ticket INTEGER NOT NULL,

    id_usuario INTEGER NOT NULL,

    comentario TEXT NOT NULL,

    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_comentario_ticket
        FOREIGN KEY(id_ticket)
        REFERENCES tickets(id_ticket)
        ON DELETE CASCADE,

    CONSTRAINT fk_comentario_usuario
        FOREIGN KEY(id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE RESTRICT

);

-- ==========================================================
-- INDICES
-- ==========================================================

CREATE INDEX idx_ticket_estado
ON tickets(id_estado);

CREATE INDEX idx_ticket_categoria
ON tickets(id_categoria);

CREATE INDEX idx_ticket_prioridad
ON tickets(id_prioridad);

CREATE INDEX idx_ticket_usuario
ON tickets(id_usuario);

CREATE INDEX idx_ticket_tecnico
ON tickets(id_tecnico);

CREATE INDEX idx_historial_ticket
ON historial_tickets(id_ticket);

CREATE INDEX idx_comentario_ticket
ON comentarios(id_ticket);

