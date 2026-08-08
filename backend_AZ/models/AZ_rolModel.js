const pool = require('../config/database');

const obtenerRoles = async () => {
    const resultado = await pool.query(`
        SELECT *
        FROM roles
        ORDER BY id_rol;
    `);
    return resultado.rows;
};
const obtenerRolPorId = async (id) => {
    const resultado = await pool.query(`
        SELECT *
        FROM roles
        WHERE id_rol = $1;
    `,[id]);
    return resultado.rows[0];
};
const crearRol = async (rol) => {
    const { nombre, descripcion } = rol;
    const resultado = await pool.query(`
        INSERT INTO roles
        (
            nombre,
            descripcion
        )
        VALUES
        ($1,$2)
        RETURNING *;
    `,[nombre,descripcion]);
    return resultado.rows[0];
};
const actualizarRol = async (id, rol) => {
    const { nombre, descripcion } = rol;
    const resultado = await pool.query(`
        UPDATE roles
        SET
            nombre=$1,
            descripcion=$2
        WHERE id_rol=$3
        RETURNING *;
    `,[nombre,descripcion,id]);
    return resultado.rows[0];
};
const eliminarRol = async (id) => {
    const resultado = await pool.query(`
        DELETE FROM roles
        WHERE id_rol=$1
        RETURNING *;
    `,[id]);
    return resultado.rows[0];
};
module.exports = {
    obtenerRoles,
    obtenerRolPorId,
    crearRol,
    actualizarRol,
    eliminarRol
};
