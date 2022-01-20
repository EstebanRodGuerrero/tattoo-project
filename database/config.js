const mongoose = require('mongoose');


// Conexion a la BD
const dbConnetion = async () => {

    try {
        mongoose.connect( process.env.MONGODB_CNN , {

                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false

            }); 

            console.log('Conexion a BD exitosa');

    } catch (error) {
        throw new Error('Error a la hora de iniciar la Base de Datos');
    }

} 

module.exports = {
    dbConnetion
}