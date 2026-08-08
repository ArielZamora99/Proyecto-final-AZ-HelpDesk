const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/AZ_comentariosController');

// Obtener todos los comentarios
router.get('/', comentarioController.obtenerComentarios);

// Obtener comentario por ID
router.get('/:id', comentarioController.obtenerComentarioPorId);

// Crear comentario
router.post('/', comentarioController.crearComentario);

// Actualizar comentario
router.put('/:id', comentarioController.actualizarComentario);

// Eliminar comentario
router.delete('/:id', comentarioController.eliminarComentario);

module.exports = router;
