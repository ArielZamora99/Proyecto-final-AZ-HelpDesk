const pool = require('../config/database');

const obtenerHistorial = async () => {
    const resultado = await pool.query(`
       SELECT
            h.id_historial,
            t.id_ticket,
            t.codigo,
            t.titulo,

            c.nombre AS categoria,
            p.nombre AS prioridad,
            e.nombre AS estado,

            CONCAT(u.nombres,' ',u.apellidos) AS usuario,
            CONCAT(tec.nombres,' ',tec.apellidos) AS tecnico,

            h.accion,
            h.observacion,
            h.fecha
        FROM historial_tickets h
        INNER JOIN tickets t
            ON h.id_ticket = t.id_ticket
        INNER JOIN usuarios u
            ON h.id_usuario = u.id_usuario
        LEFT JOIN usuarios tec
            ON t.id_tecnico = tec.id_usuario
        INNER JOIN categorias c
            ON t.id_categoria = c.id_categoria
        INNER JOIN prioridades p
            ON t.id_prioridad = p.id_prioridad
        INNER JOIN estados e
            ON t.id_estado = e.id_estado
        ORDER BY h.fecha ASC;
    `);
    return resultado.rows;
};

const obtenerHistorialUsuario = async(id_usuario)=>{
    const resultado = await pool.query(`
        SELECT
            t.id_ticket,
            t.codigo,
            t.titulo,
            c.nombre AS categoria,
            p.nombre AS prioridad,
            e.nombre AS estado,
            tec.nombres || ' ' || tec.apellidos AS tecnico,
            h.accion,
            h.observacion,
            h.fecha


        FROM historial_tickets h
        INNER JOIN tickets t
        ON h.id_ticket=t.id_ticket
    
        INNER JOIN categorias c
        ON t.id_categoria=c.id_categoria

        INNER JOIN prioridades p
        ON t.id_prioridad=p.id_prioridad
        INNER JOIN estados e
        ON t.id_estado=e.id_estado

        LEFT JOIN usuarios tec
        ON t.id_tecnico=tec.id_usuario

        WHERE t.id_usuario=$1

        ORDER BY h.fecha ASC;
        `,[id_usuario]);
        return resultado.rows;
};

const obtenerHistorialTecnico = async(id_tecnico)=>{
    const resultado = await pool.query(`
        SELECT
            h.id_historial,
            t.id_ticket,
            t.codigo,
            t.titulo,

            c.nombre AS categoria,
            p.nombre AS prioridad,
            e.nombre AS estado,

            tec.nombres || ' ' || tec.apellidos AS tecnico,

            h.accion,
            h.observacion,
            h.fecha

        FROM historial_tickets h

        INNER JOIN tickets t
            ON h.id_ticket = t.id_ticket

        INNER JOIN categorias c
            ON t.id_categoria = c.id_categoria

        INNER JOIN prioridades p
            ON t.id_prioridad = p.id_prioridad

        INNER JOIN estados e
            ON t.id_estado = e.id_estado

        LEFT JOIN usuarios tec
            ON t.id_tecnico = tec.id_usuario

        WHERE t.id_tecnico = $1

        ORDER BY h.fecha DESC;
    `,[id_tecnico]);
    return resultado.rows;
};

const obtenerHistorialPorId = async (id) => {
    const resultado = await pool.query(`
        SELECT *
        FROM historial_tickets
        WHERE id_historial = $1;
    `,[id]);
    return resultado.rows[0];
};

const crearHistorial = async (historial) => {
    const {
        id_ticket,
        id_usuario,
        accion,
        observacion
    } = historial;
    const resultado = await pool.query(`
        INSERT INTO historial_tickets(
            id_ticket,
            id_usuario,
            accion,
            observacion
        )
        VALUES( $1, $2, $3, $4
        )
        RETURNING *;
    `,[
        id_ticket,
        id_usuario,
        accion,
        observacion
    ]);
    return resultado.rows[0];
};

const actualizarHistorial = async (id, historial) => {
    const {
        accion,
        observacion
    } = historial;
    const resultado = await pool.query(`
        UPDATE historial_tickets
        SET
            accion=$1,
            observacion=$2
        WHERE id_historial=$3
        RETURNING *;
    `,[
        accion,
        observacion,
        id
    ]);
    return resultado.rows[0];
};

const eliminarHistorial = async (id) => {
    const resultado = await pool.query(`
        DELETE FROM historial_tickets
        WHERE id_historial=$1
        RETURNING *;
    `,[id]);
    return resultado.rows[0];
};
module.exports = {
    obtenerHistorial,
    obtenerHistorialUsuario,
    obtenerHistorialTecnico,
    obtenerHistorialPorId,
    crearHistorial,
    actualizarHistorial,
    eliminarHistorial
};
