const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { login, googleSignin } = require('../controllers/auth-controller');


const router = Router();


    router.post( '/login' , 
        [
            check('correo' , 'Falta correo o Error en su escritura').isEmail(),
            check('password' , 'La contraseña es obligatoria').not().isEmpty(),
            validarCampos

        ], 
            login );

    
    // ** REPARAR ! **
    router.post( '/google' , 
        // [

        // ] , 
                googleSignin );

module.exports = router;