const { Router } = require('express');
const { check }  = require('express-validator');

const { getCategoria,
        getCategorias,
        postCategoria,
        putCategoria,
        deleteCategoria } = require('../controllers/categorias-controller');

const { categoriaExiste } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdmin } = require('../middlewares/validar-roles');

        

const router = Router();

    // Obtener * Categoria
    router.get( '/' , getCategorias );
    

    // Obtener 1 Categoria
    router.get( '/:id' , 
        [
            check( 'id' ).custom( categoriaExiste ),
            validarCampos
        ] , 
            getCategoria );


    // Crear Categoria
    router.post( '/' , 
        [
            validarJWT,
            check( 'nombre' , 'El nombre es obligatorio' ).not().isEmpty(),
            validarCampos
        ] , 
            postCategoria );


    // Actualizar Categoria
    router.put( '/:id' , 
        [
            validarJWT,
            esAdmin,
            check( 'id' ).custom( categoriaExiste ),
            validarCampos
        ] , 
            putCategoria );

 
    // Eliminar Categoria
    router.delete( '/:id' , 
        [
            validarJWT,
            esAdmin,
            check( 'id' , 'No es un id de mongo válido.' ).isMongoId(),
            check( 'id' ).custom( categoriaExiste ),
            validarCampos
        ] ,
             deleteCategoria );



module.exports = router;