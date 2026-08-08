const express = require('express');

const router = express.Router();
const authController = require('../controllers/AZ_loginController');

// POST LOGIN
router.post('/login',authController.login);

// PRUEBA TEMPORAL para verficar el navegador
router.get('/login', (req,res)=>{
    res.json({
        mensaje:"Ruta de login funcionando"
    });
});

module.exports = router;
