const path = require('path');
const { v4: uuidv4 } = require('uuid'); 





const subirArchivo = ( files , extensionesValidas = [ 'png' , 'jpg' , 'jpeg' , 'gif' ] , carpeta = '' ) => {

    return new Promise ( (resolve , reject) => {

        // ---- TAREA 1: Toma extension
            const { archivo } = files;
            const nombreCortado = archivo.name.split('.');
            const extension = nombreCortado[ nombreCortado.length - 1 ];


        // ---- TAREA 2 Validar extension
            if ( !extensionesValidas.includes( extension ) ) {
                return reject( `La extension ${ extension } no está permitida. Las extensiones permitidas son : ${ extensionesValidas } ` );
            }


        // ---- TAREA 3: Cargar un archivo a un dirname
            const nombreTemp = uuidv4() + '.' + extension;
            const uploadPath = path.join( __dirname , '../uploads/' , carpeta , nombreTemp ); 

            archivo.mv(uploadPath, ( err ) =>  {
                if ( err ) {
                    reject( err );
                }
                resolve( nombreTemp ); // El archivo se subio
            });

    } ) 
}





module.exports = {
    subirArchivo
}