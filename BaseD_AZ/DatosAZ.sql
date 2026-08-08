/*
=============================================================
 PROYECTO: HELP DESK AZ
 ARCHIVO: DATOS DE PRUEBA
=============================================================
*/

-- ==========================================================
-- ROLES
-- ==========================================================

INSERT INTO roles (nombre, descripcion) VALUES
('Administrador','Control total del sistema'),
('Técnico','Gestiona y resuelve tickets'),
('Usuario','Reporta incidencias');

-- ==========================================================
-- CATEGORÍAS
-- ==========================================================

INSERT INTO categorias (nombre, descripcion) VALUES
('Equipo','Problemas relacionados con equipos físicos'),
('Sistema','Errores o fallos en aplicaciones'),
('Red','Problemas de conectividad'),
('Base de Datos','Incidentes relacionados con PostgreSQL u otros motores'),
('Correo','Problemas con correo electrónico'),
('Seguridad','Incidentes de seguridad informática');

-- ==========================================================
-- PRIORIDADES
-- ==========================================================

INSERT INTO prioridades (nombre,nivel) VALUES
('Baja',1),
('Media',2),
('Alta',3),
('Crítica',4);

-- ==========================================================
-- ESTADOS
-- ==========================================================

INSERT INTO estados (nombre,descripcion) VALUES
('Abierto','Ticket recién creado'),
('Asignado','Asignado a un técnico'),
('En Proceso','El técnico está trabajando'),
('Resuelto','Incidente solucionado'),
('Cerrado','Ticket finalizado');

-- ==========================================================
-- USUARIOS
-- ==========================================================

INSERT INTO usuarios
(
nombres,
apellidos,
correo,
password_hash,
telefono,
id_rol
)

VALUES

(
'Administrador',
'Sistema',
'admin@helpdesk.com',
'admin123',
'0923121156',
1
),

(
'Carlos',
'zamora',
'carlos@helpdesk.com',
'carlos123',
'0912345678',
2
),

(
'María',
'zamora',
'maria@helpdesk.com',
'maria123',
'0998933733',
2
),

(
'Juan',
'zamora',
'juan@helpdesk.com',
'juan123',
'0994489744',
3
),

(
'Ariel',
'zamora',
'ana@helpdesk.com',
'ariel123',
'0995234955',
3
);

-- ==========================================================
-- TICKETS
-- ==========================================================

INSERT INTO tickets
(
codigo,
titulo,
descripcion,
id_usuario,
id_tecnico,
id_categoria,
id_prioridad,
id_estado
)

VALUES

(
'HD-000001',
'Computador no enciende',
'El equipo no responde al presionar el botón de encendido.',
4,
2,
1,
4,
2
),

(
'HD-000002',
'No funciona Outlook',
'No puedo enviar ni recibir correos.',
5,
3,
5,
3,
3
),

(
'HD-000003',
'Sin conexión a Internet',
'No existe acceso a Internet desde el departamento financiero.',
4,
2,
3,
4,
2
),

(
'HD-000004',
'Error al abrir el sistema contable',
'El sistema genera un mensaje de error al iniciar.',
5,
3,
2,
3,
1
),

(
'HD-000005',
'Problema conexion Base de datos',
'La base de datos no permite nuevas conexiones.',
4,
2,
4,
4,
3
),

(
'HD-000006',
'Impresora no imprime',
'La impresora permanece en cola.',
5,
3,
1,
2,
1
),

(
'HD-000007',
'Lentitud en el computador',
'El sistema operativo tarda demasiado en iniciar.',
4,
2,
1,
2,
2
),

(
'HD-000008',
'Actualización de software',
'Se requiere actualizar Microsoft Office.',
5,
3,
2,
1,
4
),

(
'HD-000009',
'Cambio de contraseña',
'El usuario olvidó su contraseña.',
4,
2,
6,
1,
5
),

(
'HD-000010',
'Caída del servidor',
'El servidor principal dejó de responder.',
5,
2,
4,
4,
3
);

-- ==========================================================
-- HISTORIAL
-- ==========================================================

INSERT INTO historial_tickets
(
id_ticket,
id_usuario,
accion,
observacion
)

VALUES

(1,2,'Asignación','El ticket fue asignado al técnico Carlos'),

(2,3,'Actualización','Se ajustó la configuración del correo Outlook'),

(3,2,'Diagnóstico','Se inspeccionó el funcionamiento del switch principal'),

(4,3,'Creación','Se generó un nuevo registro de ticket'),

(5,2,'Investigación','Se analizaron las conexiones hacia PostgreSQL'),

(6,3,'Creación','Se creó correctamente el ticket en el sistema'),

(7,2,'Actualización','Se efectuó el mantenimiento y limpieza del equipo'),

(8,3,'Resuelto','Se completó la actualización del software'),

(9,2,'Cierre','La contraseña del usuario fue restablecida con éxito'),

(10,2,'Diagnóstico','Se reinició el servidor para verificar su funcionamiento');

-- ==========================================================
-- COMENTARIOS
-- ==========================================================

INSERT INTO comentarios
(
id_ticket,
id_usuario,
comentario
)

VALUES
(1,2,'Se realizará una inspección de la fuente de alimentación.'),

(2,3,'Actualmente se verifica la configuración de la cuenta de Outlook.'),

(3,2,'Se efectuó el cambio del cable de conexión a la red.'),

(4,3,'Se encuentra a la espera de la confirmación del usuario.'),

(5,2,'Se detectó un exceso de conexiones activas en la base de datos.'),

(6,3,'Se reinició el servicio encargado de las impresiones.'),

(7,2,'El equipo opera con normalidad después de la revisión.'),

(8,3,'La instalación de las actualizaciones concluyó satisfactoriamente.'),

(9,2,'El usuario confirmó que pudo ingresar nuevamente al sistema.'),

(10,2,'El servidor fue restaurado y se encuentra en funcionamiento.');
