const CentroAcopio = require('../models/CentroAcopio');
const Inventario = require('../models/Logistica'); // Asegúrate que el archivo se llame Logistica.js en la carpeta models

class LogisticaRepository {
    // Esta es la función que pide tu app.js en la ruta GET
    async obtenerInventario() {
        return await Inventario.findAll();
    }

    // Esta es la función que pide tu app.js en la ruta POST
    async registrarEntrada(data) {
        return await Inventario.create(data);
    }

    // Funciones adicionales por si las necesitas después
    async getAllCentros() {
        return await CentroAcopio.findAll();
    }
}

module.exports = new LogisticaRepository();