const ticketModel = require('../models/AZ_ticketModel');

/* ==========================================================
  GET OBTENER TODOS LOS TICKETS
========================================================== */
const obtenerTickets = async (req, res) => {
    try {
        const tickets = await ticketModel.obtenerTickets();
        res.json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al obtener los tickets'
        });
    }
};
const obtenerTicketsAdministracion = async(req,res)=>{
    try{
        const tickets =
        await ticketModel.obtenerTicketsAdministracion();
        res.json(tickets);
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje:"Error al obtener tickets"
        });
    }
};
// ==========================================================
// OBTENER TICKETS DEL TECNICO
// ==========================================================
const obtenerTicketsTecnico = async(req,res)=>{
    try{
        const {id}=req.params;
        const tickets = await ticketModel.obtenerTicketsTecnico(id);
            res.json(tickets);
        }catch(error){
            console.log(error);
            res.status(500).json({
                mensaje:"Error al obtener tickets del tecnico"
            });
    }
};
/* ==========================================================
   Getid OBTENER TICKET POR ID
========================================================== */
const obtenerTicketPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await ticketModel.obtenerTicketPorId(id);
        if (!ticket) {
            return res.status(404).json({
                mensaje: 'Ticket no encontrado'
            });
        }
        res.json(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al obtener el ticket'
        });
    }
};

/* ==========================================================
   POST CREAR TICKET
========================================================== */
const crearTicket = async (req, res) => {
    try {
        const nuevoTicket = await ticketModel.crearTicket(req.body);
        res.status(201).json({
            mensaje: 'Ticket creado correctamente',
            ticket: nuevoTicket
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al crear el ticket'
        });
    }
};

/* ==========================================================
  PUT ACTUALIZAR TICKET
========================================================== */
const actualizarTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await ticketModel.actualizarTicket(id, req.body);
        if (!ticket) {
            return res.status(404).json({
                mensaje: 'Ticket no encontrado'
            });
        }
        
        res.json({
            mensaje: 'Ticket actualizado correctamente',
            ticket
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al actualizar el ticket'
        });
    }
};

/* ==========================================================
  DELETE ELIMINAR TICKET
========================================================== */
const eliminarTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await ticketModel.eliminarTicket(id);
        if (!ticket) {
            return res.status(404).json({
                mensaje: 'Ticket no encontrado'});
        }
        res.json({
            mensaje: 'Ticket eliminado correctamente',
            ticket});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al eliminar el ticket'});
    }
};

module.exports = {
    obtenerTickets,
    obtenerTicketsAdministracion,
    obtenerTicketsTecnico,
    obtenerTicketPorId,
    crearTicket,
    actualizarTicket,
    eliminarTicket
    
};