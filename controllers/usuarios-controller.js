const { request , response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');



    // Get * Usuarios
    const getUsuarios = async ( req = request , res = response ) => {

        const estadoActivo = { estado: true };
        const { limite = 10 , desde = 0 } = req.query; // Para limitar resultados (si la peticion lo quiere)

        const [ total , usuarios ] = await Promise.all([
            Usuario.countDocuments( estadoActivo ),
            Usuario.find( estadoActivo )
                .skip( Number( desde ) )
                .limit( Number( limite ) )
        ])

        res.json({
            msg: 'getUsuarioS Funcionando',
            total,
            usuarios
        });
    }


    // Get 1 Usuario
    const getUsuario = async ( req , res ) => {

        const { id } = req.params;
        const usuario = await Usuario.findById( id );

        res.json({
            msg: 'getUsuario Funcionando',
            usuario
        })
    }


    // Crear Usuario
    const postUsuario = async ( req , res ) => {

        const { nombre , correo , password , rol } = req.body;
        const usuario = new Usuario( { nombre , correo , password , rol } ); // Se crea un modelo de Usuario con estos datos.

        // Encripta contraseña
        const salt = bcryptjs.genSaltSync(10);
        usuario.password = bcryptjs.hashSync( password , salt );

        // Guardar modelo en BD
        await usuario.save();

        res.json({
            msg: 'postUsuario funcionando',
            usuario
        });
    } 


    // Actualizar Usuario
    const putUsuario = async ( req , res ) => {

        const { id } = req.params;
        const { _id , google , password , ...resto } = req.body;

        if( password ) {
            const salt = bcryptjs.genSaltSync(10);
            resto.password = bcryptjs.hashSync( password , salt );
        }

        const usuario = await Usuario.findByIdAndUpdate( id , resto );

        res.json({
            msg: 'putUsuario funcionando',
            usuario
        })
    }
    

    // Eliminar Usuario
    const deleteUsuario = async ( req , res ) => {

        const { id } = req.params;

        // Cambar estado de Usuario  
        const usuario = await Usuario.findByIdAndUpdate( id , { estado: false } );

        // Mostrar que usuario está autenticado
        const usuarioAutenticado = req.usuario;     // req.usuario: Lo genera validarJWT

        res.json({
            msg: 'deleteUsuario Funcionando',
            usuario,
            usuarioAutenticado
        })
    }



module.exports = {
    getUsuarios,
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}