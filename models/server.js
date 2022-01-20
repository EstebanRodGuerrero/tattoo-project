const express = require('express');
const { dbConnetion } = require('../database/config');



class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT; 

        // Paths
        this.authPath       = '/api/auth';
        this.buscarPath     = '/api/buscar';
        this.categoriasPath = '/api/categorias';
        this.productosPath  = '/api/productos';
        this.uploadsPath    = '/api/uploads';
        this.usuariosPath   = '/api/usuarios';

        // Ejecuta estos metodos locales
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    // Conectar DB
    async conectarDB() {
        await dbConnetion();
    }

    // Middlewares de express
    middlewares() {

        // Servir la carpeta PUBLIC
        this.app.use( express.static('public/view') ); 

    }

    // Rutas de peticiones HTTP
    routes() {
        this.app.use( this.authPath       , express.json() , require('../routes/auth-routes') );
        this.app.use( this.buscarPath     , express.json() , require('../routes/buscar-routes') );
        this.app.use( this.categoriasPath , express.json() , require('../routes/categorias-routes') );
        this.app.use( this.productosPath  , express.json() , require('../routes/productos-routes') );
        this.app.use( this.uploadsPath    , express.json() , require('../routes/uploads-routes') );
        this.app.use( this.usuariosPath   , express.json() , require('../routes/usuarios-routes') );
    }

    // Escucha puertos
    listen() {
        this.app.listen( this.port , () => {
            console.log('Servidor corriendo en el puerto: ' , process.env.PORT );
        } )
    }

}


module.exports = Server;