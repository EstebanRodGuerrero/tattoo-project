const { request , response } = require('express');


// Para vaidar solo Administradores
const esAdmin = ( req , res , next ) => {

    const { rol , nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `El usuario ${ nombre } no es Administrador. Esta acción solo puede realizarla un ADMIN`
        })
    }

    next();

}


// Para restrigir acciones a ciertos roles
const tieneRol = ( ...roles ) => { 
    return ( req = request , res = response , next ) => {

        // TODO: validacion que esto vaya despues de valdiar JWT

        if( !roles.includes( req.usuario.rol ) ) {
            return res.json({
                msg: `El rol ${ req.usuario.rol } no tiene permisos suficientes para esta acción. Los roles que pueden hacer esto son ${ roles }`
            })
        }


        

    next();

    }
}

module.exports =  {
    tieneRol,
    esAdmin
}