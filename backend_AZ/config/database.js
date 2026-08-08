/*
=============================================================
 PROYECTO: HELP DESK AZ
 BASE DE DATOS:
 AUTOR: ARIEL ZAMORA
 FECHA: 28-07-2026
=============================================================
*/
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
const probarConexion = async () => {
    try {
        const resultado = await pool.query(
            'SELECT NOW()'
        );
        console.log(
            '✅ PostgreSQL conectado:',
            resultado.rows[0]
        );
    } catch (error) {
        console.error(
            '❌ Error de conexión:',
            error.message
        );
    }
};
probarConexion();

module.exports = pool;