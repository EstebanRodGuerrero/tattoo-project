const { request , response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');



    // Login
    const login = async ( req = request , res = response ) => {

        const { correo , password } = req.body;

        try {
            const usuario = await Usuario.findOne({ correo });
            
            // Verificar si encontro mail del usuario
                if( !usuario ) {
                    return res.status(400).json({
                        msg: `El usuario no es correcto.`
                    })
                }

            // Si el usuario está activo
                if( !usuario ) {
                    return res.status(400).json({
                        msg: `El usuario: ${ correo } está desactivado - Contantarse con un Administrador.`
                    })
                }   

            // Validar la contraseña  ---------- 
                const validPassword = bcryptjs.compareSync( password , usuario.password );
                
                if( !validPassword ) {
                    return res.status(400).json({
                        msg: 'La password es incorrecta.'
                    })
                }

            // Generar el JWT  ----------------
                const token = await generarJWT( usuario.id );

            
            res.json({
                msg: 'Login exitoso',
                usuario,
                token
            })


        } catch ( error ) {
            console.log( error );
            return res.status(500).json({
                msg: "Hable con el Administrador"
            })
        }

    }


    const googleSignin = async ( req , res ) => {

        const { id_token } = req.body;

        // Crea el usuario mediante google
            // Si no existe lo crea

        // Mira estado de usuario
    
        // Genera JWT


        res.json({
            msg: 'google Route funcionando'
        })
    }


module.exports = {
    login,
    googleSignin
}