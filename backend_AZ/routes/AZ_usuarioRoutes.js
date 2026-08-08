/*
=============================================================
 PROYECTO: HELP DESK AZ
 BASE DE DATOS:
 AUTOR: ARIEL ZAMORA
 FECHA: 28-07-2026
=============================================================
*/
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/AZ_usuarioController');

// GET todos los usuarios
router.get('/perfil/:id', usuarioController.obtenerPerfil); 

router.get( '/',  usuarioController.obtenerUsuarios );

router.get( '/tecnicos', usuarioController.obtenerTecnicos );

// GET usuario por ID
router.get( '/:id', usuarioController.obtenerUsuarioPorId );

// POST crear usuario
router.post( '/',  usuarioController.crearUsuario );

// PUT - Actualizar usuario
router.put( '/:id', usuarioController.actualizarUsuario );

// DELETE - Eliminar usuario
router.delete( '/:id', usuarioController.eliminarUsuario );

module.exports = router;