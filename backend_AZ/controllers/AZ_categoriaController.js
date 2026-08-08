const categoriaModel = require('../models/AZ_categoriaModel');

// Obtener todas las categorias
const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await categoriaModel.obtenerCategorias();
        res.json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener categorias"
        });
    }
};

// Obtener categoria por ID
const obtenerCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await categoriaModel.obtenerCategoriaPorId(id);
        if(!categoria){
            return res.status(404).json({
                mensaje:"Categoria no encontrada"
            });
        }
        res.json(categoria);
    } catch(error){
        console.error(error);
        res.status(500).json({
            mensaje:"Error al obtener categoria"
        });
    }
};

// Crear categoria
const crearCategoria = async (req, res) => {
    try {
        const nuevaCategoria = await categoriaModel.crearCategoria(req.body);
        res.status(201).json({
            mensaje:"Categoria creada correctamente",
            categoria:nuevaCategoria
        });
    } catch(error){
        console.error(error);
        res.status(500).json({
            mensaje:"Error al crear categoria"
        });
    }
};

// Actualizar categoria
const actualizarCategoria = async (req,res)=>{
    try{
        const { id } = req.params;
        const categoria = await categoriaModel.actualizarCategoria(
            id,
            req.body
        );
        if(!categoria){
            return res.status(404).json({
                mensaje:"Categoria no encontrada"
            });
        }
        res.json({
            mensaje:"Categoria actualizada correctamente",
            categoria
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            mensaje:"Error al actualizar categoria"
        });
    }
};

// Eliminar categoria
const eliminarCategoria = async(req,res)=>{
    try{
        const { id } = req.params;
        const categoria = await categoriaModel.eliminarCategoria(id);
        if(!categoria){
            return res.status(404).json({
                mensaje:"Categoria no encontrada"
            });
        }
        res.json({
            mensaje:"Categoria eliminada correctamente",
            categoria
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            mensaje:"Error al eliminar categoria"
        });
    }
};

module.exports = {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};