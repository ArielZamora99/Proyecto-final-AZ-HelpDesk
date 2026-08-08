const express = require('express');
const router = express.Router();
const prioridadController = require('../controllers/AZ_prioridadesController');

// GET - Obtener todas las prioridades
// ==========================================
router.get('/', prioridadController.obtenerPrioridades);

// GET - Obtener prioridad por ID
// ==========================================
router.get('/:id', prioridadController.obtenerPrioridadPorId);

// POST - Crear prioridad
// ==========================================
router.post('/', prioridadController.crearPrioridad);

// PUT - Actualizar prioridad
// ==========================================
router.put('/:id', prioridadController.actualizarPrioridad);

// DELETE - Eliminar prioridad
// ==========================================
router.delete('/:id', prioridadController.eliminarPrioridad);

module.exports = router;
