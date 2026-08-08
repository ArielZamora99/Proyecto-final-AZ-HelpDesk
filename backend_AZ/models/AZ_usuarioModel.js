/*
=============================================================
 PROYECTO: HELP DESK AZ
 BASE DE DATOS:
 AUTOR: ARIEL ZAMORA
 FECHA: 28-07-2026
=============================================================
*/
const pool = require('../config/database');

const obtenerUsuarios = async () => {

    const resultado = await pool.query(
        `
        SELECT 
            u.id_usuario,
            u.nombres,
            u.apellidos,
            u.correo,
            r.nombre AS rol
        FROM usuarios u
        INNER JOIN roles r
        ON u.id_rol = r.id_rol
        ORDER BY u.id_usuario
        `
    );
    return resultado.rows;
};

const obtenerUsuarioPorId = async (id) => {
    const resultado = await pool.query(
        `
        SELECT 
            u.id_usuario,
            u.nombres,
            u.apellidos,
            u.correo,
            u.telefono,
            u.id_rol,
            r.nombre AS rol
        FROM usuarios u
        INNER JOIN roles r
        ON u.id_rol = r.id_rol
        ORDER BY u.id_usuario;
         `,
        [id]
    );
    return resultado.rows[0];
};

const obtenerPerfil = async (id) => {
    const resultado = await pool.query(
        `
        SELECT 
            u.id_usuario,
            u.nombres,
            u.apellidos,
            u.correo,
            u.telefono,
            r.nombre AS rol
        FROM usuarios u
        INNER JOIN roles r
        ON u.id_rol = r.id_rol
        WHERE u.id_usuario=$1;
        `,
        [id]
    );

    return resultado.rows[0];
};

const crearUsuario = async (usuario) => {
    const {
        nombres,
        apellidos,
        correo,
        password_hash,
        telefono
    } = usuario;

   const id_rol = usuario.id_rol || 3;
    const resultado = await pool.query(
        `
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
        ($1,$2,$3,$4,$5,$6)
        RETURNING *
        `,
        [
            nombres,
            apellidos,
            correo,
            password_hash,
            telefono,
            id_rol
        ]
    );
    return resultado.rows[0];
};

// Actualizar usuario
const actualizarUsuario = async (id, usuario) => {
    const {
        nombres,
        apellidos,
        correo,
        telefono,
        id_rol
    } = usuario;
    const resultado = await pool.query(
        `
        UPDATE usuarios
        SET
        nombres=$1,
        apellidos=$2,
        correo=$3,
        telefono=$4,
        id_rol=$5
        WHERE id_usuario=$6
        RETURNING *;
        `,
        [
            nombres,
            apellidos,
            correo,
            telefono,
            id_rol,
            id
        ]
    );
    return resultado.rows[0];
};


// Eliminar usuario
const eliminarUsuario = async (id) => {
    const cliente = await pool.connect();
    try{
        await cliente.query('BEGIN');
        const usuario = await cliente.query(
            `
            SELECT id_rol
            FROM usuarios
            WHERE id_usuario=$1
            `,
            [id]
        );
        if(usuario.rows.length === 0){
            throw new Error("Usuario no encontrado");
        }
        const rol = usuario.rows[0].id_rol;

        // CLIENTE
        if(rol === 3){
            await cliente.query(
                `
                DELETE FROM tickets
                WHERE id_usuario=$1
                AND id_estado IN
                (
                    SELECT id_estado
                    FROM estados
                    WHERE nombre <> 'Cerrado'
                )
                `,
                [id]
            );
        }
        // TECNICO
        if(rol === 2){
            await cliente.query(
                `
                UPDATE tickets
                SET id_tecnico=NULL
                WHERE id_tecnico=$1
                `,
                [id]
            );
        }
        // ADMINISTRADOR NO SE ELIMINA
        if(rol === 1){
            throw new Error(
            "No se puede eliminar un administrador"
            );
        }
        await cliente.query(
            `
            DELETE FROM usuarios
            WHERE id_usuario=$1
            RETURNING *
            `,
            [id]
        );
        await cliente.query('COMMIT');
        return true;
    }catch(error){
        await cliente.query('ROLLBACK');
        throw error;
    }finally{
        cliente.release();
    }
};

const obtenerTecnicos = async()=>{
    const resultado=await pool.query(`
        SELECT
            id_usuario,
            nombres||' '||apellidos AS nombre
        FROM usuarios
        WHERE id_rol=2
        ORDER BY nombres;
    `);
    return resultado.rows;
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    obtenerPerfil,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    obtenerTecnicos
};