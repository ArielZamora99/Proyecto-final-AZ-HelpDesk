/*
=============================================================
 PROYECTO: HELP DESK AZ
 BASE DE DATOS:
 AUTOR: ARIEL ZAMORA
 FECHA: 28-07-2026
=============================================================
*/
const express = require('express');
const cors = require('cors');
require('dotenv').config();

require('./config/database');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const usuarioRoutes = require('./routes/AZ_usuarioRoutes');
const ticketRoutes = require('./routes/AZ_ticketRoutes');
const authRoutes = require('./routes/AZ_loginRoutes');
const categoriaRoutes = require('./routes/AZ_categoriaRoutes');
const prioridadRoutes = require('./routes/AZ_prioridadesRoutes');
const estadoRoutes = require('./routes/AZ_estadoRoutes');
const rolRoutes = require('./routes/AZ_rolRoutes');
const comentarioRoutes = require('./routes/AZ_comentariosRoutes');
const historialRoutes = require('./routes/AZ_historialRoutes');

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/prioridades', prioridadRoutes);
app.use('/api/estados', estadoRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/api/historial', historialRoutes);

// Ruta inicial de prueba
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API Help Desk AZ funcionando correctamente',
        estado: 'Activo'
    });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});
