const { Schema , model } = require('mongoose');


const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [ true , 'El nombre es obligatorio' ]
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String,
        required: true
    },
    disponible: {
        type: Boolean,
        default: true
    }
});


module.exports = model( 'Producto' , ProductoSchema );