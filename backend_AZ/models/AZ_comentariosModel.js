const pool = require('../config/database');

const obtenerComentarios = async () => {
    const resultado = await pool.query(`
        SELECT
            c.id_comentario,
            c.comentario,
            c.fecha,
            t.codigo AS ticket,
            CONCAT(u.nombres,' ',u.apellidos) AS usuario
        FROM comentarios c

        INNER JOIN tickets t
            ON c.id_ticket = t.id_ticket
        INNER JOIN usuarios u
            ON c.id_usuario = u.id_usuario
        ORDER BY c.fecha DESC;
    `);
    return resultado.rows;
};
const obtenerComentarioPorId = async (id) => {
    const resultado = await pool.query(`
        SELECT *
        FROM comentarios
        WHERE id_comentario = $1;
    `,[id]);
    return resultado.rows[0];
};
const crearComentario = async (comentario) => {
    const {
        id_ticket,
        id_usuario,
        comentario: texto
    } = comentario;
    const resultado = await pool.query(`
        INSERT INTO comentarios(
            id_ticket,
            id_usuario,
            comentario
        )
        VALUES( $1, $2, $3)
        RETURNING *;
    `,[
        id_ticket,
        id_usuario,
        texto
    ]);
    return resultado.rows[0];
};
const actualizarComentario = async (id, comentario) => {
    const { comentario: texto } = comentario;
    const resultado = await pool.query(`
        UPDATE comentarios
        SET comentario = $1
        WHERE id_comentario = $2
        RETURNING *;
    `,[
        texto,
        id
    ]);
    return resultado.rows[0];
};

const eliminarComentario = async (id) => {
    const resultado = await pool.query(`
        DELETE FROM comentarios
        WHERE id_comentario = $1
        RETURNING *;
    `,[id]);
    return resultado.rows[0];
};

module.exports = {
    obtenerComentarios,
    obtenerComentarioPorId,
    crearComentario,
    actualizarComentario,
    eliminarComentario
};
