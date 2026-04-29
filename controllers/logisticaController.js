const logisticaRepo = require('../repositories/LogisticaRepository');

exports.obtenerInventario = async (req, res) => {
    try {
        const items = await logisticaRepo.obtenerInventario();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.crearItem = async (req, res) => {
    try {
        const nuevo = await logisticaRepo.registrarEntrada(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.crearItemTest = async (req, res) => {
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
};