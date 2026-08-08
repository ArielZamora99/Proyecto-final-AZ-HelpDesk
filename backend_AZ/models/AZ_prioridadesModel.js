const pool = require('../config/database');
const obtenerPrioridades = async () => {
    const resultado = await pool.query(`
        SELECT *
        FROM prioridades
        ORDER BY nivel; `);
    return resultado.rows;
};

//obtener prioridad por ID 
const obtenerPrioridadPorId = async (id) => {
    const resultado = await pool.query(`
        SELECT *
        FROM prioridades
        WHERE id_prioridad = $1;
    `,[id]);
    return resultado.rows[0];
};
// CREAR PRIORIDAD 
const crearPrioridad = async (prioridad) => {
    const { nombre, nivel } = prioridad;
    const resultado = await pool.query(`
        INSERT INTO prioridades
        (
            nombre,
            nivel,
            activo
        )
        VALUES
        ($1,$2, true)
        RETURNING *;
    `,[nombre,nivel]);
    return resultado.rows[0];
};
//actualizar prioridad 
const actualizarPrioridad = async (id, prioridad) => {
    const { nombre, nivel } = prioridad;
    const resultado = await pool.query(`
        UPDATE prioridades
        SET
            nombre=$1,
            nivel=$2
        WHERE id_prioridad=$3
        RETURNING *;
    `,[nombre,nivel,id]);
    return resultado.rows[0];
};

//activar / desactivar prioridad
const eliminarPrioridad = async (id) => {
    const resultado = await pool.query(`
        UPDATE prioridades

        SET activo = NOT activo

        WHERE id_prioridad=$1

        RETURNING *; `,
    [
        id
    ]);
    return resultado.rows[0];

};

module.exports = {
    obtenerPrioridades,
    obtenerPrioridadPorId,
    crearPrioridad,
    actualizarPrioridad,
    eliminarPrioridad
};
