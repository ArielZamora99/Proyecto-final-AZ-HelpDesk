const historialModel = require('../models/AZ_historialModel');

const obtenerHistorial = async (req, res) => {
    try {
        const historial = await historialModel.obtenerHistorial();
        res.json(historial);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje:"Error al obtener historial"
        });
    }
};
const obtenerHistorialUsuario = async(req,res)=>{
    try{
        const { id } = req.params;
        const historial=
        await historialModel.obtenerHistorialUsuario(id);
        res.json(historial);
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje:"Error al obtener historial"
        });
    }
};
const obtenerHistorialTecnico = async(req,res)=>{
    try{
        const { id } = req.params;
        const historial=
        await historialModel.obtenerHistorialTecnico(id);
        res.json(historial);
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje:"Error al obtener historial"
        });
    }
};
const obtenerHistorialPorId = async (req,res)=>{
    try{
        const { id } = req.params;
        const historial = await historialModel.obtenerHistorialPorId(id);
        if(!historial){
            return res.status(404).json({
                mensaje:"Registro no encontrado"
            });
        }
        res.json(historial);
    }catch(error){
        console.error(error);
        res.status(500).json({
            mensaje:"Error al obtener historial"
        });
    }
};
const crearHistorial = async(req,res)=>{
    try{
        const nuevo = await historialModel.crearHistorial(req.body);
        res.status(201).json({
            mensaje:"Historial creado correctamente",
            historial:nuevo
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            mensaje:"Error al crear historial"
        });
    }
};
const actualizarHistorial = async(req,res)=>{
    try{
        const { id } = req.params;
        const historial = await historialModel.actualizarHistorial(id,req.body);
        if(!historial){
            return res.status(404).json({
                mensaje:"Registro no encontrado"
            });
        }
        res.json({
            mensaje:"Historial actualizado correctamente",
            historial
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            mensaje:"Error al actualizar historial"
        });
    }
};
const eliminarHistorial = async(req,res)=>{
    try{
        const { id } = req.params;
        const historial = await historialModel.eliminarHistorial(id);
        if(!historial){
            return res.status(404).json({
                mensaje:"Registro no encontrado"
            });
        }
        res.json({
            mensaje:"Historial eliminado correctamente",
            historial
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            mensaje:"Error al eliminar historial"
        });
    }
};
module.exports = {
    obtenerHistorial,
    obtenerHistorialUsuario,
    obtenerHistorialTecnico,
    obtenerHistorialPorId,
    crearHistorial,
    actualizarHistorial,
    eliminarHistorial};
