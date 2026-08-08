const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/AZ_ticketController');

// GET - Todos los tickets
// =========================================
router.get('/administracion/listado', ticketController.obtenerTicketsAdministracion);
router.get('/tecnico/:id', ticketController.obtenerTicketsTecnico);
router.get( '/',  ticketController.obtenerTickets );



// GET - Ticket por ID
// =========================================
router.get('/:id',  ticketController.obtenerTicketPorId);

// POST - Crear ticket
// ==========================================
router.post('/', ticketController.crearTicket);

// PUT - Actualizar ticket
// ==========================================
router.put('/:id', ticketController.actualizarTicket);

// DELETE - Eliminar ticket
// ==========================================
router.delete('/:id', ticketController.eliminarTicket);

module.exports = router;