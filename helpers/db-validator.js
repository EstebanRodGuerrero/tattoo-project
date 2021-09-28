const Usuario   = require('../models/usuario');
const Role      = require('../models/role');
const Categoria = require('../models/categoria');
const Producto  = require('../models/producto');

/**
 * Validaciones de Usuario
 */

    // Rol
    const roleValido = async ( rol = '' ) => {
        const existe = await Role.findOne({ rol });
        if( !existe ) {
            throw new Error(`El rol ${ rol } no está registrado en la BD.`);
        }
    }


    // Email
    const emailExiste = async ( correo = '' ) => {
        const existe = await Usuario.findOne({ correo });
        if( existe ) {
            throw new Error(`El correo ${ correo } ya está registrado en la BD.`);
        }
    }


    // Usuario
    const usuarioExiste = async ( id = '' ) => {
        const existe = await Usuario.findById( id );
        if( !existe ) {
            throw new Error(`El usuario con id: ${ id } no está registrado en la BD.`);
        }
    }


    // Categoria
    const categoriaExiste = async ( id = '' ) => {
        const existe = await Categoria.findById( id );
        if( !existe ) {
            throw new Error(`La Categoria con id: ${ id } no está registrada en la BD.`);
        }
    }


    // Producto
    const productoExiste = async ( id = '' ) => {
        const existe = await Producto.findById( id );
        if( !existe ) {
            throw new Error(`El producto con id: ${ id } no está registrado en la BD.`);
        }
    }

    
module.exports = {
    categoriaExiste,
    emailExiste,
    productoExiste,
    roleValido,
    usuarioExiste
}