const express = require('express');
const { dbConnetion } = require('../database/config');



class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT; 

        // Paths
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

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

    }

    // Rutas de peticiones HTTP
    routes() {
        this.app.use( this.usuariosPath , express.json() , require('../routes/usuarios-routes') );
        this.app.use( this.authPath , express.json() , require('../routes/auth-routes') );
    }

    // Escucha puertos
    listen() {
        this.app.listen( this.port , () => {
            console.log('Servidor corriendo en el puerto: ' , process.env.PORT );
        } )
    }


}


module.exports = Server;