const comentarioModel = require('../models/AZ_comentariosModel');
// Obtener todos los comentarios
const obtenerComentarios = async (req, res) => {
    try {
        const comentarios = await comentarioModel.obtenerComentarios();
        res.json(comentarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener comentarios"  });
    }
};
// Obtener comentario por ID
const obtenerComentarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const comentario = await comentarioModel.obtenerComentarioPorId(id);
        if (!comentario) {
            return res.status(404).json({
                mensaje: "Comentario no encontrado"   });
        }
        res.json(comentario);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener comentario"
        });
    }
};
// Crear comentario
const crearComentario = async (req, res) => {
    try {
        const nuevoComentario = await comentarioModel.crearComentario(req.body);
        res.status(201).json({
            mensaje: "Comentario creado correctamente",
            comentario: nuevoComentario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al crear comentario" });
    }
};
// Actualizar comentario
const actualizarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const comentario = await comentarioModel.actualizarComentario(id, req.body);
        if (!comentario) {
            return res.status(404).json({
                mensaje: "Comentario no encontrado"
            });
        }
        res.json({
            mensaje: "Comentario actualizado correctamente",
            comentario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al actualizar comentario"  });
    }
};
// Eliminar comentario
const eliminarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const comentario = await comentarioModel.eliminarComentario(id);
        if (!comentario) {
            return res.status(404).json({
                mensaje: "Comentario no encontrado" });
        }
        res.json({
            mensaje: "Comentario eliminado correctamente",
            comentario  });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al eliminar comentario"   });
    }
};
module.exports = {
    obtenerComentarios,
    obtenerComentarioPorId,
    crearComentario,
    actualizarComentario,
    eliminarComentario };
