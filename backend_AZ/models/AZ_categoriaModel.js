const pool = require('../config/database');

// Obtener todas las categorias
const obtenerCategorias = async () => {
    const resultado = await pool.query(
        ` SELECT *
          FROM categorias
          ORDER BY id_categoria; `
    );
    return resultado.rows;
};

// Obtener categoria por ID
const obtenerCategoriaPorId = async (id) => {
    const resultado = await pool.query(
        ` SELECT *
          FROM categorias
          WHERE id_categoria = $1; `,
        [id]
    );
    return resultado.rows[0];
};

// Crear categoria
const crearCategoria = async (categoria) => {
    const { nombre, descripcion } = categoria;
    const resultado = await pool.query(
        ` INSERT INTO categorias (
            nombre,
            descripcion
        )
        VALUES ($1,$2)
        RETURNING *;
        `,
        [
            nombre,
            descripcion
        ]
    );
    return resultado.rows[0];
};

// Actualizar categoria
const actualizarCategoria = async (id, categoria) => {
    const {
        nombre,
        descripcion
    } = categoria;
    const resultado = await pool.query(
       `UPDATE categorias
        SET
            nombre=$1,
            descripcion=$2

        WHERE id_categoria=$3
        RETURNING *;
        `,
        [
            nombre,
            descripcion,
            id
        ]
    );
    return resultado.rows[0];
};

// ACTIVAR / DESACTIVAR
const eliminarCategoria = async(id)=>{
    const resultado = await pool.query(
        `UPDATE categorias
         SET activo = NOT activo
         WHERE id_categoria=$1
         RETURNING *;`,
         [id]
    );
    return resultado.rows[0];
};

module.exports = {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};