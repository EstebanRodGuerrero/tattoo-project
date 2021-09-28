const { request , response } = require('express');
const cloudinary = require('cloudinary').v2
        cloudinary.config( process.env.CLOUDINARY_URL );

const { subirArchivo } = require('../helpers/subir-archivo');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');



    const cargarArchivo = async ( req , res ) => {

        try {

            const ext = [ 'txt' , 'md' , 'jpg' ];
            const nombre = await subirArchivo ( req.files , ext , 'Archivo' );
            res.json({ nombre })

        } catch (error) {
            console.log( error );
            res.status(400).json({ error })
        }

    }


    const actualizarImagenCloudinary = async ( req , res ) => {

        const { coleccion , id } = req.params;

        let modelo;

        // ---- TAREA 1: Validacion de existencia de Modelos a Actualizar
            switch ( modelo ) {
                case 'usuarios':
                    modelo = await Usuario.findById( id );
                    if( !modelo ) {
                        return res.status(500).json({
                            msg: `No existe un usuario con id: ${ id }`
                        })
                    }
                break;

                case 'productos':
                    modelo = await Producto.findById( id );
                    if( !modelo ) {
                        return res.status(500).json({
                            msg: `No existe un producto con id: ${ id }`
                        })
                    }
                default:
                    return res.status(500).json({ msg: 'Se me olvido validar esto :P' })
            }
        
        // ---- TAREA 2: Limpiar imagenes previas
        
        
        // ---- TAREA 3: Guardar Archivo


        res.json({
            msg: 'actualizarImg funcionando'
        })
    }


    const mostrarArchivo = async ( req , res ) => {


        res.json({
            msg: 'mostrarArchivo funcionando'
        })
    }

module.exports = {
    actualizarImagenCloudinary,
    cargarArchivo,
    mostrarArchivo
}