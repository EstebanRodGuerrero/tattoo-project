const { Router } = require('express');

const { cargarArchivo, mostrarArchivo, actualizarImagenCloudinary } = require('../controllers/uploads-controller');



const router = Router();


    // Subir archivo
    router.post( '/' , cargarArchivo );


    // Actualizar imagen
    router.put( '/:coleccion/:id' , actualizarImagenCloudinary );


    // Get Imagen o Archivo
    router.get( '/' , mostrarArchivo )


module.exports = router;