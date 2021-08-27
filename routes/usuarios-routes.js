const { Router } = require('express');
const { check }  = require('express-validator');

const { getUsuarios , getUsuario , postUsuario, putUsuario , deleteUsuario } = require('../controllers/usuarios-controller');
const { emailExiste, roleValido, usuarioExiste } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRol } = require('../middlewares/validar-roles');


const router = Router();

    // GET * usuarios
    router.get( '/' , getUsuarios );


    // GET 1 usuario
    router.get( '/:id' , 
        [
            check('id' , 'No es un ID de mongo válido').isMongoId(),
            check('id').custom( usuarioExiste ),
            validarCampos
        ] , 
            getUsuario );


    // CREAR usuario
    router.post( '/' ,
        [
            check('nombre'),
            check('password' , 'La contraseña debe tener como miniom 6 caracteres').isLength({ min: 6 }),
            check('correo' , 'El correo no es válido').isEmail(),
            check('correo').custom( emailExiste ),
            check('rol').custom( roleValido ),
            validarCampos
        ] , 
            postUsuario );


    // ACTUALIZAR usuario
    router.put( '/:id' , 
        [
            check('id' , 'No es un ID de mongo válido').isMongoId(),
            check('id').custom( usuarioExiste ),
            validarCampos
        ] , 
            putUsuario );


    // ELIMINAR usuario (enrealidad cambia su estado)
    router.delete( '/:id' , 
        [
            validarJWT,
            tieneRol('ADMIN_ROLE' , 'VENTAS_ROLE'),
            check('id' , 'No es un ID de mongo válido').isMongoId(),
            check('id').custom( usuarioExiste ),
            validarCampos
        ] ,
             deleteUsuario ); 


module.exports = router;