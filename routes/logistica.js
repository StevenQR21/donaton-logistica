const express = require('express');
const router = express.Router();
const logisticaController = require('../controllers/logisticaController');

router.get('/', logisticaController.obtenerInventario);
router.post('/', logisticaController.crearItem);
router.get('/test', logisticaController.crearItemTest);

module.exports = router;