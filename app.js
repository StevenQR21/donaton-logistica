require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Agregamos cors para que el Front pueda conectarse
const sequelize = require('./config/db');
const logisticaRepo = require('./repositories/LogisticaRepository');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Ruta para ver el inventario (LA QUE PROBASTE)
app.get('/api/logistica', async (req, res) => {
    try {
        const items = await logisticaRepo.obtenerInventario();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Ruta para CREAR un item (Para que no esté vacío)
app.post('/api/logistica', async (req, res) => {
    try {
        const nuevo = await logisticaRepo.registrarEntrada(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// RUTA TEMPORAL PARA CREAR UN DATO DE PRUEBA
app.get('/api/logistica/test', async (req, res) => {
    try {
        const nuevo = await logisticaRepo.registrarEntrada({
            item: "Cajas de Alimento",
            cantidad: 50,
            centro_acopio: "Bodega Central Santiago",
            estado: "Disponible"
        });
        res.send("¡Dato de prueba creado con éxito!");
    } catch (error) {
        res.send("Error al crear: " + error.message);
    }
});

const PORT = process.env.PORT || 3002; // Sugiero 3002 para no chocar con el Front o el BFF

sequelize.sync().then(() => {
    console.log('--- Base de datos conectada en Neon ---');
    app.listen(PORT, () => console.log(`Servicio Logística corriendo en puerto ${PORT}`));
});