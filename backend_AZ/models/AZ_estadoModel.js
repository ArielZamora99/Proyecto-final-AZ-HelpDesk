const pool = require('../config/database');

const obtenerEstados = async () => {
    const resultado = await pool.query(`
        SELECT *
        FROM estados
        ORDER BY id_estado;
    `);
    return resultado.rows;
};
const obtenerEstadoPorId = async (id) => {
    const resultado = await pool.query(`
        SELECT *
        FROM estados
        WHERE id_estado = $1;
    `,[id]);
    return resultado.rows[0];
};
const crearEstado = async (estado) => {
    const { nombre, descripcion } = estado;
    const resultado = await pool.query(`
        INSERT INTO estados
        (
            nombre,
            descripcion,
            activo
        )
        VALUES
        ($1,$2, true)
        RETURNING *;
    `,[nombre,descripcion]);
    return resultado.rows[0];
};
const actualizarEstado = async (id, estado) => {
    const { nombre, descripcion } = estado;
    const resultado = await pool.query(`
        UPDATE estados
        SET
            nombre=$1,
            descripcion=$2
        WHERE id_estado=$3
        RETURNING *;
    `,[nombre,descripcion,id]);
    return resultado.rows[0];
};
const eliminarEstado = async (id) => {
    const resultado = await pool.query(`
         UPDATE estados
         SET activo = NOT activo
         WHERE id_estado=$1

        RETURNING *;

    `,[id]);
    return resultado.rows[0];
};
module.exports = {
    obtenerEstados,
    obtenerEstadoPorId,
    crearEstado,
    actualizarEstado,
    eliminarEstado
};
