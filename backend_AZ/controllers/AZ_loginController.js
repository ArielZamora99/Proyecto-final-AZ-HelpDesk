const authModel = require('../models/AZ_loginModel');
const login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await authModel.buscarUsuarioPorCorreo(correo);
        if(!usuario){
            return res.status(401).json({
                ok: false,
                mensaje: "Usuario no encontrado"  });
        }
        if(usuario.password_hash !== password){
            return res.status(401).json({
                ok: false,
                mensaje: "Contraseña incorrecta"  });
        }
        return res.status(200).json({
            ok: true,
            mensaje: "Login correcto",
            usuario: {
                id_usuario: usuario.id_usuario,
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                correo: usuario.correo,
                id_rol: usuario.id_rol
            }
        });

    } catch(error){
        console.error(error);
        res.status(500).json({
            ok: false,
            mensaje: "Error en el login"
        });
    }
};
module.exports = {
    login
};
