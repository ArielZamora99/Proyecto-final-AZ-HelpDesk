const estadoModel = require('../models/AZ_estadoModel');

const obtenerEstados = async (req, res) => {
    try {
        const estados = await estadoModel.obtenerEstados();
        res.json(estados);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener estados"     });
    }
};
const obtenerEstadoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const estado = await estadoModel.obtenerEstadoPorId(id);
        if (!estado) {
            return res.status(404).json({
                mensaje: "Estado no encontrado"  });
        }
        res.json(estado);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener estado"  });
    }
};
const crearEstado = async (req, res) => {
    try {
        const nuevoEstado = await estadoModel.crearEstado(req.body);
        res.status(201).json({
            mensaje: "Estado creado correctamente",
            estado: nuevoEstado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al crear estado"  });
    }
};
const actualizarEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const estado = await estadoModel.actualizarEstado(id, req.body);
        if (!estado) {
            return res.status(404).json({
                mensaje: "Estado no encontrado"  });
        }
        res.json({
            mensaje: "Estado actualizado correctamente",
            estado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al actualizar estado" });
    }
};
const eliminarEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const estado = await estadoModel.eliminarEstado(id);
        if (!estado) {
            return res.status(404).json({
                mensaje: "Estado no encontrado" });
        }
        res.json({
            mensaje: "Estado eliminado correctamente",
            estado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al eliminar estado" });
    }
};
module.exports = {
    obtenerEstados,
    obtenerEstadoPorId,
    crearEstado,
    actualizarEstado,
    eliminarEstado
};
