const { Router } = require('express');
const { check } = require('express-validator');

const { getProducto, getProductos, postProducto, putProducto, deleteProducto } = require('../controllers/productos-controller');
const { productoExiste } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdmin } = require('../middlewares/validar-roles');




const router = Router();



    router.get( '/:id' , 
        [
            check( 'id' , 'No es un id de mongo válido.' ).isMongoId(),
            check( 'id' ).custom( productoExiste ),
            validarCampos
        ] ,
             getProducto );


    router.get( '/' , getProductos );


    router.post( '/' , 
        [
            validarJWT,
            check( 'nombre' , 'El nombre es obligatorio' ).not().isEmpty(),
            validarCampos
        ] ,
            postProducto );


    router.put( '/:id' , 
        [
            validarJWT,
            esAdmin,
            check( 'id' , 'No es un id de mongo válido.' ).isMongoId(),
            check( 'id' ).custom( productoExiste ),
            validarCampos
        ] ,
            putProducto );


    router.delete( '/:id' ,
        [
            validarJWT,
            esAdmin,
            check( 'id' , 'No es un id de mongo válido.' ).isMongoId(),
            check( 'id' ).custom( productoExiste ),
            validarCampos
        ] ,
             deleteProducto );



module.exports = router;