const { response , request } = require('express');

const Categoria = require('../models/categoria');


    // Get 1 Categoria
    const getCategoria = async( req , res ) => {

        const { id } = req.params;
        const categoria = await Categoria.findById( id ).populate( 'usuario' , 'nombre' );;


        res.json({
            msg: 'getCategoria funcionando',
            categoria
        })
    }


    // Get * Categorias
    const getCategorias = async( req , res ) => {

        const estadoActivo = { estado : true };

        const [ total , categorias ] = await Promise.all([
            Categoria.countDocuments( estadoActivo ),
            Categoria.find( estadoActivo )
                        .populate( 'usuario' , 'nombre' )
        ])


        res.json({
            total,
            categorias
        })
    }


    // Crear Categoria
    const postCategoria = async( req = request , res = response ) => {

        const nombre = req.body.nombre.toUpperCase();

        // Validacion ¿existe?
        const categoriaDB = await Categoria.findOne({ nombre });
            if( categoriaDB ) {
                return res.status(400).json({
                    msg: `La categoria ${ categoriaDB.nombre } ya existe`
                })
            }


        // Si no existe lo CREA
        const data = {
            nombre,
            usuario : req.usuario._id
        }
        
        const categoria = new Categoria( data );

        //Se guarda en DB
        await categoria.save();


        res.status(201).json({
            categoria
        });
    }


    // Actualizar Categoria
    const putCategoria = async( req , res ) => {

        const { id } = req.params;
        const { _id , usuario , ...resto } = req.body;

        resto.nombre = resto.nombre.toUpperCase();
        resto.usuario = req.usuario._id;

        const categoria = await Categoria.findByIdAndUpdate( id , resto , {new : true} ); // OPCION: {new: true} para enviar el nuevo objeto y mostrarlo


        res.json({
            categoria
        })
    }


    // Borrar Categoria
    const deleteCategoria = async( req , res ) => {

        const { id } = req.params;
        const categoria = await Categoria.findByIdAndUpdate( id , {estado : false} , {new : true} );


        res.json({
            categoria
        })
    }


    
module.exports = {
    getCategoria,
    getCategorias,
    postCategoria,
    putCategoria,
    deleteCategoria
}


