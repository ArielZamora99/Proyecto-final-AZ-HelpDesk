const prioridadModel = require('../models/AZ_prioridadesModel');

// Obtener todas las prioridades
const obtenerPrioridades = async (req, res) => {
    try {
        const prioridades = await prioridadModel.obtenerPrioridades();
        res.json(prioridades);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener prioridades" });
    }
};
// Obtener prioridad por ID
const obtenerPrioridadPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const prioridad = await prioridadModel.obtenerPrioridadPorId(id);
        if (!prioridad) {
            return res.status(404).json({
                mensaje: "Prioridad no encontrada"
            });
        }
        res.json(prioridad);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener prioridad" });
    }
};

// Crear prioridad
const crearPrioridad = async (req, res) => {
    try {
        const nuevaPrioridad = await prioridadModel.crearPrioridad(req.body);
        res.status(201).json({
            mensaje: "Prioridad creada correctamente",
            prioridad: nuevaPrioridad });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al crear prioridad" });
    }
};

// Actualizar prioridad
const actualizarPrioridad = async (req, res) => {
    try {
        const { id } = req.params;
        const prioridad = await prioridadModel.actualizarPrioridad(id, req.body);
        if (!prioridad) {
            return res.status(404).json({
                mensaje: "Prioridad no encontrada" });
        }
        res.json({
            mensaje: "Prioridad actualizada correctamente",
            prioridad
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al actualizar prioridad" });
    }
};
// Eliminar prioridad
const eliminarPrioridad = async (req, res) => {
    try {
        const { id } = req.params;
        const prioridad = await prioridadModel.eliminarPrioridad(id);
        if (!prioridad) {
            return res.status(404).json({
                mensaje: "Prioridad no encontrada" });
        }
        res.json({
            mensaje: "Prioridad eliminada correctamente",
            prioridad
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al eliminar prioridad" });
    }
};
module.exports = {
    obtenerPrioridades,
    obtenerPrioridadPorId,
    crearPrioridad,
    actualizarPrioridad,
    eliminarPrioridad
};
