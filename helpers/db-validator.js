const Usuario = require('../models/usuario');
const Role    = require('../models/role');

/**
 * Validaciones de Usuario
 */

    // email
    const emailExiste = async ( correo = '' ) => {
        const existeMail = await Usuario.findOne({ correo });
        if( existeMail ) {
            throw new Error(`El correo ${ correo } ya está registrado en la BD.`);
        }
    }

    // Rol
    const roleValido = async ( rol = '' ) => {
        const existeRol = await Role.findOne({ rol });
        if( !existeRol ) {
            throw new Error(`El rol ${ rol } no está registrado en la BD.`);
        }
    }

    // Rol
    const usuarioExiste = async ( id = '' ) => {
        const existeID = await Usuario.findById( id );
        if( !existeID ) {
            throw new Error(`El usuario con id: ${ id } no está registrado en la BD.`);
        }
    }

    
module.exports = {
    emailExiste,
    roleValido,
    usuarioExiste
}