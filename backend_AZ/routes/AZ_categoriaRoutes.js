const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/AZ_categoriaController');

// GET - Obtener todas las categorias
// ==========================================
router.get( '/', categoriaController.obtenerCategorias);

// GET - Obtener categoria por ID
// ==========================================
router.get('/:id',categoriaController.obtenerCategoriaPorId);

// POST - Crear categoria
// ==========================================
router.post('/', categoriaController.crearCategoria);

// PUT - Actualizar categoria
// ==========================================
router.put('/:id', categoriaController.actualizarCategoria);

// DELETE - Eliminar categoria
// ==========================================
router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;
