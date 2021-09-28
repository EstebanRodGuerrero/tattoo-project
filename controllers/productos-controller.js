const { request , response } = require('express');

const Producto = require('../models/producto');



    // Get 1 Producto 
    const getProducto = async ( req , res ) => {

        const { id } = req.params;
        const producto = await Producto.findById( id ).populate( 'categoria' , 'nombre' );;

        res.status(201).json({
            producto
        })

    }

    
    // Get * Producto
    const getProductos = async ( req , res ) => {

        const estadoActivo = { estado : true };

        const [ total , productos ] = await Promise.all([
            Producto.countDocuments( estadoActivo ),
            Producto.find( estadoActivo )
                    .populate( 'categoria' , 'nombre' )
        ])

        res.json({
            total,
            productos
        })
    }


    // Post Producto
    const postProducto = async ( req , res ) => {

        const { _id , usuario , ...resto } = req.body;
        const nombre = resto.nombre.toUpperCase();

        // ¿Ya existe?
            const productoBD = await Producto.findOne({ nombre });

            if( productoBD ) {
                return res.status(401).json({
                    msg: 'Este producto ya existe en la BD'
                })
            }


        // Se crea nuevo producto
            const data = {
                ...resto,
                nombre,
                usuario: req.usuario._id
            }

        
        // Nuevo modelo
            const producto = await Producto( data );

        
        // Guardar en BD
            await producto.save();
            


        res.json({
            producto
        })
    }

    // Put Producto
    const putProducto = async ( req , res ) => {

        const { id } = req.params;
        const { _id , usuario , ...resto } = req.body;

        resto.nombre = resto.nombre.toUpperCase();
        resto.usuario = req.usuario._id;

        const producto = await Producto.findByIdAndUpdate( id , resto , {new : true} ); // OPCION: {new: true} para enviar el nuevo objeto y mostrarlo


        res.json({
            producto
        })
    }

    // Delete Producto
    const deleteProducto = async ( req , res ) => {

        const { id } = req.params;
        const producto = await Producto.findByIdAndUpdate( id , {estado : false} , {new : true} )

        res.json({
            producto
        })
    }



module.exports = {
    getProducto,
    getProductos,
    postProducto,
    putProducto,
    deleteProducto
}