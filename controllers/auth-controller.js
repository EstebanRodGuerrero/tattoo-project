const { request , response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');



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


    // ** REPARAR ! **
    const googleSignin = async ( req , res ) => {

        const { id_token } = req.body;

        try {

            // Crea el usuario mediante google
                const { nombre , correo , img } = await googleVerify( id_token );
                let usuario = await Usuario.findOne({ correo });
    
                // Si no existe lo crea
                    if( !usuario ) {
                        const data = {
                            nombre,
                            correo,
                            password: 'cualquiercosajjjaa',
                            img,
                            google: true
                        }
    
                        usuario = new Usuario( data );
                        await usuario.save();
                    } // else {  ... TODO: Si existe UPDATE datos ***
    
    
            // Mira estado de usuario
                if( !usuario.estado ) {
                    return res.status(401).json({
                        msg: 'El usuario esta desactivado. Hablar con un ADMIN.'
                    })
                }
    
    
            // Genera JWT
                const token = await generarJWT( usuario.id );
    

        
            res.json({
                msg: 'google Route funcionando',
                usuario,
                token
            })
        
            

        } catch (error) {

            console.log(error);

            res.status(400).json({
                msg: 'Token de Google no válido'
            })

        }


    }


module.exports = {
    login,
    googleSignin
}