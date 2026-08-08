const express = require('express');
const router = express.Router();
const historialController = require('../controllers/AZ_historialController');


// GET Obtener todo el historial
router.get('/', historialController.obtenerHistorial);

router.get('/usuario/:id',historialController.obtenerHistorialUsuario);

router.get('/tecnico/:id',historialController.obtenerHistorialTecnico);

// GET Obtener historial por ID
router.get('/:id', historialController.obtenerHistorialPorId);

// POST Crear registro
router.post('/', historialController.crearHistorial);

// PUT Actualizar registro
router.put('/:id', historialController.actualizarHistorial);

//DELET  Eliminar registro
router.delete('/:id', historialController.eliminarHistorial);

module.exports = router;
