const pool = require('../config/database');
const buscarUsuarioPorCorreo = async (correo) => {
    const resultado = await pool.query( `
        SELECT
            id_usuario,
            nombres,
            apellidos,
            correo,
            password_hash,
            id_rol
        FROM usuarios
        WHERE correo = $1 `,
        [correo]
    );
    return resultado.rows[0];
};
module.exports = {
    buscarUsuarioPorCorreo
};
