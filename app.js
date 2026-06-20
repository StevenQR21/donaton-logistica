require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const sequelize = require('./config/db');
const logisticaRoutes = require('./routes/logistica');
const app = express();

const PORT = process.env.PORT || 3002; 

// 1. Middlewares de Programación Defensiva
app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Ruta de Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Microservicio de Logística funcionando' });
});

app.use('/', logisticaRoutes);

// 3. Levantar el servidor
sequelize.sync({ force: false }).then(() => {
    console.log('--- Base de datos conectada en Neon ---');
    app.listen(PORT, () => console.log(`Servicio Logística corriendo en puerto ${PORT}`));
}).catch(err => {
    console.error('❌ Error al conectar BD Logística:', err);
});

module.exports = app;