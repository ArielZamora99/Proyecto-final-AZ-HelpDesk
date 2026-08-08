/*
=============================================================
 PROYECTO: HELP DESK AZ
 BASE DE DATOS:
 AUTOR: ARIEL ZAMORA
 FECHA: 28-07-2026
=============================================================
*/
const usuarioModel = require('../models/AZ_usuarioModel');


// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.obtenerUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al obtener usuarios'
        });
    }
};

// Obtener usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioModel.obtenerUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al buscar usuario'
        });
    }
};

const obtenerPerfil = async(req,res)=>{
    try{
        const {id}=req.params;

        const perfil = await usuarioModel.obtenerPerfil(id);

        res.json(perfil);

    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje:"Error al obtener perfil"
        });
    }
};

// Crear usuario
const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await usuarioModel.crearUsuario(req.body);
        res.status(201).json({
            mensaje: 'Usuario creado correctamente',
            usuario: nuevoUsuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al crear usuario'
        });
    }
};

// Actualizar usuario
const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioActualizado = await usuarioModel.actualizarUsuario(
            id,
            req.body
        );
        if (!usuarioActualizado) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }
        res.json({
            mensaje: 'Usuario actualizado correctamente',
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al actualizar usuario'
        });
    }
};


// Eliminar usuario
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioEliminado = await usuarioModel.eliminarUsuario(id);
        if (!usuarioEliminado) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }
        res.json({
            mensaje: 'Usuario eliminado correctamente',
            usuario: usuarioEliminado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al eliminar usuario'
        });
    }
};

const obtenerTecnicos=async(req,res)=>{
    try{
        const tecnicos=
        await usuarioModel.obtenerTecnicos();
        res.json(tecnicos);
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje:"Error"
        });
    }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    obtenerPerfil,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    obtenerTecnicos
};