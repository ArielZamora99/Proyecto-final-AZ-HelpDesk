const express = require('express');

const router = express.Router();
const estadoController = require('../controllers/AZ_estadoController');

// GET - Obtener todos los estados
// ==========================================
router.get('/', estadoController.obtenerEstados);

// GET - Obtener estado por ID
// ==========================================
router.get('/:id', estadoController.obtenerEstadoPorId);

// POST - Crear estado
// ==========================================
router.post('/', estadoController.crearEstado);

// PUT - Actualizar estado
// ==========================================
router.put('/:id', estadoController.actualizarEstado);

// DELETE - Eliminar estado
// ==========================================
router.delete('/:id', estadoController.eliminarEstado);

module.exports = router;
