const rolModel = require('../models/AZ_rolModel');

const obtenerRoles = async (req, res) => {
    try {
        const roles = await rolModel.obtenerRoles();
        res.json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener roles" });
    }
};
const obtenerRolPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await rolModel.obtenerRolPorId(id);
        if (!rol) {
            return res.status(404).json({
                mensaje: "Rol no encontrado" });
        }
        res.json(rol);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener rol" });
    }
};
const crearRol = async (req, res) => {
    try {
        const nuevoRol = await rolModel.crearRol(req.body);
        res.status(201).json({
            mensaje: "Rol creado correctamente",
            rol: nuevoRol });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al crear rol" });
    }
};
const actualizarRol = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await rolModel.actualizarRol(id, req.body);
        if (!rol) {
            return res.status(404).json({
                mensaje: "Rol no encontrado" });
        }
        res.json({
            mensaje: "Rol actualizado correctamente",
            rol
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al actualizar rol" });
    }
};
const eliminarRol = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await rolModel.eliminarRol(id);
        if (!rol) {
            return res.status(404).json({
                mensaje: "Rol no encontrado"
            });
        }
        res.json({
            mensaje: "Rol eliminado correctamente",
            rol
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al eliminar rol"
        });
    }
};
module.exports = {
    obtenerRoles,
    obtenerRolPorId,
    crearRol,
    actualizarRol,
    eliminarRol
};
