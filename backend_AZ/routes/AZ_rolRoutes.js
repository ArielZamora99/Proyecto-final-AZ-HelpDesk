const express = require('express');
const router = express.Router();
const rolController = require('../controllers/AZ_rolController');

///GET - Todos los roles
// =========================================
router.get('/', rolController.obtenerRoles);

// GET - roles por ID
// =========================================
router.get('/:id', rolController.obtenerRolPorId);

// POST - Crear rol
// ==========================================
router.post('/', rolController.crearRol);

// PUT - Actualizar rol
// ==========================================
router.put('/:id', rolController.actualizarRol);

// DELETE - Eliminar rol
// ==========================================
router.delete('/:id', rolController.eliminarRol);

module.exports = router;
