const pool = require('../config/database');
const historialModel = require('./AZ_historialModel');

/* ==========================================================
   OBTENER TODOS LOS TICKETS
========================================================== */
const obtenerTickets = async () => {
    const resultado = await pool.query(`
        SELECT
            t.id_ticket,
            t.codigo,
            t.titulo,
            t.descripcion,
            t.fecha_creacion,
            t.fecha_actualizacion,
            t.fecha_cierre,

            u.nombres || ' ' || u.apellidos AS usuario,
            tec.nombres || ' ' || tec.apellidos AS tecnico,
            c.nombre AS categoria,
            p.nombre AS prioridad,
            e.nombre AS estado
        FROM tickets t

        INNER JOIN usuarios u
            ON t.id_usuario = u.id_usuario
        LEFT JOIN usuarios tec
            ON t.id_tecnico = tec.id_usuario
        INNER JOIN categorias c
            ON t.id_categoria = c.id_categoria
        INNER JOIN prioridades p
            ON t.id_prioridad = p.id_prioridad
        INNER JOIN estados e
            ON t.id_estado = e.id_estado
        ORDER BY t.id_ticket;
    `);
    return resultado.rows;
};

const obtenerTicketsAdministracion = async()=>{
    const resultado=await pool.query(`
        SELECT
            t.id_ticket,
            t.codigo,
            t.titulo,
            t.descripcion,
            t.id_tecnico,
            t.id_estado,
            t.id_prioridad,
            t.id_categoria,
            u.nombres||' '||u.apellidos usuario,
            te.nombres||' '||te.apellidos tecnico,
            p.nombre prioridad,
            e.nombre estado
        FROM tickets t
        INNER JOIN usuarios u
        ON t.id_usuario=u.id_usuario
        LEFT JOIN usuarios te
        ON t.id_tecnico=te.id_usuario
        INNER JOIN prioridades p
        ON t.id_prioridad=p.id_prioridad
        INNER JOIN estados e
        ON t.id_estado=e.id_estado
        ORDER BY t.id_ticket;
    `);

    return resultado.rows;

};

// ==========================================================
// OBTENER TICKETS ASIGNADOS AL TECNICO
// ==========================================================
const obtenerTicketsTecnico = async(id_tecnico)=>{
    const resultado = await pool.query(`
    SELECT
        t.id_ticket,
        t.codigo,
        t.titulo,
        t.descripcion,
        t.id_tecnico,
        t.id_estado,
        t.id_prioridad,
        t.id_categoria,

        u.nombres || ' ' || u.apellidos AS usuario,
        c.nombre AS categoria,
        p.nombre AS prioridad,
        e.nombre AS estado

    FROM tickets t

    INNER JOIN usuarios u
    ON t.id_usuario = u.id_usuario

    INNER JOIN categorias c
    ON t.id_categoria = c.id_categoria

    INNER JOIN prioridades p
    ON t.id_prioridad = p.id_prioridad

    INNER JOIN estados e
    ON t.id_estado = e.id_estado

    WHERE t.id_tecnico = $1

    ORDER BY t.id_ticket;

    `,[id_tecnico]);
    return resultado.rows;
};

/* ==========================================================
   OBTENER TICKET POR ID
========================================================== */
const obtenerTicketPorId = async (id) => {
    const resultado = await pool.query(`
        SELECT
            t.id_ticket,
            t.codigo,
            t.titulo,
            t.descripcion,

            t.id_usuario,
            t.id_tecnico,
            t.id_categoria,
            t.id_prioridad,
            t.id_estado,

            t.fecha_creacion,
            t.fecha_actualizacion,
            t.fecha_cierre,

            u.nombres || ' ' || u.apellidos AS usuario,
            tec.nombres || ' ' || tec.apellidos AS tecnico,
            c.nombre AS categoria,
            p.nombre AS prioridad,
            e.nombre AS estado

        FROM tickets t

        INNER JOIN usuarios u
            ON t.id_usuario = u.id_usuario

        LEFT JOIN usuarios tec
            ON t.id_tecnico = tec.id_usuario

        INNER JOIN categorias c
            ON t.id_categoria = c.id_categoria

        INNER JOIN prioridades p
            ON t.id_prioridad = p.id_prioridad

        INNER JOIN estados e
            ON t.id_estado = e.id_estado

        WHERE t.id_ticket = $1;
    `, [id]);

    return resultado.rows[0];
};

/* ==========================================================
   CREAR TICKET
========================================================== */
const crearTicket = async (ticket) => {
    const {
        titulo,
        descripcion,
        id_usuario,
        id_categoria,
        id_prioridad
    } = ticket;

    // Obtener el siguiente código de ticket usando el último ID registrado
    const consultaCodigo = await pool.query(`
        SELECT COALESCE(MAX(id_ticket), 0) + 1 AS siguiente
        FROM tickets
    `);

    const numero = consultaCodigo.rows[0].siguiente;
    const codigo = `HD-${String(numero).padStart(6, '0')}`;

    const resultado = await pool.query(`
        INSERT INTO tickets(
            codigo,
            titulo,
            descripcion,
            id_usuario,
            id_tecnico,
            id_categoria,
            id_prioridad,
            id_estado
        )
        VALUES ($1, $2, $3, $4, NULL, $5, $6, 1)
        RETURNING *;
    `,
    [
        codigo,
        titulo,
        descripcion,
        id_usuario,
        id_categoria,
        id_prioridad
    ]);

    const nuevoTicket = resultado.rows[0];

    await historialModel.crearHistorial({
        id_ticket:nuevoTicket.id_ticket,
        id_usuario:id_usuario,
        accion:"Ticket creado",
        observacion:"Estado inicial: Abierto"
    });
    return nuevoTicket;
};

    
/* ==========================================================
   ACTUALIZAR TICKET
========================================================== */
const actualizarTicket = async (id, ticket) => {

    const {
        titulo,
        descripcion,
        id_tecnico,
        id_categoria,
        id_prioridad,
        id_estado
    } = ticket;

    // ==========================================================
    // OBTENER DATOS ACTUALES DEL TICKET
    // ==========================================================
    const ticketActual = await pool.query(`
        SELECT
            id_usuario,
            id_tecnico,
            id_estado
        FROM tickets
        WHERE id_ticket = $1
    `, [id]);

    if (ticketActual.rows.length === 0) {
        return null;
    }

    const actual = ticketActual.rows[0];

    // ==========================================================
    // GUARDAR VALORES ANTERIORES
    // ==========================================================
    let tecnicoNuevo;
    if (
        id_tecnico === undefined ||
        id_tecnico === null ||
        id_tecnico === ""
    ) {
        tecnicoNuevo = actual.id_tecnico;
    } else {
        tecnicoNuevo = Number(id_tecnico);
    }
    // nuevo estado 
    const estadoNuevo = Number(id_estado);

    // ==========================================================
    // COMPROBAR SI REALMENTE CAMBIÓ EL ESTADO
    // ==========================================================
    const cambioEstado =
       Number(actual.id_estado) !== Number(estadoNuevo);

    // ==========================================================
    // ACTUALIZAR TICKET
    // ==========================================================
    const resultado = await pool.query(`
        UPDATE tickets
        SET
            titulo = $1,
            descripcion = $2,
            id_tecnico = $3,
            id_categoria = $4,
            id_prioridad = $5,
            id_estado = $6,
            fecha_actualizacion = NOW()
        WHERE id_ticket = $7
        RETURNING *;
    `, [
        titulo,
        descripcion,
        tecnicoNuevo,
        id_categoria,
        id_prioridad,
        estadoNuevo,
        id
    ]);

    const actualizado = resultado.rows[0];

    // ==========================================================
    // 1. ASIGNACIÓN DE TÉCNICO
    // ==========================================================
    if (cambioEstado) {

        const estados = await pool.query(`
            SELECT
                id_estado,
                nombre
            FROM estados
            WHERE id_estado IN ($1, $2)
        `, [
            actual.id_estado,
            estadoNuevo
        ]);

    
        let nombreEstadoAnterior = "Desconocido";
        let nombreEstadoNuevo = "Desconocido";
            estados.rows.forEach(estado => {

            if (
                Number(estado.id_estado) ===
                Number(actual.id_estado)
            ) {
                nombreEstadoAnterior = estado.nombre;
            }


            if (
                Number(estado.id_estado) ===
                Number(estadoNuevo)
            ) {
                nombreEstadoNuevo = estado.nombre;
            }

        });/* ==============================================
           USUARIO QUE REALIZA EL CAMBIO

           Primero usamos el técnico actual.
           Si no existe, usamos el usuario que creó
           el ticket.
        ============================================== */

        const usuarioHistorial =
            tecnicoNuevo ||
            actual.id_tecnico ||
            actual.id_usuario;


        await historialModel.crearHistorial({

            id_ticket: id,

            id_usuario: usuarioHistorial,

            accion: "Cambio de estado",

            observacion:
                `Estado anterior: ${nombreEstadoAnterior} | Estado nuevo: ${nombreEstadoNuevo}`

        });

    }


    return actualizado;
};


/* ==========================================================
   ELIMINAR TICKET
========================================================== */
const eliminarTicket = async (id) => {

    const resultado = await pool.query(`
        DELETE FROM tickets
        WHERE id_ticket = $1
        RETURNING *;
    `, [id]);

    return resultado.rows[0];
};


/* ==========================================================
   CREAR HISTORIAL
========================================================== */
const crearHistorial = async (
    id_ticket,
    id_usuario,
    accion,
    observacion
) => {

    const resultado = await pool.query(`
        INSERT INTO historial_tickets
        (
            id_ticket,
            id_usuario,
            accion,
            observacion
        )
        VALUES
        ($1, $2, $3, $4)

        RETURNING *;
    `, [
        id_ticket,
        id_usuario,
        accion,
        observacion
    ]);

    return resultado.rows[0];
};


/* ==========================================================
   EXPORTAR
========================================================== */
module.exports = {
    obtenerTickets,
    obtenerTicketsAdministracion,
    obtenerTicketsTecnico,
    obtenerTicketPorId,
    crearTicket,
    actualizarTicket,
    eliminarTicket,
    crearHistorial
};